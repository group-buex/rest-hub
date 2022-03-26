import type { NextApiRequest, NextApiResponse } from "next";
import { Result, ValidationError, validationResult } from "express-validator";

import IProject, { IProjectMember } from "../../interface/project";
import IUser, { IUserProject } from "../../interface/user";
import Projects from "../../model/project";
import Users from "../../model/user";

import { CatchType } from "typings";
import { getUserByToken, verifyJwt } from "../../helper";

/***
 * Post Add New Project
 * @METHOD `POST`
 * @PATH `/api/v1/project/new`
 */
export const postProject = async (
  req: NextApiRequest,
  res: NextApiResponse<IProject | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      const token: string = (await verifyJwt(req, res)) as string;
      const { userId, userEmail } = await getUserByToken(token);

      if (userId) {
        req.body.authorId = userId;

        const newProject: IProject = await new Projects(req.body).save();

        const { _id: projectId, title, createdAt } = newProject;

        if (newProject) {
          // push project for creator
          const resetUser = await Users.findByIdAndUpdate(
            { _id: userId },
            {
              $push: {
                project: {
                  projectId,
                  role: "owner",
                  title,
                  createdAt,
                },
              },
            },
            { new: true, runValidators: true }
          );

          // push shared for members
          // (length === 1) is only have author alone
          if (req.body.member?.length > 1) {
            await req.body.member?.forEach(async (member) => {
              if (member.email !== userEmail) {
                await Users.findOneAndUpdate(
                  { email: member.email },
                  {
                    $push: {
                      shared: {
                        authorEmail: userEmail,
                        authorId: userId,
                        projectId,
                        role: member.role,
                        title,
                        createdAt,
                      },
                    },
                  },
                  { new: true, runValidators: true }
                );
              }
            });
          }

          return res.status(200).json(resetUser);
        }

        return res.status(500).json({ msg: "Can not created project" });
      } else {
        return res.status(401).json({ msg: "Unauthorized" });
      }
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};

/***
 * Post Add New Project Api
 * @METHOD `POST`
 * @PATH `/api/v1/project/api`
 */
export const postProjectApi = async (
  req: NextApiRequest,
  res: NextApiResponse<IProject | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      const token: string = (await verifyJwt(req, res)) as string;
      const { userId, userEmail } = await getUserByToken(token);

      if (userId) {
        await Projects.findById({ _id: req.body.projectId }).exec(
          async (error: Object, project: IProject) => {
            if (error || !project) {
              return res.status(500).json({
                msg: "Project not found",
                error,
              });
            }

            const member: IProjectMember = await project.member.filter(
              (item: IProjectMember) => item.email === userEmail
            )[0];

            if (!member) {
              return res.status(500).json({
                msg: "Member not found",
                error,
              });
            }

            if (member?.role === "guest") {
              return res.status(401).json({
                msg: "Not authorized about project" + `."${member.role}""`,
                error,
              });
            }

            await Projects.findOneAndUpdate(
              { _id: project._id },
              {
                $push: {
                  api: {
                    seq: project.api.length + 1 || 0,
                    order: project.api.length + 1 || 0,
                    projectId: project._id,
                    title: req.body.title,
                    description: req.body.description,
                    stauts: "published",
                    list: [],
                    models: [],
                  },
                },
              },
              { new: true, runValidators: true }
            ).exec(async (error: Object, project: IProject) => {
              if (error || !project) {
                return res.status(500).json({
                  msg: "Can not update project",
                  error,
                });
              }

              await Users.findById({ _id: userId }).exec(
                async (error: Object, user: IUser) => {
                  if (error || !user) {
                    return res.status(500).json({
                      msg: "User not found",
                      error,
                    });
                  }

                  const hasProject = user.project?.some(
                    (project: IUserProject) =>
                      project.projectId === req.body.projectId
                  );
                  const hasShared = user.shared?.some(
                    (shared: IUserProject) =>
                      shared.projectId === req.body.projectId
                  );

                  return hasProject || hasShared
                    ? res.status(200).json(project)
                    : res
                        .status(401)
                        .json({
                          msg: "Do not have authority about project",
                          error,
                        });
                }
              );
            });
          }
        );
      } else {
        return res.status(401).json({ msg: "Unauthorized" });
      }
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};

/***
 * get Project By Id
 * @METHOD `GET`
 * @PATH `/api/v1/project/v/:id`
 */
export const getProjectById = async (
  req: NextApiRequest,
  res: NextApiResponse<any | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      const token: string = (await verifyJwt(req, res)) as string;
      const { userId }: { userId: string } = (await getUserByToken(token)) as {
        userId: string;
      };

      if (userId) {
        await Users.findById({ _id: userId })
          .select(["project", "shared"])
          .exec(async (error: Object, user: IUser) => {
            if (error || !user) {
              return res.status(500).json({
                msg: "User not found",
                error,
              });
            }

            const hasProject = user.project?.some(
              (project: IUserProject) => project.projectId === req.query.id
            );
            const hasShared = user.shared?.some(
              (shared: IUserProject) => shared.projectId === req.query.id
            );

            if (hasProject || hasShared) {
              await Projects.findById({ _id: req.query.id }).exec(
                async (error: Object, project: IProject) => {
                  if (error || !project) {
                    return res.status(500).json({
                      msg: "Invalid request",
                      error,
                    });
                  }

                  return res.status(200).json(project);
                }
              );
            } else {
              return res
                .status(401)
                .json({ msg: "Do not have authority about project" });
            }
          });
      }
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};

/***
 * get Project By User
 * @METHOD `GET`
 * @PATH `/api/v1/project/list`
 */
export const getProjectList = async (
  req: NextApiRequest,
  res: NextApiResponse<any | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      const token: string = (await verifyJwt(req, res)) as string;
      const { userId }: { userId: string } = (await getUserByToken(token)) as {
        userId: string;
      };

      if (userId) {
        await Users.findById({ _id: userId })
          .select(["project", "shared"])
          .exec(async (error: Object, user: IUser) => {
            if (error || !user) {
              return res.status(500).json({
                msg: "User not found",
                error,
              });
            }
            return res.status(200).json(user);
          });
      }
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};

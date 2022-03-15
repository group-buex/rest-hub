import type { NextPage } from "next";
import Link from "next/link";
import withAuth from "hoc/withAuth";
import Layout from "components/Core/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mt-32">
        <Link href="/auth/login">
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Login
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      user_session: req.cookies.user_session_rf || "",
    },
  };
};

export default Home;

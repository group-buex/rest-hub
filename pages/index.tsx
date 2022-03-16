import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Layout from "components/Core/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mt-32">
        Home
        <Link href="/auth/login">
          <a>login</a>
        </Link>
        <Link href="/auth/sign-in">
          <a>sign</a>
        </Link>
        <Link href="/project">
          <a>projet</a>
        </Link>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  user_session: string;
}> = async ({ req }) => {
  return {
    props: {
      user_session: req.cookies.user_session || "",
    },
  };
};

export default Home;

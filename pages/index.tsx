import type { NextPage } from "next";
import Link from "next/link";
import Layout from "components/Core/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mt-32">
        Home
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      user_session: req.cookies.user_session || "",
    },
  };
};

export default Home;

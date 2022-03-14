import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <Link href="/auth/login">
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
          Login
        </a>
      </Link>
    </div>
  );
};

export default Home;

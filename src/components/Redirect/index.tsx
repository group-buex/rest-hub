import React, { useEffect } from "react";
import { useRouter } from "next/router";
// import Spinner from "./Loading/Spinner";

const Redirect = ({ to, ssr = null }) => {
  const router = useRouter();

  useEffect(() => {
    if (ssr) window.location.pathname = to;
    else router.push(to);
  }, []);

  return (
    <div>
      {/* <Spinner /> */}
      <span>Redirect...</span>
    </div>
  );
};

export default Redirect;

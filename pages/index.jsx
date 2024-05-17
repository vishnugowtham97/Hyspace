import React from "react";
import dynamic from "next/dynamic";
import Login from "./login";
import Signup from "./signup";

const Map = dynamic(() => import("./api/Map"), { ssr: false });
const FileUpload = dynamic(() => import("./api/FileUpload"), {
  ssr: false,
});

const Home = () => {
  return (
    <div>
      <Login />
      <Signup />
      <h1>Geo Map Application</h1>
      <FileUpload />
      <div style={{ height: "500px", width: "100%" }}>
        <Map />
      </div>
    </div>
  );
};

export default Home;

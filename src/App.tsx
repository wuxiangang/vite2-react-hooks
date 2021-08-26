import React, { useState, useEffect } from "react";
import useRouter from "react-access-router/lib/useRouter";
import { useRequest } from "./hooks/useRequestHook";
import logo from "@/assets/images/logo.svg";
import "@/assets/styles/app.less";

function App() {
  const { setRole, getAccessRoutes, getRoutes, getRole } = useRouter();
  const { requestUserLogin } = useRequest({ module: "user" });

  useEffect(() => {
    // setRole("user").then(() => {
    //   console.log(getAccessRoutes());
    // });
    console.log("=========");
    requestUserLogin({
      mobile: "16888",
      code: "22222",
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button">count is: {0}</button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;

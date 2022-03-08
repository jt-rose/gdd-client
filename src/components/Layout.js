import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { get } from "../utils/serverURL";

export const LeftContent = (props) => {
  return <div className="contentLeft">{props.children}</div>;
};

export const RightContent = (props) => {
  return <div className="contentRight">{props.children}</div>;
};

export const Layout = (props) => {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    get("/user/me").then((response) => setUser(response.data));
  }, []);

  return (
    <div
      className={`main ${props.designPage && "design-page"} ${
        props.modalFixedSize && "modal-fixed"
      }`}
    >
      <div className="mainEffect">
        <div className="mainContainer">
          <div className="header" padding="4" color="white">
            <h1 className="title">{props.title}</h1>
            <Navbar user={user} setUser={setUser} />
          </div>
          <div className="content">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

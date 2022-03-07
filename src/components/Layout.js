import { Navbar } from "./Navbar";

export const LeftContent = (props) => {
  return <div className="contentLeft">{props.children}</div>;
};

export const RightContent = (props) => {
  return <div className="contentRight">{props.children}</div>;
};

export const Layout = (props) => {
  return (
    <div className="main">
      <div className="mainEffect">
        <div className="mainContainer">
          <div className="header" padding="4" color="white">
            <h1 className="title">{props.title}</h1>
            <Navbar />
          </div>
          <div className="content">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

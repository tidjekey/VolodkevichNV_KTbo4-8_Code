import React from "react";

const Heading = ({ children, text = "" }: any) => {
  return (
    <div className="pl-[165rem] h-[203rem] w-full  relative">
      <div className="bg_wide" />
      <h1 className="pt-[80rem] text__subtitle">{children}</h1>
      {text && (
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          className="text-main"
        ></div>
      )}
    </div>
  );
};

export default Heading;

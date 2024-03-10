import React from "react";
import ObjectPropChild from "./ObjectPropChild";

export default function ObjectPropParent() {
  let user = {
    userName: "Test",
    pass: "123456",
  };
  return <ObjectPropChild userName={user.userName} password={user.pass} />;
}

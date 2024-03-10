import React from "react";
import ChildComponent from "./ChildComponent";

export default function FatherComponent() {
  return (
    <div>
      <ChildComponent data={"John"}>Doe</ChildComponent>
    </div>
  );
}

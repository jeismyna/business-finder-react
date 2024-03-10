import React from "react";

export default function StringPropChild({ data }) {
  console.log(data);
  return (
    <React.Fragment>
      <div>Hello</div>
      <div>{data}</div>
    </React.Fragment>
  );
}

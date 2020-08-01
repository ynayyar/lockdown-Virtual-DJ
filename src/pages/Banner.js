import React from "react";

export default function Banner() {
  return (
    <div className="Banner">
      <h1>Enter your name</h1>
      <div>
        <input type="text"></input>
      </div>
      <div>
        <input type="button" text="Click Me" />
      </div>
    </div>
  );
}

import React from "react";

export default function Gate({ title, children, description }) {
  return (
    <div className="px-3 py-2 border">
      <div>
        <header className="text-3xl mt-2 text-center font-medium">
          {title}
        </header>
        <div className="italic md:text-lg text-center text-gray-800 mx-auto w-full max-w-[500px]">
          {description}
        </div>
      </div>
      <div className="mt-6 mb-3">{children}</div>
    </div>
  );
}

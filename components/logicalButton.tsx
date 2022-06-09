import React, { useEffect, useState } from "react";
import classes from "../utils/classes";

type props = {
  state: boolean;
} & React.ComponentPropsWithRef<"button">;

const LogicButton = React.forwardRef<HTMLButtonElement, props>(
  ({ state, ...props }, ref) => {
    const [initial, setInitial] = useState(true);

    useEffect(() => {
      if (initial) {
        setInitial(false);
        return;
      }
      const clickSound = new Audio("/click.wav");
      clickSound.play();
      return () => {
        clickSound.pause();
      };
    }, [state]);

    return (
      <button
        {...props}
        ref={ref}
        className={classes(
          state ? "bg-green-500 shadow-green-100" : "bg-red-500 shadow-red-100",
          "transition-all w-16 h-16 shadow-xl rounded-[25%] text-center text-3xl text-white font-black"
        )}
      >
        {state ? "ON" : "OFF"}
      </button>
    );
  }
);

export default LogicButton;

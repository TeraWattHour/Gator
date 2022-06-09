import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import classes from "../utils/classes";

function Navbar() {
  const { locale } = useRouter();

  return (
    <div className="border-b shadow">
      <div className="max-w-5xl px-4 mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex flex-row items-center space-x-5 cursor-pointer">
            <img src="/ico.png" alt="" className="w-16 h-16" />
            <span className="text-2xl font-semibold">Gator</span>
          </div>
        </Link>
        <div className="flex flex-row space-x-2 items-center">
          <Link href="#" locale="pl">
            <img
              className={classes(
                "w-9 h-6 cursor-pointer border-2 ",
                locale === "pl" ? "border-black" : "border-gray-400"
              )}
              src="/flags/pol.png"
            />
          </Link>
          <Link href="#" locale="ukr">
            <img
              className={classes(
                "w-9 h-6 cursor-pointer border-2 ",
                locale === "ukr" ? "border-black" : "border-gray-400"
              )}
              src="/flags/ukr.png"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

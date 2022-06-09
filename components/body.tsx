import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import classes from "../utils/classes";
import Excercises from "./excercises";
import And from "./gates/and";
import Nand from "./gates/nand";
import Nor from "./gates/nor";
import Not from "./gates/not";
import Or from "./gates/or";
import Xor from "./gates/xor";

const GATES = [
  {
    name: "AND",
    symbol: "/images/and.png",
  },
  { name: "OR", symbol: "/images/or.png" },
  { name: "XOR", symbol: "/images/xor.png" },
  { name: "NAND", symbol: "/images/nand.png" },
  { name: "NOT", symbol: "/images/not.png" },
  { name: "NOR", symbol: "/images/nor.png" },
];

const COMPONENTS = [And, Or, Xor, Nand, Not, Nor];

export default function Body() {
  const [selected, setSelected] = useState(0);
  const { t } = useTranslation("common");

  return (
    <div className="max-w-5xl mt-10 px-4 w-full mx-auto">
      <header className="text-3xl font-semibold mb-3">
        {t("what-are-gates")}
      </header>
      <div className="text-lg italic leading-relaxed">
        <p>{t("what-are-gates-text")}</p>
        <p>{t("what-are-gates-distunguish")}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-3">
        {GATES.map((gate, i) => (
          <div
            key={i}
            onClick={() => setSelected((x) => (x === i ? -1 : i))}
            className={classes(
              "px-2 hover:transform hover:translate-y-[3px] hover:bg-gray-50 cursor-pointer transition-all flex py-7 border flex-col items-center justify-center",
              i === selected && "bg-gray-100"
            )}
          >
            <span className="text-xl mb-3 font-bold">{gate.name}</span>
            <img src={gate.symbol} className="h-20 w-full object-contain" />
          </div>
        ))}
      </div>
      {selected !== -1 && (
        <div className="mt-5">{React.createElement(COMPONENTS[selected])}</div>
      )}
      <div className="mt-8">
        <Excercises />
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Gate from "../gate";
import LogicalButton from "../logicalButton";
import { AiOutlineBulb, AiFillBulb } from "react-icons/ai";
import { useTranslation } from "next-i18next";

export default function Xor() {
  const { t } = useTranslation("common");

  const [states, setStates] = useState([false, true]);

  function evaluate() {
    return (states[0] && !states[1]) || (!states[0] && states[1]);
  }

  return (
    <Gate title="XOR" description={t("desc-xor")}>
      <div className="max-w-[300px] mx-auto w-full grid grid-cols-3">
        <div className="flex flex-col space-y-2 justify-center items-center">
          <LogicalButton
            state={states[0]}
            onClick={() =>
              setStates((x) => x.map((j, y) => (y === 0 ? !j : j)))
            }
          />
          <LogicalButton
            state={states[1]}
            onClick={() =>
              setStates((x) => x.map((j, y) => (y === 1 ? !j : j)))
            }
          />
        </div>
        <div className="flex items-center">
          <img src="/images/xor.png" className="w-full h-auto max-h-[50px]" />
        </div>
        <div className="flex justify-center items-center">
          {evaluate() ? (
            <AiFillBulb className="text-[90px] sm:text-[120xp]" color="gold" />
          ) : (
            <AiOutlineBulb className="text-[90px] sm:text-[120xp]" />
          )}
        </div>
      </div>
    </Gate>
  );
}

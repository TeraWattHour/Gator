import React, { useState } from "react";
import Gate from "../gate";
import LogicalButton from "../logicalButton";
import { AiOutlineBulb, AiFillBulb } from "react-icons/ai";
import { useTranslation } from "next-i18next";

export default function Not() {
  const { t } = useTranslation("common");

  const [states, setStates] = useState(true);

  return (
    <Gate title="NOT" description={t("desc-not")}>
      <div className="max-w-[300px] mx-auto w-full grid grid-cols-3">
        <div className="flex flex-col space-y-2 justify-center items-center">
          <LogicalButton state={states} onClick={() => setStates(!states)} />
        </div>
        <div className="flex items-center">
          <img src="/images/nand.png" className="w-full h-auto max-h-[50px]" />
        </div>
        <div className="flex justify-center items-center">
          {!states ? (
            <AiFillBulb className="text-[90px] sm:text-[120xp]" color="gold" />
          ) : (
            <AiOutlineBulb className="text-[90px] sm:text-[120xp]" />
          )}
        </div>
      </div>
    </Gate>
  );
}

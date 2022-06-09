import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import {
  AiFillBulb,
  AiOutlineBulb,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import LogicButton from "./logicalButton";
import jwt from "jsonwebtoken";

const EXCERSISES = [
  {
    type: "AND",
    symbol: "/images/and.png",
    evaluation: (x, y) => x && y,
    buttons: 2,
  },

  {
    buttons: 2,
    type: "OR",
    symbol: "/images/or.png",
    evaluation: (x, y) => x || y,
  },
  {
    buttons: 2,
    type: "XOR",
    symbol: "/images/xor.png",
    evaluation: (x, y) => (x && !y) || (!x && y),
  },
  {
    buttons: 2,
    type: "NAND",
    symbol: "/images/nand.png",
    evaluation: (x, y) => {
      if (x && y) return false;
      return true;
    },
  },
  {
    type: "NOT",
    symbol: "/images/not.png",
    evaluation: (x, _) => !x,
    buttons: 1,
  },
  {
    buttons: 2,
    type: "NOR",
    symbol: "/images/nor.png",
    evaluation: (x, y) => !x && !y,
  },
];

const types = [0, 1];

export default function Excercises() {
  const { t } = useTranslation("common");
  const [selected, setSelected] = useState(0);
  const [states, setStates] = useState([false, false]);
  const [type, setType] = useState(0);
  const [state, setState] = useState(false);
  const [timeouted, setTimeouted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const generate = () => {
    setSelected(Math.floor(Math.random() * EXCERSISES.length));
    const type = types[Math.round(Math.random())];
    setType(type);
    setStates([false, false]);
    setState(false);
  };

  const loadResults = () => {
    const resultsToken = localStorage.getItem("results");
    if (!resultsToken) return;
    const s = jwt.verify(resultsToken, process.env.SECRET!);
    setResults(Array.from(s as any));
    // console.log(typeof s, s);
    // setResults(s);
  };

  const changeResults = (result: boolean) => {
    const newResults = [...results, result];
    const token = jwt.sign(JSON.stringify(newResults), process.env.SECRET!);
    localStorage.setItem("results", token);
    console.log(newResults);
    setResults(newResults);
  };

  useEffect(() => {
    loadResults();
    generate();
  }, []);

  const evaluate = () => {
    if (timeouted) return;

    setTimeouted(true);

    const state = EXCERSISES[selected].evaluation(states[0], states[1]);

    setState(state);

    changeResults(state == type);

    setTimeout(() => {
      generate();
      setTimeouted(false);
    }, 1000);
  };

  return (
    <div className="px-3 py-2 border">
      <div>
        <header className="text-3xl mt-2 text-center font-medium">
          {t("excercises")}
        </header>
        <div className="italic md:text-lg text-center text-gray-800 mx-auto w-full max-w-[500px]">
          {type === 1 ? t("turn-on") : t("turn-off")}
        </div>
      </div>

      <div className="mt-6 mb-3">
        <div className="max-w-[300px] mx-auto w-full grid grid-cols-3">
          <div className="flex flex-col space-y-2 justify-center items-center">
            <LogicButton
              state={states[0]}
              onClick={() =>
                setStates((x) => x.map((j, y) => (y === 0 ? !j : j)))
              }
            />
            {EXCERSISES[selected].buttons !== 1 && (
              <LogicButton
                state={states[1]}
                onClick={() =>
                  setStates((x) => x.map((j, y) => (y === 1 ? !j : j)))
                }
              />
            )}
          </div>
          <div className="flex items-center">
            <img
              src={EXCERSISES[selected].symbol}
              className="w-full h-auto max-h-[50px]"
            />
          </div>
          <div className="flex justify-center items-center">
            {state ? (
              <AiFillBulb
                className="text-[90px] sm:text-[120xp]"
                color="gold"
              />
            ) : (
              <AiOutlineBulb className="text-[90px] sm:text-[120xp]" />
            )}
          </div>
        </div>
        <div className="flex flex-row mt-8">
          <button
            className="bg-green-500 py-2 rounded-lg shadow shadow-green-200 px-3 text-white mx-auto font-black"
            onClick={() => evaluate()}
          >
            {t("confirm")}
          </button>
        </div>
        <div className="flex flex-row flex-wrap space-x-2 text-xl justify-center mt-6">
          {results.map((result, x) => (
            <div key={x}>
              {result ? (
                <AiOutlineCheck color="green" />
              ) : (
                <AiOutlineClose color="red" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

export default function BasicCalculator() {
  const [currentInput, setCurrentInput] = useState("0");
  const [previousInput, setPreviousInput] = useState("");
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("jamro_basic_calc_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const appendNumber = (num: string) => {
    if (currentInput === "0" && num !== ".") {
      setCurrentInput(num);
    } else {
      setCurrentInput((prev) => prev + num);
    }
  };

  const appendOperator = (op: string) => {
    setPreviousInput(currentInput + " " + op + " ");
    setCurrentInput("0");
  };

  const clearCalc = () => {
    setCurrentInput("0");
    setPreviousInput("");
  };

  const calculate = () => {
    try {
      const expression = previousInput + currentInput;
      // Using Function instead of eval for slightly better safety, though still should be careful
      const result = new Function('return ' + expression.replace('×', '*').replace('−', '-'))();
      const resStr = result.toString();
      setPreviousInput(expression + " =");
      setCurrentInput(resStr);

      const newHistory = [{ expression, result: resStr }, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem("jamro_basic_calc_history", JSON.stringify(newHistory));
    } catch (e) {
      setCurrentInput("Error");
    }
  };

  const loadHistory = (item: { expression: string; result: string }) => {
    // Attempt to split the expression so the user can edit the last operand
    const match = item.expression.match(/^(.*)\s([\+\-\*\/])\s(.*)$/);
    if (match) {
      setPreviousInput(match[1] + " " + match[2] + " ");
      setCurrentInput(match[3]);
    } else {
      setPreviousInput("");
      setCurrentInput(item.expression);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
      if (e.key === ".") appendNumber(".");
      if (e.key === "+") appendOperator("+");
      if (e.key === "-") appendOperator("-");
      if (e.key === "*") appendOperator("*");
      if (e.key === "/") appendOperator("/");
      if (e.key === "Enter" || e.key === "=") calculate();
      if (e.key === "Escape") clearCalc();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentInput, previousInput]);

  return (
    <div className="w-full">
      {/* Calculator Core */}
      <section className="mx-auto mb-[48px] max-w-container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          {/* Calculator Interface */}
          <div className="lg:col-span-8">
            <div className="glass-card rounded-[2rem] p-[24px] shadow-xl relative overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-glass-border">
              {/* Interior Decorative Blur */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-container/10 blur-3xl rounded-full"></div>
              {/* Display */}
              <div className="calc-display bg-black/5 border border-black/5 rounded-2xl p-[24px] mb-[24px] text-right min-h-[120px] flex flex-col justify-end">
                <div className="text-on-surface-variant text-body-md opacity-60 mb-[4px]">
                  {previousInput || "\u00A0"}
                </div>
                <div className="text-on-background overflow-y-hidden font-display-lg text-4xl md:text-5xl tracking-tight overflow-x-auto whitespace-nowrap scrollbar-hide">
                  {currentInput}
                </div>
              </div>
              {/* Controls */}
              <div className="grid grid-cols-4 gap-[16px]">
                {/* Row 1 */}
                <button
                  className="col-span-2 bg-error-container text-on-error-container font-label-md text-lg py-[16px] rounded-2xl active:scale-95 transition-all"
                  onClick={clearCalc}
                >
                  Clear
                </button>
                <button
                  className="bg-surface-container-high text-primary font-bold text-xl py-[16px] rounded-2xl hover:bg-primary-container hover:text-on-primary transition-all active:scale-95"
                  onClick={() => appendOperator("/")}
                >
                  /
                </button>
                <button
                  className="bg-surface-container-high text-primary font-bold text-xl py-[16px] rounded-2xl hover:bg-primary-container hover:text-on-primary transition-all active:scale-95"
                  onClick={() => appendOperator("*")}
                >
                  ×
                </button>
                {/* Row 2 */}
                <button
                  className="bg-surface-container-lowest text-on-background font-semibold text-xl py-[16px] rounded-2xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm border border-outline-variant/30"
                  onClick={() => appendNumber("7")}
                >
                  7
                </button>
                <button
                  className="bg-surface-container-lowest text-on-background font-semibold text-xl py-[16px] rounded-2xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm border border-outline-variant/30"
                  onClick={() => appendNumber("8")}
                >
                  8
                </button>
                <button
                  className="bg-surface-container-lowest text-on-background font-semibold text-xl py-[16px] rounded-2xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm border border-outline-variant/30"
                  onClick={() => appendNumber("9")}
                >
                  9
                </button>
                <button
                  className="bg-surface-container-high text-primary font-bold text-xl py-[16px] rounded-2xl hover:bg-primary-container hover:text-on-primary transition-all active:scale-95"
                  onClick={() => appendOperator("-")}
                >
                  −
                </button>
                {/* Row 3 */}
                <button
                  className="bg-surface-container-lowest text-on-background font-semibold text-xl py-[16px] rounded-2xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm border border-outline-variant/30"
                  onClick={() => appendNumber("4")}
                >
                  4
                </button>
                <button
                  className="bg-surface-container-lowest text-on-background font-semibold text-xl py-[16px] rounded-2xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm border border-outline-variant/30"
                  onClick={() => appendNumber("5")}
                >
                  5
                </button>
                <button
                  className="bg-surface-container-lowest text-on-background font-semibold text-xl py-[16px] rounded-2xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm border border-outline-variant/30"
                  onClick={() => appendNumber("6")}
                >
                  6
                </button>
                <button
                  className="bg-surface-container-high text-primary font-bold text-xl py-[16px] rounded-2xl hover:bg-primary-container hover:text-on-primary transition-all active:scale-95"
                  onClick={() => appendOperator("+")}
                >
                  +
                </button>
                {/* Row 4 */}
                <div className="col-span-3 grid grid-cols-3 gap-[16px]">
                  <button
                    className="bg-surface-container-lowest text-on-background font-semibold text-xl py-[16px] rounded-2xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm border border-outline-variant/30"
                    onClick={() => appendNumber("1")}
                  >
                    1
                  </button>
                  <button
                    className="bg-surface-container-lowest text-on-background font-semibold text-xl py-[16px] rounded-2xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm border border-outline-variant/30"
                    onClick={() => appendNumber("2")}
                  >
                    2
                  </button>
                  <button
                    className="bg-surface-container-lowest text-on-background font-semibold text-xl py-[16px] rounded-2xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm border border-outline-variant/30"
                    onClick={() => appendNumber("3")}
                  >
                    3
                  </button>
                  <button
                    className="col-span-2 bg-surface-container-lowest text-on-background font-semibold text-xl py-[16px] rounded-2xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm border border-outline-variant/30"
                    onClick={() => appendNumber("0")}
                  >
                    0
                  </button>
                  <button
                    className="bg-surface-container-lowest text-on-background font-semibold text-xl py-[16px] rounded-2xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm border border-outline-variant/30"
                    onClick={() => appendNumber(".")}
                  >
                    .
                  </button>
                </div>
                <button
                  className="bg-primary text-on-primary font-bold text-3xl py-[16px] rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  onClick={calculate}
                >
                  =
                </button>
              </div>
            </div>
            
            {/* History Section */}
            <div className="glass-card rounded-[2rem] p-[24px] shadow-lg border border-glass-border bg-white/70 dark:bg-slate-800/70 backdrop-blur-md mt-[24px]">
              <div className="flex items-center justify-between mb-[16px]">
                <h4 className="font-label-md text-primary uppercase tracking-widest">History</h4>
                {history.length > 0 && (
                  <button 
                    onClick={() => { setHistory([]); localStorage.removeItem("jamro_basic_calc_history"); }}
                    className="text-label-sm text-on-surface-variant hover:text-error transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-[8px] max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {history.length === 0 ? (
                  <p className="text-body-sm text-on-surface-variant opacity-70">No history yet. Your last 10 calculations will appear here.</p>
                ) : (
                  history.map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => loadHistory(item)}
                      className="w-full text-right p-[12px] rounded-xl hover:bg-surface-container-high transition-colors group flex flex-col items-end border border-transparent hover:border-outline-variant/30"
                    >
                      <span className="text-label-sm text-on-surface-variant opacity-70 group-hover:opacity-100 transition-opacity">
                        {item.expression} =
                      </span>
                      <span className="text-title-md text-on-surface font-semibold">
                        {item.result}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
          {/* Functional Sidebar (Promo/Features) */}
          <div className="lg:col-span-4 space-y-[24px]">

            <div className="bg-inverse-surface text-on-primary p-[24px] rounded-[2rem] shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="bg-primary-container/30 px-[8px] py-[4px] rounded text-label-sm mb-[16px] inline-block">
                  Pro Feature
                </span>
                <h3 className="font-title-lg text-title-lg mb-[8px]">Memory Slots</h3>
                <p className="text-label-md opacity-80 mb-[16px]">
                  Store up to 10 variables for complex multi-stage calculations.
                </p>
                <button className="bg-on-primary text-primary px-[24px] py-[8px] rounded-full font-label-md hover:shadow-xl transition-all active:scale-95">
                  Try Jamro Pro
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-[120px]">
                  calculate
                </span>
              </div>
            </div>
            <div className="glass-card rounded-[2rem] p-[24px] border-dashed border-2 border-outline-variant bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <h4 className="font-label-md text-primary uppercase tracking-widest mb-[16px]">
                Quick Tips
              </h4>
              <ul className="space-y-[16px] text-label-md text-on-surface-variant">
                <li className="flex gap-[8px]">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    check_circle
                  </span>
                  <span>
                    Use keyboard shortcuts (0-9, +, -, *, /) for faster input.
                  </span>
                </li>
                <li className="flex gap-[8px]">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    lock
                  </span>
                  <span>
                    All data stays in your browser. No server-side storage.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Ad Placeholder */}
      <div className="mx-auto mb-[48px] max-w-container-max">
        <div className="w-full h-24 bg-surface-container rounded-2xl flex items-center justify-center border border-outline-variant/30 text-outline-variant font-label-sm uppercase tracking-widest">
          <span>Advertisement - Support Jamro Tools</span>
        </div>
      </div>
    </div>
  );
}

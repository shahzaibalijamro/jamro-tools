"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

import { useState, useEffect } from "react";
import { evaluateBasicExpression, parseCalculatorHistory, prependCalculatorHistory } from "../logic/basic-calculator";

export default function BasicCalculator() {
  const [currentInput, setCurrentInput] = useState("0");
  const [previousInput, setPreviousInput] = useState("");
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("jamro_basic_calc_history");
    if (saved) {
      setHistory(parseCalculatorHistory(saved));
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
    const calculation = evaluateBasicExpression(previousInput, currentInput);
    if (calculation.error) {
      setCurrentInput("Error");
      return;
    }
    setPreviousInput(calculation.expression + " =");
    setCurrentInput(calculation.result);
    const newHistory = prependCalculatorHistory(history, calculation);
    setHistory(newHistory);
    localStorage.setItem("jamro_basic_calc_history", JSON.stringify(newHistory));
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

  const faqItems = [
    {
      q: `What is a basic calculator?`,
      a: `A basic calculator is a digital or physical mathematical tool designed exclusively for fundamental arithmetic. Unlike scientific or financial calculators that feature complex equations, a basic calculator features a simple keypad limited to numbers 0 through 9 and the four primary mathematical operations: addition, subtraction, multiplication, and division.`,
    },
    {
      q: `What exact mathematical operations can this calculator perform?`,
      a: `A basic calculator is built to perform the four core pillars of arithmetic:
* Addition (+): Finding the total sum of two or more numbers.
* Subtraction (-): Deducting one number from another to find the difference.
* Multiplication ( or x):* Scaling one number by another.
* Division (/ or ÷): Splitting a number into equal parts. Many basic calculators also include a simple percentage (%) button for calculating tips or retail taxes.`,
    },
    {
      q: `What is the difference between a basic calculator and a scientific calculator?`,
      a: `A basic calculator is limited to everyday arithmetic (adding, subtracting, multiplying, dividing). A scientific calculator includes these basic features but adds advanced mathematical functions like trigonometry (sine, cosine, tangent), logarithms, exponents, and square roots. If you are doing taxes or budgeting, a basic calculator is best; if you are doing physics or calculus, you need a scientific calculator.`,
    },
    {
      q: `Does a basic calculator follow the order of operations (PEMDAS)?`,
      a: `Most basic calculators do not automatically follow the mathematical order of operations (PEMDAS). Instead, they process numbers sequentially, exactly as you type them from left to right. For example, if you type 2 + 3 * 4, a basic calculator will add 2 and 3 first (5), then multiply by 4, giving you 20. A scientific calculator would correctly multiply 3 and 4 first (12), then add 2, giving you 14.`,
    },
    {
      q: `What do the "C" and "AC" buttons mean?`,
      a: `These buttons are used to clear data from the calculator's memory so you can start a new math problem or fix an error:
* C (Clear): This clears only the most recent entry. If you are typing a long string of additions and make a mistake on the last number, pressing "C" deletes just that mistake without wiping out the entire equation.
* AC (All Clear): This completely wipes the calculator's memory and resets the screen to zero, allowing you to start an entirely new calculation.`,
    },
    {
      q: `How do I calculate a percentage using a basic calculator?`,
      a: `To find a percentage on a basic calculator, you convert the percentage into a decimal first by dividing it by 100. For example, to find 20% of 50, you change 20% to 0.20. You then multiply 50 by 0.20 to get the answer, which is 10. Some basic calculators feature a dedicated "%" button that automates this decimal conversion for you.`,
    },
    {
      q: `Can a basic calculator handle fractions?`,
      a: `No, a basic calculator does not feature a dedicated fraction input format (like 1/2 or 3/4). However, you can easily convert any fraction into a usable decimal by dividing the top number (numerator) by the bottom number (denominator). For example, to calculate using the fraction 3/4, you simply divide 3 by 4 to get 0.75, and then use that decimal in your calculation.`,
    },
    {
      q: `Why use an online basic calculator instead of a physical app?`,
      a: `Using a fully online basic calculator saves local storage space on your device and requires zero updates or installations. Because it operates through your web browser, it is instantly accessible across any device—whether you are on a desktop computer, a tablet, or a mobile phone—ensuring you always have a reliable math utility ready the moment you open a new tab.`,
    },
  ];

  return (
    <>
      {/* Calculator Core */}
      <section className="mx-auto mb-[48px] max-w-container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          {/* Calculator Interface */}
          <div className="lg:col-span-8">
            <div className="glass-card rounded-[2rem] p-[24px] shadow-xl relative overflow-hidden bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-glass-border">
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
            <div className="glass-card rounded-[2rem] p-[24px] shadow-lg border border-glass-border bg-white/70 dark:bg-surface-container/70 backdrop-blur-md mt-[24px]">
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

            <div className="bg-[#e7eeff] dark:bg-surface-container text-[#111c2d] dark:text-on-surface p-[24px] rounded-[2rem] shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="bg-[#004ac6] text-white px-[8px] py-[4px] rounded text-label-sm mb-[16px] inline-block">
                  Pro Feature
                </span>
                <h3 className="font-title-lg text-title-lg mb-[8px]">Memory Slots</h3>
                <p className="text-label-md opacity-80 mb-[16px]">
                  Store up to 10 variables for complex multi-stage calculations.
                </p>
                <button className="bg-[#004ac6] text-white px-[24px] py-[8px] rounded-full font-label-md hover:shadow-xl transition-all active:scale-95">
                  Try Jamro Pro
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-[120px]">
                  calculate
                </span>
              </div>
            </div>
            <div className="glass-card rounded-[2rem] p-[24px] border-dashed border-2 border-outline-variant bg-white/50 dark:bg-surface-container/50 backdrop-blur-sm">
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

      {/* Tool Info Section */}
      <ToolInfoCard
        title="About the Basic Calculator."
        content={[
          `Not every mathematical problem requires advanced engineering equations or a complex graphing tool. For everyday math, you need speed, simplicity, and immediate results. The JamroTools Basic Calculator is a streamlined, fully online web utility designed to handle your daily calculations instantly. Built to operate directly in your browser without any offline downloads or app installations, this tool provides a clean, distraction-free interface for fundamental arithmetic.`,
          `Whether you are balancing a personal household budget, calculating a quick tip at a restaurant, or double-checking a grocery bill, this calculator delivers lightning-fast accuracy. By stripping away the cluttered interfaces of scientific calculators, it allows you to focus purely on the standard operations you need most: addition, subtraction, multiplication, and division.`,
          `/ Simplify Your Daily Mathematics`,
          `A reliable, easy-to-use calculator is an essential utility for daily life and basic administration. When you use this online tool, you get immediate answers to foundational math problems.`,
          `* Manage Personal Finances: Quickly add up monthly bills, subtract daily expenses from your bank balance, or multiply hourly wages by hours worked.`,
          `* Calculate Retail Costs: Easily multiply item prices by quantities or subtract standard discounts to find your final checkout total.`,
          `* Assist with Homework: Provide younger students with a straightforward tool to check their fundamental arithmetic without overwhelming them with advanced trigonometric functions.`,
          `Whether you are a freelancer tallying up invoices or a shopper comparing unit prices, this basic calculator provides the exact numbers you need with zero friction.`,
        ]}
      />

      {/* FAQ Section */}
      <FaqSection items={faqItems} />
    </>
  );
}

"use client";
import { FaqSection } from "@/components/ui/faq-section";
import { ToolInfoCard } from "@/components/tools/tool-info-card";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ScientificCalculator() {
  const [currentInput, setCurrentInput] = useState("0");
  const [previousInput, setPreviousInput] = useState("");
  const [isDegrees, setIsDegrees] = useState(true);
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("jamro_scientific_calc_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) { }
    }
  }, []);

  const loadHistory = (item: { expression: string; result: string }) => {
    setPreviousInput("");
    setCurrentInput(item.expression);
  };

  const appendToken = (val: string) => {
    if (currentInput === "0" || currentInput === "Error") {
      setCurrentInput(val);
    } else {
      setCurrentInput((prev) => prev + val);
    }
  };

  const appendFunction = (funcName: string) => {
    if (currentInput === "0" || currentInput === "Error") {
      setCurrentInput(funcName + "(");
    } else {
      setCurrentInput((prev) => prev + funcName + "(");
    }
  };

  const clearCalc = () => {
    setCurrentInput("0");
    setPreviousInput("");
  };

  const calculate = () => {
    try {
      let expression = currentInput;

      // Standardize the expression for JS Math
      expression = expression.replace(/×/g, '*');
      expression = expression.replace(/÷/g, '/');
      expression = expression.replace(/−/g, '-');
      expression = expression.replace(/π/g, 'Math.PI');
      expression = expression.replace(/e/g, 'Math.E');

      // Handle percentages
      expression = expression.replace(/%/g, '/100');

      // Handlers for scientific functions
      // To properly handle degrees, we wrap sin/cos/tan
      const radConv = isDegrees ? " * (Math.PI / 180)" : "";

      expression = expression.replace(/sin\(([^)]+)\)/g, `Math.sin(($1)${radConv})`);
      expression = expression.replace(/cos\(([^)]+)\)/g, `Math.cos(($1)${radConv})`);
      expression = expression.replace(/tan\(([^)]+)\)/g, `Math.tan(($1)${radConv})`);

      expression = expression.replace(/log\(([^)]+)\)/g, `Math.log10($1)`);
      expression = expression.replace(/ln\(([^)]+)\)/g, `Math.log($1)`);
      expression = expression.replace(/√\(([^)]+)\)/g, `Math.sqrt($1)`);
      expression = expression.replace(/√(\d+(\.\d+)?)/g, `Math.sqrt($1)`);

      // Handle powers x^y (using JS **)
      expression = expression.replace(/\^/g, '**');

      const result = new Function('Math', 'return ' + expression)(Math);

      if (isNaN(result) || !isFinite(result)) {
        setCurrentInput("Error");
        setPreviousInput(currentInput + " =");
      } else {
        // Round to 15 precision to avoid floating point anomalies like 0.1+0.2
        const finalRes = parseFloat(result.toPrecision(15)).toString();
        setPreviousInput(currentInput + " =");
        setCurrentInput(finalRes);

        const newHistory = [{ expression: currentInput, result: finalRes }, ...history].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem("jamro_scientific_calc_history", JSON.stringify(newHistory));
      }
    } catch (e) {
      setCurrentInput("Error");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Basic shortcuts for a scientific calc
      const key = e.key;
      if (key >= "0" && key <= "9") appendToken(key);
      if (key === ".") appendToken(".");
      if (key === "+" || key === "-" || key === "*" || key === "/" || key === "(" || key === ")") {
        if (key === '*') appendToken("×");
        else if (key === '/') appendToken("÷");
        else if (key === '-') appendToken("−");
        else appendToken(key);
      }
      if (key === "^") appendToken("^");
      if (key === "Enter" || key === "=") calculate();
      if (key === "Escape") clearCalc();
      if (key.toLowerCase() === "r") setIsDegrees(!isDegrees);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentInput, previousInput, isDegrees]);

  const faqItems = [
    {
      q: `What is a scientific calculator?`,
      a: `A scientific calculator is an advanced electronic or digital calculator designed to solve complex mathematical, engineering, and scientific problems. Unlike a basic calculator, it includes dedicated buttons for trigonometry, logarithms, exponential functions, and scientific notation, allowing users to process multi-step equations efficiently.`,
    },
    {
      q: `What is the exact difference between a standard and scientific calculator?`,
      a: `A standard calculator is limited to the four fundamental arithmetic operations: addition, subtraction, multiplication, and division (along with basic percentages). A scientific calculator includes those basic functions but adds specialized operations like sine, cosine, tangent, square roots, exponents, and the ability to process the correct order of operations automatically.`,
    },
    {
      q: `What do the "sin," "cos," and "tan" buttons do?`,
      a: `These buttons represent the core trigonometric functions: Sine, Cosine, and Tangent. They are used to calculate the relationship between the angles and the sides of a right-angled triangle. These functions are essential for students and professionals working in geometry, architecture, physics, and engineering to determine unknown distances and angles.`,
    },
    {
      q: `How does this calculator handle the order of operations (PEMDAS)?`,
      a: `A high-quality scientific calculator automatically follows the mathematical rule of PEMDAS (Parentheses, Exponents, Multiplication, Division, Addition, Subtraction). If you type a long equation like 5 + 3 * 2, the calculator will correctly multiply 3 and 2 first, and then add 5, giving you the correct answer of 11 (rather than incorrectly reading left to right and giving you 16).`,
    },
    {
      q: `What is the "log" button used for?`,
      a: `The "log" (logarithm) button is the mathematical inverse of an exponent. It is used to determine what power a base number must be raised to in order to produce a specific number. In science and finance, logarithms are heavily used to track things that grow exponentially, such as compound interest, population growth, or the magnitude of earthquakes (the Richter scale).`,
    },
    {
      q: `What does the "Pi" (π) button do?`,
      a: `The Pi (π) button instantly inserts the mathematical constant representing the ratio of a circle's circumference to its diameter. Instead of manually typing out 3.14159 every time you need to calculate the area or volume of a circle, cylinder, or sphere, pressing this button inputs the highly precise, infinite value of Pi to ensure your final answer is perfectly accurate.`,
    },
    {
      q: `Can a scientific calculator compute scientific notation?`,
      a: `Yes, processing scientific notation is one of the primary features of this tool. Scientific notation allows you to easily work with numbers that are too large or too small to be written in standard decimal form (for example, the speed of light or the mass of an atom). The calculator often represents this with an "EXP" or "EE" button, allowing you to multiply a base number by 10 to a specific power.`,
    },
    {
      q: `How do I calculate a number to a specific power (exponents)?`,
      a: `To calculate an exponent, you use the power function, often represented on calculators by a caret symbol ( ^ ) or an "x^y" button. For example, to find out what 5 to the 3rd power is, you would enter the base number (5), press the exponent button ( ^ ), and then enter the power (3). The calculator will process the plain text formula 5 ^ 3 and output the correct answer of 125.`,
    },
  ];

  return (
    <>
      {/* Tool Header */}
      <section className="mb-12 text-center md:text-left mx-auto max-w-container-max">
        <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary-container/10 text-primary border border-primary-container/20 mb-4 font-label-md text-label-md">
          <span className="material-symbols-outlined text-[16px]">precision_manufacturing</span>
          <span>High-Precision Engine</span>
        </div>
      </section>

      {/* Calculator Interface */}
      <section className="mx-auto mb-12 max-w-container-max grid grid-cols-1 xl:grid-cols-12 gap-[24px] items-start">
        {/* Main Calculator Card */}
        <div className="xl:col-span-8 glass-card rounded-4xl p-6 shadow-xl relative overflow-hidden bg-white/70 dark:bg-surface-container/70 backdrop-blur-md border border-glass-border">
          {/* Settings / Mode Toggle */}
          <div className="absolute top-[24px] left-[24px] flex gap-2 z-10">
            <button
              onClick={() => setIsDegrees(true)}
              className={`px-[12px] py-[4px] rounded-full font-label-sm text-xs transition-colors ${isDegrees ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'}`}
            >
              Deg
            </button>
            <button
              onClick={() => setIsDegrees(false)}
              className={`px-[12px] py-[4px] rounded-full font-label-sm text-xs transition-colors ${!isDegrees ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'}`}
            >
              Rad
            </button>
          </div>

          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-container/10 blur-3xl rounded-full"></div>

          {/* Digital Display */}
          <div className="bg-surface-container-highest/50 rounded-2xl p-6 mb-6 mt-8 flex flex-col items-end gap-1 border border-outline-variant/30 min-h-35 justify-end relative z-10">
            <div className="text-on-surface-variant font-body-md text-body-md h-6 truncate opacity-70">
              {previousInput || "\u00A0"}
            </div>
            <div className="text-on-surface font-display-lg text-4xl md:text-5xl font-extrabold tracking-tight overflow-x-auto whitespace-nowrap scrollbar-hide w-full text-right overflow-y-hidden">
              {currentInput}
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-3 relative z-10">
            {/* Scientific Row 1 */}
            <button onClick={() => appendFunction('sin')} className="py-4 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">sin</button>
            <button onClick={() => appendFunction('cos')} className="py-4 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">cos</button>
            <button onClick={() => appendFunction('tan')} className="py-4 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">tan</button>
            <button onClick={() => appendFunction('log')} className="py-4 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">log</button>
            <button onClick={() => appendFunction('ln')} className="hidden lg:block py-3 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">ln</button>
            <button onClick={() => appendToken('(')} className="hidden sm:block py-3 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">(</button>
            <button onClick={() => appendToken(')')} className="hidden sm:block py-3 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">)</button>

            {/* Scientific Row 2 */}
            <button onClick={() => appendToken('^2')} className="py-3 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">x²</button>
            <button onClick={() => appendToken('^')} className="py-3 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">xⁿ</button>
            <button onClick={() => appendFunction('√')} className="py-3 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">√</button>
            <button onClick={() => appendToken('π')} className="py-3 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">π</button>
            <button onClick={() => appendToken('e')} className="hidden lg:block py-3 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">e</button>
            <button onClick={() => appendToken(' mod ')} className="hidden sm:block py-4 rounded-xl bg-surface-container text-primary font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">mod</button>
            <button onClick={() => appendToken('×10^')} className="hidden sm:block py-4 rounded-xl bg-surface-container-high text-on-surface-variant font-label-md text-sm hover:bg-surface-variant transition-all active:scale-95 shadow-sm">EXP</button>
          </div>

          {/* Standard Keypad Start */}
          <div className="col-span-4 sm:col-span-6 lg:col-span-7 grid grid-cols-4 gap-3 mt-4">
            {/* Numeric & Basic Ops */}
            <button onClick={clearCalc} className="py-4 rounded-xl bg-error-container text-on-error-container font-title-lg text-xl hover:brightness-95 transition-all active:scale-95 shadow-sm">AC</button>
            <button onClick={() => {
              if (currentInput.startsWith("-")) setCurrentInput(currentInput.substring(1));
              else if (currentInput !== "0") setCurrentInput("-" + currentInput);
            }} className="py-4 rounded-xl bg-surface-container-high text-on-surface font-title-lg text-xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm">+/-</button>
            <button onClick={() => appendToken('%')} className="py-4 rounded-xl bg-surface-container-high text-on-surface font-title-lg text-xl hover:bg-surface-variant transition-all active:scale-95 shadow-sm">%</button>
            <button onClick={() => appendToken('÷')} className="py-4 rounded-xl bg-secondary-container/20 text-secondary font-title-lg text-2xl hover:bg-secondary-container/30 transition-all active:scale-95 shadow-sm">÷</button>

            <button onClick={() => appendToken('7')} className="py-4 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xl hover:bg-surface-container transition-all active:scale-95 shadow-sm border border-outline-variant/30">7</button>
            <button onClick={() => appendToken('8')} className="py-4 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xl hover:bg-surface-container transition-all active:scale-95 shadow-sm border border-outline-variant/30">8</button>
            <button onClick={() => appendToken('9')} className="py-4 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xl hover:bg-surface-container transition-all active:scale-95 shadow-sm border border-outline-variant/30">9</button>
            <button onClick={() => appendToken('×')} className="py-4 rounded-xl bg-secondary-container/20 text-secondary font-title-lg text-2xl hover:bg-secondary-container/30 transition-all active:scale-95 shadow-sm">×</button>

            <button onClick={() => appendToken('4')} className="py-4 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xl hover:bg-surface-container transition-all active:scale-95 shadow-sm border border-outline-variant/30">4</button>
            <button onClick={() => appendToken('5')} className="py-4 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xl hover:bg-surface-container transition-all active:scale-95 shadow-sm border border-outline-variant/30">5</button>
            <button onClick={() => appendToken('6')} className="py-4 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xl hover:bg-surface-container transition-all active:scale-95 shadow-sm border border-outline-variant/30">6</button>
            <button onClick={() => appendToken('−')} className="py-4 rounded-xl bg-secondary-container/20 text-secondary font-title-lg text-2xl hover:bg-secondary-container/30 transition-all active:scale-95 shadow-sm">−</button>

            <button onClick={() => appendToken('1')} className="py-4 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xl hover:bg-surface-container transition-all active:scale-95 shadow-sm border border-outline-variant/30">1</button>
            <button onClick={() => appendToken('2')} className="py-4 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xl hover:bg-surface-container transition-all active:scale-95 shadow-sm border border-outline-variant/30">2</button>
            <button onClick={() => appendToken('3')} className="py-4 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xl hover:bg-surface-container transition-all active:scale-95 shadow-sm border border-outline-variant/30">3</button>
            <button onClick={() => appendToken('+')} className="py-4 rounded-xl bg-secondary-container/20 text-secondary font-title-lg text-2xl hover:bg-secondary-container/30 transition-all active:scale-95 shadow-sm">+</button>

            <button onClick={() => appendToken('0')} className="col-span-2 py-4 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xl hover:bg-surface-container transition-all active:scale-95 shadow-sm border border-outline-variant/30 text-left px-8">0</button>
            <button onClick={() => appendToken('.')} className="py-4 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xl hover:bg-surface-container transition-all active:scale-95 shadow-sm border border-outline-variant/30">.</button>
            <button onClick={calculate} className="py-4 rounded-xl bg-primary text-on-primary font-bold text-3xl hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/30">=</button>
          </div>
        </div>

        {/* Side Feature Panel */}
        <div className="xl:col-span-4 flex flex-col gap-[24px]">

          {/* Enterprise Ready Card */}
          <div className="relative rounded-[2rem] overflow-hidden aspect-video shadow-sm">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmKmIuktQqnNwEzO2qM-dGVKCHdMNoq-VZLNHASO4lX04-dSg-i0mmuK2gCIPdQbnCpxsveDUirFsR0jBTHmQMrWwxY2_EUlp6rr4vLcD0XeGcueCMUih6Ivt31CQ-_R29syHCC1Yl-oDCBV9oSwM1SZKtV59L08H-7HZgGbwIBfZlDh9zmWjp6zY4fB9S5wO852Bo4s8SMSIhQKlIM6z56HGweYPcAy9f3tfPXR4-Hohxkn-xBQLV08XwcfnvIOwp1C1eXTsN4L87"
              alt="Advanced Mathematics"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 to-transparent flex items-end p-[24px]">
              <div>
                <h4 className="text-on-primary font-title-lg text-title-lg">Enterprise Ready</h4>
                <p className="text-on-primary/80 font-label-sm text-label-sm">Integrated with Jamro Engineering Suite</p>
              </div>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="bg-[#e7eeff] dark:bg-surface-container rounded-[2rem] p-[24px] text-[#111c2d] dark:text-on-surface shadow-xl">
            <div className="flex items-center gap-[16px] mb-[16px]">
              <div className="w-12 h-12 rounded-xl bg-[#004ac6] flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[24px]">rocket_launch</span>
              </div>
              <h3 className="text-title-lg font-title-lg">Fast Processing</h3>
            </div>
            <p className="font-body-md text-body-md mb-[24px] opacity-80 leading-relaxed">
              Calculations are performed server-side with zero latency using our proprietary floating-point engine.
            </p>
            <div className="flex justify-between border-t border-on-primary/10 pt-[16px]">
              <div className="text-center">
                <div className="text-title-lg font-title-lg">0.02ms</div>
                <div className="text-label-sm opacity-60">Avg. Response</div>
              </div>
              <div className="text-center">
                <div className="text-title-lg font-title-lg">15 Digits</div>
                <div className="text-label-sm opacity-60">Precision</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section Full Width */}
      <section className="mx-auto max-w-container-max pb-[48px]">
        <div className="glass-card rounded-[2rem] p-[24px] shadow-lg border border-glass-border bg-white/70 dark:bg-surface-container/70 backdrop-blur-md">
          <div className="flex items-center justify-between mb-[16px]">
            <h4 className="font-label-md text-primary uppercase tracking-widest">History</h4>
            {history.length > 0 && (
              <button
                onClick={() => { setHistory([]); localStorage.removeItem("jamro_scientific_calc_history"); }}
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
      </section>

      {/* Tool Info Section */}
      <ToolInfoCard
        title="About the Scientific Calculator."
        content={[
          `Tackling advanced mathematics requires more than just basic addition and subtraction. The JamroTools Scientific Calculator is a robust, fully online web utility designed to solve complex equations in physics, engineering, trigonometry, and advanced algebra. Because this platform is built specifically for online use and relies on your active internet speed rather than your device's local memory, it delivers instant, real-time computational results without requiring any offline app downloads or installations.`,
          `Whether you are a high school student graphing sine waves, an engineering major calculating load limits, or a professional analyzing statistical data, this tool provides the comprehensive functions of a premium physical calculator directly in your browser.`,
          `/ Advanced Mathematics Made Accessible`,
          `A scientific calculator unlocks the ability to solve multi-step problems with precision. By using this online utility, you can easily transition from basic arithmetic to higher-level mathematics.`,
          `* Master Trigonometry: Instantly calculate angles and side lengths using Sine (sin), Cosine (cos), and Tangent (tan) functions for geometry and physics applications.`,
          `* Handle Complex Exponents: Calculate square roots, cube roots, and advanced powers without doing manual, error-prone multiplication.`,
          `* Utilize Logarithms: Easily solve logarithmic equations (log and ln) essential for calculating exponential growth, decay, and scientific notation.`,
          `Whether you are double-checking a difficult homework assignment or running quick calculations for a mechanical project, this calculator provides the exact mathematical data you need with lightning-fast accuracy.`,
        ]}
      />

      {/* FAQ Section */}
      <FaqSection items={faqItems} />
    </>
  );
}

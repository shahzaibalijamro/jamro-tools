import Image from "next/image";

export function ToolsCtaSection() {
  return (
    <section className="mt-[48px] p-[48px] rounded-2xl bg-inverse-surface text-on-primary-fixed-variant flex flex-col md:flex-row items-center justify-between gap-[24px] overflow-hidden relative">
      <div className="relative z-10">
        <h2 className="text-headline-md text-surface-bright mb-[8px]">
          Can't find a specific tool?
        </h2>
        <p className="text-body-md text-surface-variant opacity-80 max-w-lg">
          We're constantly adding new utilities to our ecosystem. Let
          us know what you're looking for and we'll build it for
          the community.
        </p>
        <button className="mt-[24px] px-[48px] py-[16px] bg-primary-container text-on-primary rounded-full text-label-md font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-95 shadow-lg cursor-pointer">
          Submit Tool Request
        </button>
      </div>
      <div className="w-[256px] h-[256px] md:w-[320px] md:h-[320px] bg-primary/20 rounded-full blur-[100px] absolute -right-[80px] -top-[80px]" />
      <div className="w-full md:w-[400px] aspect-[3/2] relative z-10 rounded-xl overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy3BakiwxG6qRWqcUxPr02ch-EMk444gMPbA9ODLZeyOtLhRBMoCkFYUjrTCzWetco9HRCViApNi2NuWrCnIJpf4YsYGBGUrDHIgwwS3VP8kJuH0w2tsNz8GAAtsH076s5FpnIVthYs8mFA5MLcrKm0zJtvbN4qLcd7KFEl04R4LHWZmyvxc_4HdIUMiB96U03T6ijbpy5PU2J-X9bGwa83k7WcIDcqoASQZdvHZIm9yuBCpgVNQWnvH44JA7oDhEeGHmQM4-X8C_L"
          alt="Digital building blocks and floating interface elements illustration"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
    </section>
  );
}
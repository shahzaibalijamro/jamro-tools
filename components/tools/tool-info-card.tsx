import React from "react";

interface ToolInfoCardProps {
  title: string;
  content: string[];
}

export function ToolInfoCard({ title, content }: ToolInfoCardProps) {
  return (
    <div className="flex flex-1 flex-col rounded-[14px] bg-[linear-gradient(135deg,#273247_0%,#223b68_100%)] dark:bg-none dark:bg-surface-container dark:border-0 p-8 text-white dark:text-on-surface shadow-[0_18px_48px_rgba(15,23,42,0.12)] min-[700px]:p-[38px] mb-[48px]">
      <div>
        <h2 className="text-[30px] font-extrabold leading-tight tracking-[-0.01em] min-[700px]:text-[28px]">
          {title}
        </h2>
        <div className="mt-5 text-[17px] font-medium leading-[1.55] text-[#d8e0ee] dark:text-on-surface-variant min-[700px]:text-[16px] space-y-4">
          {content.map((paragraph, index) => {
            // Handle bullet points properly if needed, but for now just render as text.
            if (paragraph.startsWith("* ")) {
              return (
                <ul key={index} className="list-disc pl-6">
                  <li>{paragraph.substring(2)}</li>
                </ul>
              );
            }
            if (paragraph.startsWith("/ ")) {
              return (
                <p className="font-bold text-white dark:text-on-surface" key={index}>{paragraph.substring(2)}</p>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

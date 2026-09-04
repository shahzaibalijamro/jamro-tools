import React from "react";

interface ToolInfoCardProps {
  title: string;
  content: string[];
}

export function ToolInfoCard({ title, content }: ToolInfoCardProps) {
  return (
    <section data-tool-editorial className="text-on-surface">
      <div>
        <h2 className="text-[26px] font-bold leading-tight tracking-[-0.02em]">
          {title}
        </h2>
        <div className="mt-[14px] space-y-[12px] text-[16px] leading-[1.65] text-on-surface-variant">
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
                <p className="font-bold text-on-surface" key={index}>{paragraph.substring(2)}</p>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

import { philosophy, teamMembers } from "@/components/about/about-data";
import { SectionHeading } from "@/components/about/about-ui";

function TeamCard({ member }: { member: (typeof teamMembers)[number] }) {
  return (
    <article className="rounded-[12px] border border-[#e2e8f0]/80 bg-white/70 p-6 text-center backdrop-blur-[10px]">
      <div className="mx-auto mb-4 size-24 overflow-hidden rounded-full bg-[#cfdaf2]">
        <Image
          src={member.image}
          alt={member.alt}
          width={96}
          height={96}
          className="size-full object-cover"
        />
      </div>
      <h3 className="text-[20px] font-semibold leading-[1.4] text-[#111c2d]">
        {member.name}
      </h3>
      <p className="mb-2 text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#004ac6]">
        {member.role}
      </p>
      <p className="text-[14px] font-semibold italic leading-[1.4] tracking-[0.01em] text-[#434655]">
        {member.quote}
      </p>
    </article>
  );
}

function PhilosophyCard() {
  const Icon = philosophy.icon;

  return (
    <article className="flex flex-col items-center justify-center rounded-[12px] bg-[#263143] p-6 text-center text-[#ecf1ff] shadow-md">
      <Icon className="mb-4 size-10 text-[#dbe1ff]" strokeWidth={2} aria-hidden="true" />
      <h3 className="mb-2 text-[20px] font-semibold leading-[1.4]">{philosophy.title}</h3>
      <p className="text-[14px] font-semibold leading-[1.4] tracking-[0.01em] text-[#c3c6d7]">
        {philosophy.description}
      </p>
    </article>
  );
}

export function TeamPhilosophySection() {
  return (
    <section className="mb-12">
      <SectionHeading
        title="Powered by Passion"
        description="We are a distributed team of engineers, designers, and mathematicians dedicated to building the ultimate utility belt for the digital age."
        className="mb-6"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <TeamCard member={teamMembers[0]} />
        <PhilosophyCard />
        <TeamCard member={teamMembers[1]} />
      </div>
    </section>
  );
}

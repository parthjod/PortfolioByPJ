"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { HoverPeek } from "@/components/ui/link-preview";
import DigitalSerenity3 from "../digital3-serenity-animated-landing-page";

export default function Projects() {
  return (
    <>
      <DigitalSerenity3/>
      <div className="w-full h-auto grid grid-cols-2 grid-rows-2 gap-10 px-4 py-10 place-items-center mt-[-1000px] mb-[200px]">
        {/* Top Right Card */}
        <div className="col-start-2 row-start-1">
          <PinCard
            title="Blockchain Voting"
            details="A decentralized, tamper-proof voting system built with Solidity, zk-SNARKs, and IPFS. Ensures voter anonymity and transparent real-time vote tracking. Ideal for hackathons and public elections.
            Tech Stack : MERN Stack, nodejs"
            update="April 2025"
            link="/pj123"
          />
        </div>

        {/* Bottom Left Card */}
        <div className="col-start-1 row-start-2">
          <PinCard
            title="Parth Connect"
            details="A full-stack collaboration platform using Next.js, WebRTC, and MongoDB. Enables real-time developer networking, video chat, and project showcase with zero deployment hassle."
            update="March 2025"
            link="https://github.com/parthjod/ParthConnect"
          />
        </div>

        <style jsx>{`
          @keyframes wave {
            0%,100%{transform:translateY(0);}
            50%{transform:translateY(-10px);}
          }
        `}</style>
      </div>
    </>
  );
}

function PinCard({
  title,
  details,
  update,
  link,
}: {
  title: string;
  details: string;
  update: string;
  link: string;
}) {
  return (
    <HoverPeek url={link}>
      <PinContainer title="Explore" href={link}>
      <div className="flex flex-col p-5 tracking-tight text-slate-100/50 w-[24rem] h-[28rem] bg-gradient-to-b from-slate-800/50 to-slate-800/0 backdrop-blur-sm border border-slate-700/50 rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-500 animate-pulse" />
        </div>

        {/* Content */}
        <div className="flex-1 mt-5 space-y-5">
          <div className="text-4xl font-bold text-slate-100 mb-10">{title}</div>

          <h5 className="text-base text-white font-light italic tracking-wide leading-relaxed">
            {details}
          </h5>

          {/* Animated Waves */}
          <div className="relative h-20 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute w-full h-20"
                style={{
                  background:
                    "linear-gradient(180deg,transparent 0%,rgba(59,130,246,0.1) 50%,transparent 100%)",
                  animation: `wave ${2 + i * 0.5}s ease-in-out infinite`,
                  opacity: 0.3 / i,
                  transform: `translateY(${i * 10}px)`,
                }}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end mb-10">
            <div className="text-xs text-slate-400 ">Updated: {update}</div>
            <HoverPeek url={link}>
              <div className="text-sky-400 text-sm font-medium hover:text-sky-300 cursor-pointer">
                View Project →
              </div>
            </HoverPeek>
          </div>
        </div>
      </div>
    </PinContainer>
    </HoverPeek>
  );
}
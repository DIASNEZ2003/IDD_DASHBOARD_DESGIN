import React from "react";
import { Volume2, Settings } from "lucide-react";

export interface DashboardHeaderProps {
  studentName?: string;
  subtitle?: string;
}

export default function DashboardHeader({
  studentName = "Student",
  subtitle = "Lets take the next step together",
}: DashboardHeaderProps) {
  return (
    <header className="w-full h-[76px] flex items-center justify-between select-none font-sans">
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <h1
            style={{ fontWeight: 900 }}
            className="text-xl sm:text-[22px] font-black text-[#1E3F84] tracking-tight leading-none"
          >
            Hi, {studentName}
          </h1>
          <img
            src="/thorney2.png"
            alt="Thorney"
            className="h-8 sm:h-9 w-auto object-contain shrink-0 drop-shadow-xs transition-transform hover:scale-105"
          />
        </div>

        <p className="text-xs sm:text-[13px] font-medium text-[#9F5B64] mt-1 tracking-tight">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <Volume2 size={15} className="text-slate-500" />
          <span>Read aloud</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <Settings size={15} className="text-slate-500" />
          <span>Display</span>
        </button>
      </div>
    </header>
  );
}

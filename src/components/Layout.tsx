import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import DisplaySettingsModal, { DisplaySettings } from "./DisplaySettingsModal";

export interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [activeTab, setActiveTab] = useState("my-day");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<DisplaySettings>({
    textSize: "normal",
    highContrast: false,
    simplifiedView: false,
    speechSpeed: 1.0,
  });

  const handleUpdateSettings = (newSettings: Partial<DisplaySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const getTextScaleClass = () => {
    if (settings.textSize === "large") return "text-[105%]";
    if (settings.textSize === "xlarge") return "text-[112%]";
    return "";
  };

  return (
    <div
      className={`flex min-h-screen bg-white text-slate-900 font-sans antialiased ${
        settings.highContrast ? "contrast-125" : ""
      } ${getTextScaleClass()}`}
    >
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        userName="Student Test"
        userRole="Student"
        resizable={true}
      />

      <main className="flex-1 min-h-screen bg-white px-6 sm:px-8 pb-8 text-slate-900 min-w-0">
        <DashboardHeader
          studentName="Student"
          subtitle="Lets take the next step together"
        />
        <div className="pt-6">
          {children}
        </div>
      </main>

      <DisplaySettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
}

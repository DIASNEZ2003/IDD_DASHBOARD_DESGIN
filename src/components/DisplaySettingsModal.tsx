import React from "react";
import { X, Type, Eye, Sparkles } from "lucide-react";

export interface DisplaySettings {
  textSize: "normal" | "large" | "xlarge";
  highContrast: boolean;
  simplifiedView: boolean;
  speechSpeed: number;
}

export interface DisplaySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: DisplaySettings;
  onUpdateSettings: (newSettings: Partial<DisplaySettings>) => void;
}

export default function DisplaySettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}: DisplaySettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs font-sans">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Display & Accessibility
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Settings options */}
        <div className="p-6 space-y-6">
          {/* Text Size */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              <Type size={14} />
              <span>Text Size</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: "normal", label: "Normal", preview: "Aa" },
                { id: "large", label: "Large", preview: "Aa+" },
                { id: "xlarge", label: "Extra Large", preview: "Aa++" },
              ].map((sizeOpt) => {
                const isSelected = settings.textSize === sizeOpt.id;
                return (
                  <button
                    key={sizeOpt.id}
                    type="button"
                    onClick={() =>
                      onUpdateSettings({ textSize: sizeOpt.id as DisplaySettings["textSize"] })
                    }
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/80 text-blue-700 font-bold ring-2 ring-blue-500/20"
                        : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <span className="text-sm font-semibold">{sizeOpt.preview}</span>
                    <span className="text-xs mt-0.5">{sizeOpt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center">
                <Eye size={17} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 leading-tight">High Contrast</p>
                <p className="text-xs text-slate-500 mt-0.5">Sharper borders and bolder contrast</p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.highContrast}
              onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                settings.highContrast ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  settings.highContrast ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Simplified View */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center">
                <Sparkles size={17} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 leading-tight">Simplified View</p>
                <p className="text-xs text-slate-500 mt-0.5">Focus purely on current tasks</p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.simplifiedView}
              onClick={() => onUpdateSettings({ simplifiedView: !settings.simplifiedView })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                settings.simplifiedView ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  settings.simplifiedView ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

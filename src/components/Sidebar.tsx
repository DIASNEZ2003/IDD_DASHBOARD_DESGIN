import React, { useState, useEffect, useRef } from "react";
import { Settings, Power } from "lucide-react";

export const MIN_SIDEBAR_WIDTH = 64;
export const MAX_SIDEBAR_WIDTH = 192;
const SNAP_THRESHOLD = 128;

export interface NavItem {
  id: string;
  label: string;
  iconSrc: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "my-day", label: "My day", iconSrc: "/my_day.svg" },
  { id: "my-learning", label: "My learning", iconSrc: "/my_learning.svg" },
  { id: "my-progress", label: "My progress", iconSrc: "/progress.png" },
  { id: "my-support", label: "My support", iconSrc: "/support.png" },
];

export interface SidebarProps {
  activeTab?: string;
  onSelectTab?: (id: string) => void;
  userName?: string;
  userRole?: string;
  onSignOut?: () => void;
  collapsed?: boolean;
  resizable?: boolean;
}

export default function Sidebar({
  activeTab = "my-day",
  onSelectTab,
  userName = "Student Test",
  userRole = "Student",
  onSignOut,
  collapsed = false,
  resizable = true,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [width, setWidth] = useState(collapsed ? MIN_SIDEBAR_WIDTH : MAX_SIDEBAR_WIDTH);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setIsCollapsed(collapsed);
    setWidth(collapsed ? MIN_SIDEBAR_WIDTH : MAX_SIDEBAR_WIDTH);
  }, [collapsed]);

  const handleSelect = (id: string) => {
    setCurrentTab(id);
    onSelectTab?.(id);
  };

  const effectiveCollapsed = isDragging ? width < SNAP_THRESHOLD : isCollapsed;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!resizable) return;
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !resizable) return;
    const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left || 0;
    const rawWidth = e.clientX - sidebarLeft;
    const clampedWidth = Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, rawWidth));
    setWidth(clampedWidth);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !resizable) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    document.body.style.userSelect = "";
    document.body.style.cursor = "";

    const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left || 0;
    const rawWidth = e.clientX - sidebarLeft;

    if (rawWidth < SNAP_THRESHOLD) {
      setWidth(MIN_SIDEBAR_WIDTH);
      setIsCollapsed(true);
    } else {
      setWidth(MAX_SIDEBAR_WIDTH);
      setIsCollapsed(false);
    }
  };

  const handleDoubleClick = () => {
    if (!resizable) return;
    if (effectiveCollapsed) {
      setWidth(MAX_SIDEBAR_WIDTH);
      setIsCollapsed(false);
    } else {
      setWidth(MIN_SIDEBAR_WIDTH);
      setIsCollapsed(true);
    }
  };

  return (
    <aside
      ref={sidebarRef}
      style={{ width: `${width}px` }}
      className={`relative flex h-screen shrink-0 flex-col font-sans sticky top-0 border-r select-none overflow-hidden bg-[#0A0F24] text-white border-white/10 ${
        isDragging ? "transition-none" : "transition-[width] duration-200 ease-in-out"
      } ${effectiveCollapsed ? "items-center" : ""}`}
    >
      {/* Draggable resize handle */}
      {resizable && (
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={handleDoubleClick}
          title="Drag to resize / Double-click to toggle"
          className="absolute top-0 right-0 h-full w-3 -mr-1.5 z-30 cursor-col-resize flex items-center justify-center group touch-none select-none"
        >
          <div
            className={`w-1 rounded-full h-8 transition-all duration-150 pointer-events-none ${
              isDragging
                ? "bg-blue-400 opacity-100 scale-y-125 shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                : "bg-white/20 opacity-0 group-hover:opacity-100 group-hover:bg-blue-400/80"
            }`}
          />
        </div>
      )}

      {/* Top Logo Container */}
      <div className="w-full bg-white flex items-center justify-center border-b border-white/10 h-[76px] px-2.5 py-2">
        {effectiveCollapsed ? (
          <button
            type="button"
            onClick={() => {
              if (resizable) {
                setWidth(MAX_SIDEBAR_WIDTH);
                setIsCollapsed(false);
              }
            }}
            title="Expand sidebar"
            className="focus:outline-none cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <img
              src="/collapse_logo.png"
              alt="MyThorneAI"
              className="size-11 object-contain block"
            />
          </button>
        ) : (
          <img
            src="/logo.png"
            alt="MyThorneAI"
            className="w-full h-auto max-h-10 px-1 object-contain block"
          />
        )}
      </div>

      {/* Navigation items */}
      <nav className={`mt-6 flex flex-col gap-1.5 w-full ${effectiveCollapsed ? "px-2 items-center" : "px-2.5"}`}>
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              title={effectiveCollapsed ? item.label : undefined}
              className={`group flex items-center rounded-lg transition-colors cursor-pointer ${
                effectiveCollapsed
                  ? "size-10 justify-center"
                  : "w-full gap-3 px-2.5 py-2 text-left text-[13.5px]"
              } ${
                isActive
                  ? "bg-white/10 text-white font-medium"
                  : "text-slate-300 hover:text-white hover:bg-white/5 font-medium"
              }`}
            >
              <span className="flex size-5 shrink-0 items-center justify-center">
                <img
                  src={item.iconSrc}
                  alt={item.label}
                  className={`size-[17px] object-contain transition-opacity brightness-0 invert ${
                    isActive ? "opacity-100" : "opacity-75 group-hover:opacity-100"
                  }`}
                />
              </span>
              {!effectiveCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile and Sign out */}
      <div className={`mt-auto pb-5 flex flex-col w-full ${effectiveCollapsed ? "px-2 items-center space-y-3" : "px-2.5 space-y-3"}`}>
        {/* Settings */}
        <button
          type="button"
          onClick={() => handleSelect("settings")}
          title={effectiveCollapsed ? "Settings" : undefined}
          className={`group flex items-center rounded-lg transition-colors cursor-pointer ${
            effectiveCollapsed
              ? "size-10 justify-center"
              : "w-full gap-3 px-2.5 py-2 text-left text-[13.5px]"
          } ${
            currentTab === "settings"
              ? "bg-white/10 text-white font-medium"
              : "text-slate-300 hover:text-white hover:bg-white/5 font-medium"
          }`}
        >
          <span className="flex size-5 shrink-0 items-center justify-center text-slate-300 group-hover:text-white">
            <Settings size={17} strokeWidth={2} />
          </span>
          {!effectiveCollapsed && <span className="truncate">Settings</span>}
        </button>

        {/* User Card */}
        <div
          className={`flex items-center pt-2.5 border-t border-white/10 w-full ${
            effectiveCollapsed ? "justify-center" : "gap-2.5 px-1"
          }`}
          title={effectiveCollapsed ? `${userName} (${userRole})` : undefined}
        >
          <div className="size-8 shrink-0 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center text-sm ring-1 ring-white/20 select-none shadow-xs">
            S
          </div>

          {!effectiveCollapsed && (
            <div className="min-w-0 leading-tight">
              <p className="text-xs font-semibold truncate text-white">{userName}</p>
              <p className="text-[11px] truncate text-slate-400">{userRole}</p>
            </div>
          )}
        </div>

        {/* Sign out */}
        {effectiveCollapsed ? (
          <button
            type="button"
            onClick={onSignOut}
            title="Sign out"
            className="size-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer shadow-2xs active:scale-[0.98] bg-white hover:bg-slate-100 text-[#0A0F24]"
          >
            <Power size={14} strokeWidth={2.2} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSignOut}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-2 px-3 text-xs font-bold transition-colors cursor-pointer shadow-2xs active:scale-[0.98] bg-white hover:bg-slate-100 text-[#0A0F24]"
          >
            <span>Sign out</span>
            <Power size={13.5} strokeWidth={2.6} />
          </button>
        )}
      </div>
    </aside>
  );
}

import type { NavItem } from "./types";

interface SidebarProps {
  activeView: NavItem;
  onNavigate: (view: NavItem) => void;
}

const navItems: Array<{ id: NavItem; label: string }> = [
  { id: "analyze", label: "Analyze" },
  { id: "history", label: "History" },
  { id: "about", label: "About" },
];

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-zinc-200 bg-white/80 px-6 py-8 backdrop-blur-md md:flex md:flex-col">
      <div className="mb-9">
        <div className="text-2xl font-semibold tracking-[-0.04em] text-zinc-900">
          ResumeLens AI
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={[
                "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
              ].join(" ")}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
        AI Resume Intelligence
      </div>
    </aside>
  );
}

export const mobileNavItems = navItems;

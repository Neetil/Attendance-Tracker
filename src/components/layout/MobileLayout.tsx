import React, { useState, ReactNode } from "react";
import { Home, BookOpen, Calendar, BarChart2, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

interface MobileLayoutProps {
  children: ReactNode;
}

interface NavItem {
  icon: JSX.Element;
  label: string;
  path: string;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const [activeTab, setActiveTab] = useState("home");

  const navItems: NavItem[] = [
    { icon: <Home size={22} />, label: "Home", path: "home" },
    { icon: <BookOpen size={22} />, label: "Subjects", path: "subjects" },
    { icon: <Calendar size={22} />, label: "Calendar", path: "calendar" },
    { icon: <BarChart2 size={22} />, label: "Stats", path: "stats" },
    { icon: <User size={22} />, label: "Profile", path: "profile" },
  ];

  const handleTabChange = (path: string) => {
    setActiveTab(path);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background">
      {/* Header */}
      <header className="px-4 py-3 flex justify-between items-center border-b">
        <div>
          <h1 className="font-heading font-bold text-lg gradient-text">AttendTrack</h1>
          <p className="text-xs text-muted-foreground">Keep your attendance on track</p>
        </div>
        <ThemeToggle variant="button" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <nav className="border-t bg-background">
        <ul className="flex justify-around items-center px-2">
          {navItems.map((item) => (
            <li key={item.path} className="flex-1">
              <button
                onClick={() => handleTabChange(item.path)}
                className={`w-full py-3 flex flex-col items-center justify-center relative ${
                  activeTab === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>

                {activeTab === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 w-10 h-1 bg-primary rounded-t-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Floating Action Button */}
      <div className="absolute bottom-20 right-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-14 h-14 rounded-full gradient-bg text-white shadow-lg"
        >
          <span className="text-2xl font-bold">+</span>
        </motion.button>
      </div>
    </div>
  );
}

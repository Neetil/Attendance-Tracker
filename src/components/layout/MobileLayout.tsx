import React, { ReactNode } from "react";
import { Home, BookOpen, Calendar, BarChart2, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MobileLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onFabClick?: () => void;
}

interface NavItem {
  icon: JSX.Element;
  label: string;
  path: string;
}

export function MobileLayout({ children, activeTab, onTabChange, onFabClick }: MobileLayoutProps) {
  const { user } = useAuth();

  const navItems: NavItem[] = [
    { icon: <Home size={22} />, label: "Home", path: "home" },
    { icon: <BookOpen size={22} />, label: "Subjects", path: "subjects" },
    { icon: <Calendar size={22} />, label: "Calendar", path: "calendar" },
    { icon: <BarChart2 size={22} />, label: "Stats", path: "stats" },
    { icon: <User size={22} />, label: "Profile", path: "profile" },
  ];

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background">
      {/* Header */}
      <header className="px-4 py-3 flex justify-between items-center border-b">
        <div>
          <h1 className="font-heading font-bold text-lg gradient-text">AttendTrack</h1>
          <p className="text-xs text-muted-foreground">
            {user ? `Welcome, ${user.name.split(' ')[0]}` : 'Keep your attendance on track'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {user && (
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          )}
          <ThemeToggle variant="button" />
        </div>
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
                onClick={() => onTabChange(item.path)}
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
          onClick={onFabClick}
        >
          <span className="text-2xl font-bold">+</span>
        </motion.button>
      </div>
    </div>
  );
}

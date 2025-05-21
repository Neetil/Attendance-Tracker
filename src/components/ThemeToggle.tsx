import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ variant = 'switch' }: { variant?: 'switch' | 'button' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'button') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full w-10 h-10 neumorphic-light dark:neumorphic-dark"
      >
        <motion.div
          animate={{ rotate: isDark ? 0 : 360 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? (
            <Moon className="h-5 w-5 text-purple-400" />
          ) : (
            <Sun className="h-5 w-5 text-amber-500" />
          )}
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-amber-500" />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-purple-700"
      />
      <Moon className="h-4 w-4 text-purple-400" />
    </div>
  );
}

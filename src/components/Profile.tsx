import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, ChevronRight, HelpCircle, LogOut, Moon, Settings, Shield, User as UserIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { studentProfile } from "@/data/mockData";
import { useTheme } from "@/contexts/ThemeContext";

export function Profile() {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="pb-20">
      <div className="mb-4">
        <h2 className="text-xl font-heading font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your preferences</p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-6 neumorphic-light dark:neumorphic-dark">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary">
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {studentProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
                <AvatarImage src="" />
              </Avatar>

              <div>
                <h3 className="font-medium text-lg">{studentProfile.name}</h3>
                <p className="text-sm text-muted-foreground">{studentProfile.email}</p>
                <div className="flex items-center mt-1">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    {studentProfile.department}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    Year {studentProfile.year}, Semester {studentProfile.semester}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-between">
              <motion.button
                className="flex flex-col items-center justify-center w-1/3 p-2"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300 mb-1">
                  <UserIcon size={18} />
                </div>
                <span className="text-xs">Edit Profile</span>
              </motion.button>

              <motion.button
                className="flex flex-col items-center justify-center w-1/3 p-2"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300 mb-1">
                  <Settings size={18} />
                </div>
                <span className="text-xs">Settings</span>
              </motion.button>

              <motion.button
                className="flex flex-col items-center justify-center w-1/3 p-2"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 mb-1">
                  <LogOut size={18} />
                </div>
                <span className="text-xs">Logout</span>
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="mb-6 overflow-hidden neumorphic-light dark:neumorphic-dark">
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Moon className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>Dark Mode</span>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Bell className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>Notifications</span>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={() => setNotifications(!notifications)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Support and About */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="overflow-hidden neumorphic-light dark:neumorphic-dark">
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <HelpCircle className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>Help & Support</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Shield className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>Privacy Policy</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="p-4 text-center">
                <p className="text-xs text-muted-foreground">App Version 1.0.0</p>
                <p className="text-xs text-muted-foreground mt-1">© 2025 AttendTrack</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

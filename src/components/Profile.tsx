import { useState } from "react";
import { motion } from "framer-motion";
import { LogOut, User, Mail, Book, School, Calendar, Info, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { studentProfile } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Profile() {
  const { user, logout } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);

  // Use authenticated user data or fallback to student profile
  const profileData = user || studentProfile;

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    if (confirmLogout) {
      logout();
    } else {
      setConfirmLogout(true);
      // Reset back to false after 3 seconds
      setTimeout(() => setConfirmLogout(false), 3000);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-heading font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your details and preferences</p>
      </div>

      {/* Profile Card */}
      <Card className="neumorphic-light dark:neumorphic-dark overflow-hidden">
        <div className="gradient-bg h-24 relative">
          <motion.div
            className="absolute -bottom-12 left-4 border-4 border-background rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Avatar className="h-24 w-24">
              <AvatarImage src="/avatar-placeholder.png" />
              <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                {getInitials(profileData.name)}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>

        <CardContent className="pt-14 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold">{profileData.name}</h3>
            <p className="text-sm text-muted-foreground">{profileData.email}</p>
          </motion.div>
        </CardContent>
      </Card>

      {/* Student Details */}
      <section>
        <h3 className="text-md font-semibold mb-3">Student Details</h3>
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center p-3 bg-card rounded-lg neumorphic-light dark:neumorphic-dark">
            <School className="w-5 h-5 text-primary mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium">Department</p>
              <p className="text-xs text-muted-foreground">{profileData.department}</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-card rounded-lg neumorphic-light dark:neumorphic-dark">
            <Book className="w-5 h-5 text-primary mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium">Semester</p>
              <p className="text-xs text-muted-foreground">Semester {profileData.semester}, Year {profileData.year}</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-card rounded-lg neumorphic-light dark:neumorphic-dark">
            <Calendar className="w-5 h-5 text-primary mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium">Academic Year</p>
              <p className="text-xs text-muted-foreground">2024-2025</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* App Settings */}
      <section>
        <h3 className="text-md font-semibold mb-3">App Settings</h3>
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="w-full flex items-center justify-between p-3 bg-card rounded-lg neumorphic-light dark:neumorphic-dark">
            <div className="flex items-center">
              <Info className="w-5 h-5 text-primary mr-3" />
              <p className="text-sm font-medium">About App</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </motion.div>
      </section>

      {/* Logout Button */}
      <div className="pt-4">
        <Button
          variant="destructive"
          className="w-full flex items-center justify-center"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {confirmLogout ? "Confirm logout" : "Logout"}
        </Button>
      </div>
    </div>
  );
}

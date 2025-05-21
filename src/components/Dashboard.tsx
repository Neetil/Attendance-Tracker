import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { AlertTriangle, Check, X } from "lucide-react";
import { AttendanceStats } from "@/components/AttendanceStats";
import { ClassCard } from "@/components/ClassCard";
import { AttendanceCard } from "@/components/AttendanceCard";
import {
  todayClasses,
  subjects,
  attendanceAlerts,
  getAlertForSubject
} from "@/data/mockData";

export function Dashboard() {
  const [localClasses, setLocalClasses] = useState(todayClasses);
  const today = format(new Date(), "EEEE, MMMM d");

  // Filter subjects with alerts
  const subjectsWithAlerts = subjects
    .filter(subject => {
      const alert = getAlertForSubject(subject.id);
      return alert && alert.level !== 'none';
    })
    .slice(0, 2); // Show only 2 alerts max

  const handleMarkAttendance = (sessionId: string, status: boolean) => {
    setLocalClasses(
      localClasses.map(session =>
        session.id === sessionId ? { ...session, attended: status } : session
      )
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Today's Date */}
      <div className="mb-4">
        <h2 className="text-xl font-heading font-semibold">{today}</h2>
        <p className="text-sm text-muted-foreground">Track your attendance</p>
      </div>

      {/* Attendance Stats */}
      <section className="mb-6">
        <AttendanceStats />
      </section>

      {/* Today's Classes */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-heading font-semibold">Today's Classes</h2>
          <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            {localClasses.length} Classes
          </span>
        </div>

        {localClasses.length > 0 ? (
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {localClasses.map(session => (
              <motion.div key={session.id} variants={itemVariants}>
                <ClassCard
                  session={session}
                  markAttendance={handleMarkAttendance}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="bg-muted rounded-lg p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground">No classes scheduled for today</p>
            <p className="text-xs mt-1 text-muted-foreground">Enjoy your free day!</p>
          </motion.div>
        )}
      </section>

      {/* Attendance Alerts */}
      {subjectsWithAlerts.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
            <h2 className="font-heading font-semibold">Attendance Alerts</h2>
          </div>

          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {subjectsWithAlerts.map(subject => (
              <motion.div key={subject.id} variants={itemVariants}>
                <AttendanceCard
                  subject={subject}
                  alert={getAlertForSubject(subject.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Quick Attendance Summary */}
      <section>
        <h2 className="font-heading font-semibold mb-3">Quick Summary</h2>
        <div className="grid grid-cols-2 gap-3">
          {subjects.slice(0, 4).map(subject => (
            <motion.div
              key={subject.id}
              className="bg-card p-3 rounded-lg border neumorphic-light dark:neumorphic-dark"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="font-medium text-sm truncate" style={{ color: subject.color }}>
                {subject.code}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-bold">
                  {Math.round((subject.attendedClasses / subject.totalClasses) * 100)}%
                </span>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>{subject.attendedClasses}</span>
                  <span>/</span>
                  <span>{subject.totalClasses}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

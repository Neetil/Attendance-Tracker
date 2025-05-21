import { Subject, AttendanceAlert } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface AttendanceCardProps {
  subject: Subject;
  alert?: AttendanceAlert;
}

export function AttendanceCard({ subject, alert }: AttendanceCardProps) {
  const attendancePercentage = Math.round((subject.attendedClasses / subject.totalClasses) * 100);
  const isLowAttendance = alert && alert.level !== 'none';

  // Determine color based on attendance percentage
  const getProgressColor = () => {
    if (attendancePercentage >= 90) return 'bg-green-500';
    if (attendancePercentage >= 75) return 'bg-blue-500';
    if (attendancePercentage >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${
      isLowAttendance
        ? alert?.level === 'danger'
          ? 'border-red-300 dark:border-red-900'
          : 'border-amber-300 dark:border-amber-900'
        : 'border-gray-200 dark:border-gray-800'
    } dark:neumorphic-dark neumorphic-light`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading font-semibold text-lg mb-1">{subject.name}</h3>
            <p className="text-sm text-muted-foreground">{subject.code} • {subject.instructor}</p>
          </div>

          {isLowAttendance && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="text-red-500 dark:text-red-400"
            >
              <AlertTriangle size={24} />
            </motion.div>
          )}
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Attendance</span>
            <span className="text-sm font-bold">{attendancePercentage}%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <motion.div
              className={`h-2 rounded-full ${getProgressColor()}`}
              initial={{ width: 0 }}
              animate={{ width: `${attendancePercentage}%` }}
              transition={{ duration: 1, type: 'spring' }}
            />
          </div>

          <div className="mt-4 flex justify-between text-sm text-muted-foreground">
            <span>Attended: {subject.attendedClasses}</span>
            <span>Total: {subject.totalClasses}</span>
          </div>

          {isLowAttendance && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-2 text-sm p-2 rounded-md ${
                alert?.level === 'danger'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
              }`}
            >
              {alert?.message}
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

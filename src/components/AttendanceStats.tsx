import { subjects, attendanceAlerts } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function AttendanceStats() {
  // Calculate overall attendance metrics
  const totalClasses = subjects.reduce((acc, subject) => acc + subject.totalClasses, 0);
  const attendedClasses = subjects.reduce((acc, subject) => acc + subject.attendedClasses, 0);
  const overallPercentage = Math.round((attendedClasses / totalClasses) * 100);

  // Count alerts by severity
  const criticalAlerts = attendanceAlerts.filter(a => a.level === 'danger').length;
  const warningAlerts = attendanceAlerts.filter(a => a.level === 'warning').length;

  // Determine overall status
  const getStatusColor = () => {
    if (overallPercentage >= 90) return 'text-green-500';
    if (overallPercentage >= 75) return 'text-blue-500';
    if (overallPercentage >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overall Attendance Card */}
      <Card className="neumorphic-light dark:neumorphic-dark">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Overall Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="relative w-24 h-24 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800"></div>

              {/* Progress circle */}
              <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  className="dark:stroke-gray-700"
                />
                <motion.circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset="251.2"
                  className={getStatusColor()}
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{
                    strokeDashoffset: 251.2 - (overallPercentage / 100 * 251.2)
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>

              {/* Percentage text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${getStatusColor()}`}>
                  {overallPercentage}%
                </span>
              </div>
            </motion.div>

            <p className="text-sm text-center">
              {attendedClasses} of {totalClasses} classes attended
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Subject Count */}
      <Card className="neumorphic-light dark:neumorphic-dark">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Subjects Tracked
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24">
            <motion.span
              className="text-4xl font-bold gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subjects.length}
            </motion.span>
          </div>
          <p className="text-sm text-center">Courses this semester</p>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      <Card className={`${criticalAlerts > 0 ? 'border-red-300 dark:border-red-800' : ''} neumorphic-light dark:neumorphic-dark`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-1">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span>Critical Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24">
            <motion.div
              className={`text-4xl font-bold ${criticalAlerts > 0 ? 'text-red-500' : 'text-muted-foreground'}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {criticalAlerts}
            </motion.div>
          </div>
          <p className="text-sm text-center">
            {criticalAlerts === 0 ? "No critical attendance issues" :
             criticalAlerts === 1 ? "Subject needs immediate attention" :
             `${criticalAlerts} subjects need immediate attention`}
          </p>
        </CardContent>
      </Card>

      {/* Warning Alerts */}
      <Card className={`${warningAlerts > 0 ? 'border-amber-300 dark:border-amber-800' : ''} neumorphic-light dark:neumorphic-dark`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-1">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>Warning Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24">
            <motion.div
              className={`text-4xl font-bold ${warningAlerts > 0 ? 'text-amber-500' : 'text-muted-foreground'}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            >
              {warningAlerts}
            </motion.div>
          </div>
          <p className="text-sm text-center">
            {warningAlerts === 0 ? "No attendance warnings" :
             warningAlerts === 1 ? "Subject needs attention" :
             `${warningAlerts} subjects need attention`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

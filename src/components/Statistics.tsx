import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { subjects, calculateAttendancePercentage } from "@/data/mockData";

export function Statistics() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sort subjects by attendance percentage
  const sortedSubjects = [...subjects].sort((a, b) => {
    const aPercentage = calculateAttendancePercentage(a);
    const bPercentage = calculateAttendancePercentage(b);
    return bPercentage - aPercentage;
  });

  // Calculate average attendance
  const averageAttendance = subjects.reduce((acc, subject) => {
    return acc + calculateAttendancePercentage(subject);
  }, 0) / subjects.length;

  // Find highest and lowest attendance
  const highestAttendance = sortedSubjects[0];
  const lowestAttendance = sortedSubjects[sortedSubjects.length - 1];

  // Count subjects by attendance range
  const excellentCount = subjects.filter(s => calculateAttendancePercentage(s) >= 90).length;
  const goodCount = subjects.filter(s => {
    const percentage = calculateAttendancePercentage(s);
    return percentage >= 75 && percentage < 90;
  }).length;
  const averageCount = subjects.filter(s => {
    const percentage = calculateAttendancePercentage(s);
    return percentage >= 60 && percentage < 75;
  }).length;
  const poorCount = subjects.filter(s => calculateAttendancePercentage(s) < 60).length;

  return (
    <div className="pb-20">
      <div className="mb-4">
        <h2 className="text-xl font-heading font-semibold">Statistics</h2>
        <p className="text-sm text-muted-foreground">Analyze your attendance data</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          {/* Summary Card */}
          <Card className="neumorphic-light dark:neumorphic-dark">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Attendance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <motion.div
                  className="relative w-32 h-32"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Background circle */}
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
                      stroke="#8B5CF6"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="251.2"
                      strokeDashoffset="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{
                        strokeDashoffset: 251.2 - (averageAttendance / 100 * 251.2)
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </svg>

                  {/* Percentage text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold gradient-text">
                      {Math.round(averageAttendance)}%
                    </span>
                    <span className="text-xs text-muted-foreground">Average</span>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Highest</p>
                  <p className="font-medium">{highestAttendance.code}</p>
                  <p className="text-sm font-bold text-green-600">
                    {calculateAttendancePercentage(highestAttendance)}%
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Lowest</p>
                  <p className="font-medium">{lowestAttendance.code}</p>
                  <p className="text-sm font-bold text-red-600">
                    {calculateAttendancePercentage(lowestAttendance)}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">{excellentCount}</div>
                  <p className="text-xs text-muted-foreground">Excellent<br />90%+</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">{goodCount}</div>
                  <p className="text-xs text-muted-foreground">Good<br />75-89%</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-amber-600">{averageCount}</div>
                  <p className="text-xs text-muted-foreground">Average<br />60-74%</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-600">{poorCount}</div>
                  <p className="text-xs text-muted-foreground">Poor<br />&lt;60%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Trend Card */}
          <Card className="neumorphic-light dark:neumorphic-dark">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-end justify-between gap-1">
                {[75, 82, 68, 90, 78, averageAttendance].map((value, index) => (
                  <div key={index} className="relative flex-1 h-full flex flex-col justify-end">
                    <motion.div
                      className="rounded-t-sm w-full gradient-bg opacity-80"
                      initial={{ height: 0 }}
                      animate={{ height: `${(value / 100) * 100}%` }}
                      transition={{ duration: 0.7, delay: index * 0.1 }}
                    />
                    <div className="text-xs text-center mt-1">{index === 5 ? 'Now' : `M${index+1}`}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-4 space-y-4">
          {/* Subject-wise Stats */}
          <Card className="neumorphic-light dark:neumorphic-dark">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Subject-wise Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedSubjects.map((subject) => {
                  const percentage = calculateAttendancePercentage(subject);
                  let statusColor = 'bg-red-500';

                  if (percentage >= 90) statusColor = 'bg-green-500';
                  else if (percentage >= 75) statusColor = 'bg-blue-500';
                  else if (percentage >= 60) statusColor = 'bg-amber-500';

                  return (
                    <div key={subject.id} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: subject.color }}></div>
                          <span className="text-sm font-medium">{subject.code}</span>
                        </div>
                        <span className="text-sm font-semibold">{percentage}%</span>
                      </div>

                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <motion.div
                          className={`h-2 rounded-full ${statusColor}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, type: "spring" }}
                        />
                      </div>

                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Present: {subject.attendedClasses}</span>
                        <span>Total: {subject.totalClasses}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Classes Attended vs Missed */}
          <Card className="neumorphic-light dark:neumorphic-dark">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Attended vs Missed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="10"
                      strokeDasharray="282.74"
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e11d48"
                      strokeWidth="10"
                      strokeDasharray="282.74"
                      strokeDashoffset="282.74"
                      initial={{ strokeDashoffset: 282.74 }}
                      animate={{
                        strokeDashoffset: 282.74 * (1 - averageAttendance / 100)
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="text-xs text-muted-foreground">Total Classes</div>
                    <div className="text-2xl font-bold">
                      {subjects.reduce((acc, s) => acc + s.totalClasses, 0)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-around mt-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm font-medium">Attended</span>
                  </div>
                  <div className="text-lg font-bold">
                    {subjects.reduce((acc, s) => acc + s.attendedClasses, 0)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium">Missed</span>
                  </div>
                  <div className="text-lg font-bold">
                    {subjects.reduce((acc, s) => acc + (s.totalClasses - s.attendedClasses), 0)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

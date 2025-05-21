import { ClassSession } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, Clock } from "lucide-react";
import { getSubjectById, isClassOngoing } from "@/data/mockData";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";

interface ClassCardProps {
  session: ClassSession;
  markAttendance?: (sessionId: string, status: boolean) => void;
  showDate?: boolean;
}

export function ClassCard({ session, markAttendance, showDate = false }: ClassCardProps) {
  const subject = getSubjectById(session.subjectId);
  const ongoing = isClassOngoing(session);
  const isPast = session.attended !== null;

  if (!subject) return null;

  const handleMarkAttendance = (status: boolean) => {
    if (markAttendance) {
      markAttendance(session.id, status);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className={`border-l-4 overflow-hidden neumorphic-light dark:neumorphic-dark transition-all duration-200 ${
        ongoing ? 'border-green-500 dark:border-green-600' : ''
      }`} style={{ borderLeftColor: subject.color }}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-base">{subject.name}</h3>
              <p className="text-sm text-muted-foreground">{subject.code}</p>

              {showDate && (
                <p className="text-xs text-muted-foreground mt-1">
                  {format(parseISO(session.date), "EEEE, MMM d")}
                </p>
              )}

              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {session.startTime} - {session.endTime}
                </span>
              </div>

              <p className="text-xs font-medium mt-1">
                {session.location}
              </p>
            </div>

            <div className="flex flex-col items-end">
              {ongoing && (
                <span className="text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                  Ongoing
                </span>
              )}

              {isPast ? (
                <div className="mt-2">
                  {session.attended ? (
                    <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span>Present</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
                      <X className="h-4 w-4" />
                      <span>Absent</span>
                    </div>
                  )}
                </div>
              ) : markAttendance ? (
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
                    onClick={() => handleMarkAttendance(true)}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    Present
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                    onClick={() => handleMarkAttendance(false)}
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    Absent
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

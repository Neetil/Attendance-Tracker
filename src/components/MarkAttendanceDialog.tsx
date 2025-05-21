import { useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Calendar, MapPin, Clock, User } from "lucide-react";
import { ClassSession } from "@/types";
import { getSubjectById } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetHeader, SheetFooter } from "@/components/ui/sheet";

interface MarkAttendanceDialogProps {
  open: boolean;
  onClose: () => void;
  onMarkAttendance: (sessionId: string, status: boolean) => void;
  session?: ClassSession;
}

export function MarkAttendanceDialog({
  open,
  onClose,
  onMarkAttendance,
  session
}: MarkAttendanceDialogProps) {
  const [marking, setMarking] = useState(false);

  if (!session) return null;

  const subject = getSubjectById(session.subjectId);

  if (!subject) return null;

  const handleMarkAttendance = (status: boolean) => {
    setMarking(true);

    // Simulate API call
    setTimeout(() => {
      onMarkAttendance(session.id, status);
      setMarking(false);
      onClose();
    }, 800);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-2xl px-0 sm:max-w-md sm:mx-auto">
        <SheetHeader className="px-6">
          <SheetTitle className="text-center font-heading">Mark Attendance</SheetTitle>
        </SheetHeader>

        <div className="py-6">
          <div className="relative px-6 py-4 bg-muted/50 mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: subject.color }}></div>
            <h3 className="font-medium">{subject.name}</h3>
            <p className="text-sm text-muted-foreground">{subject.code}</p>

            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{format(new Date(session.date), "EEEE, MMMM d, yyyy")}</span>
              </div>

              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{session.startTime} - {session.endTime}</span>
              </div>

              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{session.location}</span>
              </div>

              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{subject.instructor}</span>
              </div>
            </div>
          </div>

          <div className="px-6">
            <p className="text-center mb-6">Were you present in this class?</p>

            <div className="grid grid-cols-2 gap-4">
              <Button
                disabled={marking}
                variant="outline"
                className="h-16 group rounded-xl neumorphic-light dark:neumorphic-dark hover:text-green-600 dark:hover:text-green-400 hover:shadow-inner"
                onClick={() => handleMarkAttendance(true)}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 mb-1 rounded-full flex items-center justify-center bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300"
                  >
                    <Check className="h-5 w-5" />
                  </motion.div>
                  <span>Present</span>
                </div>
              </Button>

              <Button
                disabled={marking}
                variant="outline"
                className="h-16 group rounded-xl neumorphic-light dark:neumorphic-dark hover:text-red-600 dark:hover:text-red-400 hover:shadow-inner"
                onClick={() => handleMarkAttendance(false)}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 mb-1 rounded-full flex items-center justify-center bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300"
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                  <span>Absent</span>
                </div>
              </Button>
            </div>

            {marking && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Marking your attendance...
              </div>
            )}
          </div>
        </div>

        <SheetFooter className="px-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

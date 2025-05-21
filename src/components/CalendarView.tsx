import { useState } from "react";
import { format, startOfToday, eachDayOfInterval, endOfMonth, startOfMonth, isSameDay, isToday } from "date-fns";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { allClassSessions, getSubjectById } from "@/data/mockData";
import { ClassCard } from "@/components/ClassCard";
import { Button } from "@/components/ui/button";

export function CalendarView() {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDay, setSelectedDay] = useState(today);

  const firstDayCurrentMonth = startOfMonth(currentMonth);
  const lastDayCurrentMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: lastDayCurrentMonth,
  });

  const previousMonth = () => {
    const firstDayPreviousMonth = new Date(currentMonth);
    firstDayPreviousMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(firstDayPreviousMonth);
  };

  const nextMonth = () => {
    const firstDayNextMonth = new Date(currentMonth);
    firstDayNextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(firstDayNextMonth);
  };

  // Get classes for the selected day
  const selectedDayStr = format(selectedDay, "yyyy-MM-dd");
  const classesForSelectedDay = allClassSessions.filter(
    session => session.date === selectedDayStr
  );

  // Check if a day has classes
  const dayHasClasses = (day: Date) => {
    const dayStr = format(day, "yyyy-MM-dd");
    return allClassSessions.some(session => session.date === dayStr);
  };

  return (
    <div className="pb-20">
      <div className="mb-4">
        <h2 className="text-xl font-heading font-semibold">Calendar</h2>
        <p className="text-sm text-muted-foreground">View your schedule</p>
      </div>

      <div className="neumorphic-light dark:neumorphic-dark rounded-lg bg-card border mb-6">
        {/* Calendar header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={previousMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-px text-center">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="p-2 text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-px">
          {daysInMonth.map((day, dayIndex) => {
            const hasClasses = dayHasClasses(day);

            return (
              <motion.div
                key={day.toString()}
                whileTap={{ scale: 0.95 }}
                className={`
                  p-2 text-center relative
                  ${isSameDay(day, selectedDay) ? 'bg-primary/10' : ''}
                `}
                onClick={() => setSelectedDay(day)}
              >
                <button
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center mx-auto
                    text-sm
                    ${isToday(day) ? 'gradient-bg text-white font-bold' : ''}
                    ${isSameDay(day, selectedDay) && !isToday(day) ? 'bg-primary text-primary-foreground' : ''}
                  `}
                >
                  {format(day, "d")}
                </button>

                {hasClasses && (
                  <div
                    className={`
                      w-1 h-1 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2
                      ${isSameDay(day, selectedDay) ? 'bg-primary' : 'bg-accent'}
                    `}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Classes for selected day */}
      <div className="mb-4">
        <h3 className="font-medium text-sm mb-2">
          {format(selectedDay, "EEEE, MMMM d")}
        </h3>

        <div className="space-y-3">
          {classesForSelectedDay.length > 0 ? (
            classesForSelectedDay.map(session => (
              <ClassCard
                key={session.id}
                session={session}
              />
            ))
          ) : (
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <p className="text-muted-foreground">No classes scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { ClassSession, Subject, AttendanceAlert, DailySchedule, StudentProfile } from "@/types";
import { addDays, format, startOfWeek, isSameDay } from "date-fns";

// Mock student data
export const studentProfile: StudentProfile = {
  id: "s123456",
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  department: "Computer Science",
  semester: 5,
  year: 3,
};

// Mock subjects
export const subjects: Subject[] = [
  {
    id: "cs101",
    name: "Introduction to Algorithms",
    code: "CS101",
    instructor: "Dr. Sarah Chen",
    totalClasses: 45,
    attendedClasses: 40,
    color: "#8B5CF6", // Violet
    minAttendanceRequired: 75,
  },
  {
    id: "cs202",
    name: "Data Structures",
    code: "CS202",
    instructor: "Prof. James Wilson",
    totalClasses: 42,
    attendedClasses: 30,
    color: "#EC4899", // Pink
    minAttendanceRequired: 75,
  },
  {
    id: "cs303",
    name: "Database Systems",
    code: "CS303",
    instructor: "Dr. Emma Davis",
    totalClasses: 35,
    attendedClasses: 28,
    color: "#3B82F6", // Blue
    minAttendanceRequired: 75,
  },
  {
    id: "cs404",
    name: "Computer Networks",
    code: "CS404",
    instructor: "Prof. Michael Brown",
    totalClasses: 38,
    attendedClasses: 25,
    color: "#10B981", // Green
    minAttendanceRequired: 75,
  },
  {
    id: "cs505",
    name: "Web Development",
    code: "CS505",
    instructor: "Dr. Lisa Taylor",
    totalClasses: 40,
    attendedClasses: 22,
    color: "#F59E0B", // Amber
    minAttendanceRequired: 75,
  },
];

// Generate mock class sessions for each day of the week
const today = new Date();
const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Start from Monday

// Schedule template (classes repeat weekly)
const weeklyScheduleTemplate = [
  // Monday
  [
    { subjectId: "cs101", startTime: "09:00", endTime: "10:30", location: "Hall A-101" },
    { subjectId: "cs303", startTime: "11:00", endTime: "12:30", location: "Lab B-204" },
    { subjectId: "cs505", startTime: "14:00", endTime: "15:30", location: "Hall C-302" },
  ],
  // Tuesday
  [
    { subjectId: "cs202", startTime: "10:00", endTime: "11:30", location: "Hall D-105" },
    { subjectId: "cs404", startTime: "13:00", endTime: "14:30", location: "Lab E-210" },
  ],
  // Wednesday
  [
    { subjectId: "cs101", startTime: "09:00", endTime: "10:30", location: "Hall A-101" },
    { subjectId: "cs505", startTime: "11:00", endTime: "12:30", location: "Lab B-204" },
  ],
  // Thursday
  [
    { subjectId: "cs303", startTime: "09:00", endTime: "10:30", location: "Hall C-302" },
    { subjectId: "cs202", startTime: "13:00", endTime: "14:30", location: "Hall D-105" },
    { subjectId: "cs404", startTime: "15:00", endTime: "16:30", location: "Lab E-210" },
  ],
  // Friday
  [
    { subjectId: "cs101", startTime: "10:00", endTime: "11:30", location: "Hall A-101" },
    { subjectId: "cs303", startTime: "13:00", endTime: "14:30", location: "Lab B-204" },
    { subjectId: "cs505", startTime: "15:00", endTime: "16:30", location: "Hall C-302" },
  ],
];

// Generate 4 weeks of class sessions (current week + previous 3 weeks)
export const allClassSessions: ClassSession[] = [];

for (let weekOffset = -3; weekOffset <= 0; weekOffset++) {
  const weekStart = addDays(startOfCurrentWeek, weekOffset * 7);

  for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
    const date = addDays(weekStart, dayOffset);
    const dateString = format(date, "yyyy-MM-dd");
    const isPastDate = date < today && !isSameDay(date, today);

    weeklyScheduleTemplate[dayOffset].forEach((template, index) => {
      const session: ClassSession = {
        id: `${dateString}-${template.subjectId}-${index}`,
        subjectId: template.subjectId,
        date: dateString,
        startTime: template.startTime,
        endTime: template.endTime,
        location: template.location,
        // For past dates, randomly mark as attended (80% chance) or absent
        attended: isPastDate ? Math.random() < 0.8 : null,
      };

      allClassSessions.push(session);
    });
  }
}

// Get today's classes
export const todayClasses = allClassSessions.filter(session =>
  format(new Date(session.date), "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
);

// Calculate daily schedule for the next 7 days
export const weekSchedule: DailySchedule[] = Array.from({ length: 7 }, (_, i) => {
  const date = addDays(today, i);
  const dateString = format(date, "yyyy-MM-dd");
  const dayName = format(date, "EEEE");

  const dayClasses = allClassSessions.filter(
    session => session.date === dateString
  );

  return {
    date: dateString,
    day: dayName,
    classes: dayClasses,
  };
});

// Calculate attendance alerts
export const attendanceAlerts: AttendanceAlert[] = subjects.map(subject => {
  const attendancePercentage = Math.round((subject.attendedClasses / subject.totalClasses) * 100);
  let level: 'none' | 'warning' | 'danger' = 'none';
  let message = '';

  if (attendancePercentage < subject.minAttendanceRequired) {
    if (attendancePercentage < subject.minAttendanceRequired - 10) {
      level = 'danger';
      message = `Critical! Attendance below minimum requirement by ${subject.minAttendanceRequired - attendancePercentage}%`;
    } else {
      level = 'warning';
      message = `Low attendance! You're ${subject.minAttendanceRequired - attendancePercentage}% below the requirement`;
    }
  }

  return {
    subjectId: subject.id,
    level,
    message,
    percentage: attendancePercentage,
  };
});

// Utility function to get a subject by id
export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};

// Utility function to get alert for a subject
export const getAlertForSubject = (subjectId: string): AttendanceAlert | undefined => {
  return attendanceAlerts.find(alert => alert.subjectId === subjectId);
};

// Utility function to calculate attendance percentage
export const calculateAttendancePercentage = (subject: Subject): number => {
  return Math.round((subject.attendedClasses / subject.totalClasses) * 100);
};

// Utility function to check if a class is ongoing now
export const isClassOngoing = (session: ClassSession): boolean => {
  const now = new Date();
  const today = format(now, "yyyy-MM-dd");

  if (session.date !== today) return false;

  const currentTime = format(now, "HH:mm");
  return currentTime >= session.startTime && currentTime <= session.endTime;
};

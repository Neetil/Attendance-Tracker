export interface Subject {
  id: string;
  name: string;
  code: string;
  instructor: string;
  totalClasses: number;
  attendedClasses: number;
  color: string;
  minAttendanceRequired: number; // percentage
}

export interface ClassSession {
  id: string;
  subjectId: string;
  date: string; // ISO string
  startTime: string; // "HH:MM" format
  endTime: string; // "HH:MM" format
  location: string;
  attended: boolean | null; // null means not marked yet
  title?: string; // Optional title/topic
}

export type AttendanceStatus = 'present' | 'absent' | 'unmarked';

export interface DailySchedule {
  date: string; // ISO string
  day: string; // Monday, Tuesday, etc.
  classes: ClassSession[];
}

export interface AttendanceRecord {
  date: string; // ISO string
  subjectId: string;
  status: AttendanceStatus;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  semester: number;
  year: number;
}

export type AlertLevel = 'none' | 'warning' | 'danger';

export interface AttendanceAlert {
  subjectId: string;
  level: AlertLevel;
  message: string;
  percentage: number;
}

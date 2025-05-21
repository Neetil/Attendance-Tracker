import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Dashboard } from "@/components/Dashboard";
import { Subjects } from "@/components/Subjects";
import { CalendarView } from "@/components/CalendarView";
import { Statistics } from "@/components/Statistics";
import { Profile } from "@/components/Profile";
import { MarkAttendanceDialog } from "@/components/MarkAttendanceDialog";
import { todayClasses } from "@/data/mockData";

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleOpenAttendanceDialog = (sessionId: string) => {
    setSelectedSession(sessionId);
    setAttendanceDialogOpen(true);
  };

  const handleCloseAttendanceDialog = () => {
    setAttendanceDialogOpen(false);
    setSelectedSession(null);
  };

  const handleMarkAttendance = (sessionId: string, status: boolean) => {
    console.log(`Marking attendance for session ${sessionId}: ${status ? 'Present' : 'Absent'}`);
    // In a real app, this would update the backend
  };

  // Find the session selected for marking attendance
  const sessionForDialog = selectedSession
    ? todayClasses.find(session => session.id === selectedSession)
    : undefined;

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'subjects':
        return <Subjects />;
      case 'calendar':
        return <CalendarView />;
      case 'stats':
        return <Statistics />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <MobileLayout
        onTabChange={handleTabChange}
        activeTab={activeTab}
        onFabClick={() => setAttendanceDialogOpen(true)}
      >
        {renderContent()}
      </MobileLayout>

      <MarkAttendanceDialog
        open={attendanceDialogOpen}
        onClose={handleCloseAttendanceDialog}
        onMarkAttendance={handleMarkAttendance}
        session={sessionForDialog}
      />
    </ThemeProvider>
  );
}

export default App;

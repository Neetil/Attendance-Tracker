import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Dashboard } from "@/components/Dashboard";
import { Subjects } from "@/components/Subjects";
import { CalendarView } from "@/components/CalendarView";
import { Statistics } from "@/components/Statistics";
import { Profile } from "@/components/Profile";
import { MarkAttendanceDialog } from "@/components/MarkAttendanceDialog";
import { LoginPage } from "@/components/auth/LoginPage";
import { RegisterPage } from "@/components/auth/RegisterPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { todayClasses } from "@/data/mockData";

function MainApp() {
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
    <MobileLayout
      onTabChange={handleTabChange}
      activeTab={activeTab}
      onFabClick={() => setAttendanceDialogOpen(true)}
    >
      {renderContent()}

      <MarkAttendanceDialog
        open={attendanceDialogOpen}
        onClose={handleCloseAttendanceDialog}
        onMarkAttendance={handleMarkAttendance}
        session={sessionForDialog}
      />
    </MobileLayout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <MainApp />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

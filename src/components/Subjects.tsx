import { useState } from "react";
import { Search, Filter, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AttendanceCard } from "@/components/AttendanceCard";
import { subjects, getAlertForSubject } from "@/data/mockData";
import { Subject } from "@/types";

export function Subjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "attendance" | "code">("name");
  const [filterAlerts, setFilterAlerts] = useState(false);

  // Filter and sort subjects
  const filteredSubjects = subjects
    .filter(subject => {
      const matchesSearch =
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase());

      if (filterAlerts) {
        const alert = getAlertForSubject(subject.id);
        return matchesSearch && alert && alert.level !== 'none';
      }

      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "code") {
        return a.code.localeCompare(b.code);
      } else if (sortBy === "attendance") {
        const aPercentage = (a.attendedClasses / a.totalClasses) * 100;
        const bPercentage = (b.attendedClasses / b.totalClasses) * 100;
        return bPercentage - aPercentage;
      }
      return 0;
    });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="mb-4">
        <h2 className="text-xl font-heading font-semibold">Subjects</h2>
        <p className="text-sm text-muted-foreground">Track your subject-wise attendance</p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-2 bg-card p-2 rounded-lg border neumorphic-light dark:neumorphic-dark">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-4 py-2 rounded-md bg-transparent text-sm focus:outline-none"
          />
        </div>
        <button
          onClick={() => setFilterAlerts(!filterAlerts)}
          className={`p-2 rounded-md ${
            filterAlerts
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
              : 'bg-muted/50 text-muted-foreground'
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
        </button>
        <div className="relative">
          <button className="p-2 rounded-md bg-muted/50 text-muted-foreground">
            <Filter className="h-4 w-4" />
          </button>
          <div className="absolute right-0 mt-1 bg-popover shadow-lg rounded-md p-2 border text-popover-foreground w-40 hidden">
            <div className="space-y-1">
              <button
                onClick={() => setSortBy("name")}
                className={`w-full text-left px-2 py-1 text-sm rounded-md ${sortBy === "name" ? "bg-muted" : ""}`}
              >
                Sort by Name
              </button>
              <button
                onClick={() => setSortBy("code")}
                className={`w-full text-left px-2 py-1 text-sm rounded-md ${sortBy === "code" ? "bg-muted" : ""}`}
              >
                Sort by Code
              </button>
              <button
                onClick={() => setSortBy("attendance")}
                className={`w-full text-left px-2 py-1 text-sm rounded-md ${sortBy === "attendance" ? "bg-muted" : ""}`}
              >
                Sort by Attendance
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSortBy("name")}
          className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${
            sortBy === "name"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy("code")}
          className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${
            sortBy === "code"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Code
        </button>
        <button
          onClick={() => setSortBy("attendance")}
          className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${
            sortBy === "attendance"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Attendance %
        </button>
        {filterAlerts && (
          <button
            onClick={() => setFilterAlerts(false)}
            className="px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 flex items-center"
          >
            Alerts <span className="ml-1 text-xs">×</span>
          </button>
        )}
      </div>

      {/* Subject List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${searchQuery}-${sortBy}-${filterAlerts}`}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map(subject => (
              <motion.div key={subject.id} variants={itemVariants}>
                <AttendanceCard
                  subject={subject}
                  alert={getAlertForSubject(subject.id)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="bg-muted rounded-lg p-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground">No subjects found</p>
              <p className="text-xs mt-1 text-muted-foreground">Try adjusting your filters</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

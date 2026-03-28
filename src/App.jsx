import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import CourseCard from "./components/CourseCard.jsx";
import SemesterPlanner from "./components/SemesterPlanner.jsx";
import Summary from "./components/Summary.jsx";
import Loader from "./components/Loader.jsx";

import { fetchCourses } from "./data/courses.js";

function App() {
  // 🔹 State
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load courses (Async simulation)
  useEffect(() => {
    fetchCourses()
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔹 Load saved courses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("selectedCourses");
    if (saved) {
      setSelectedCourses(JSON.parse(saved));
    }
  }, []);

  // 🔹 Save courses to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses));
  }, [selectedCourses]);

  // 🔥 Add course (with prerequisite validation)
  const addCourse = (course) => {
    // Check prerequisites
    const hasPrereq = course.prereq.every((pr) =>
      selectedCourses.find((c) => c.id === pr)
    );

    if (!hasPrereq) {
      alert("❌ Please complete prerequisites first!");
      return;
    }

    // Prevent duplicates
    if (!selectedCourses.find((c) => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  // 🔹 Remove course
  const removeCourse = (id) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== id));
  };

  // 🔹 Loading state
  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <Navbar />

      <div className="container">
        <Routes>

          {/* 🔹 Course List */}
          <Route
            path="/"
            element={
              <div className="grid">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSelect={addCourse}
                  />
                ))}
              </div>
            }
          />

          {/* 🔹 Planner */}
          <Route
            path="/planner"
            element={
              <SemesterPlanner
                selectedCourses={selectedCourses}
                removeCourse={removeCourse}
              />
            }
          />

          {/* 🔹 Summary */}
          <Route
            path="/summary"
            element={<Summary selectedCourses={selectedCourses} />}
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

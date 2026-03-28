import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CourseCard from "./components/Coursecard";
import SemesterPlanner from "./components/SemesterPlanner";
import Summary from "./components/Summary";
import Loader from "./components/Loader";
import { fetchCourses } from "./data/Courses";

function App() {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addCourse = (course) => {
    if (!selectedCourses.find(c => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const removeCourse = (id) => {
    setSelectedCourses(selectedCourses.filter(c => c.id !== id));
  };

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">

        <Routes>
          <Route path="/" element={
            <div className="grid">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} onSelect={addCourse} />
              ))}
            </div>
          } />

          <Route path="/planner" element={
            <SemesterPlanner 
              selectedCourses={selectedCourses} 
              removeCourse={removeCourse} 
            />
          } />

          <Route path="/summary" element={
            <Summary selectedCourses={selectedCourses} />
          } />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
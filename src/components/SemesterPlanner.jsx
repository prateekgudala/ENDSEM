import { useMemo } from "react";

export default function SemesterPlanner({ selectedCourses, removeCourse }) {

  const totalCredits = useMemo(() => {
    return selectedCourses.reduce((sum, c) => sum + c.credits, 0);
  }, [selectedCourses]);

  return (
    <div>
      <h2>📅 Semester Planner</h2>
      <h3>Total Credits: {totalCredits}</h3>

      {selectedCourses.map(course => (
        <div key={course.id} className="planner-item">
          <span>{course.name}</span>
          <button onClick={() => removeCourse(course.id)}>Remove</button>
        </div>
      ))}

      {totalCredits > 18 && <p className="error">⚠ Credit limit exceeded!</p>}
    </div>
  );
}
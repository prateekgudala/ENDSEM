export default function CourseCard({ course, onSelect }) {
    return (
      <div className="card">
        <h3>{course.name}</h3>
        <p>Credits: {course.credits}</p>
        <p>Prerequisites: {course.prereq.length ? course.prereq.join(", ") : "None"}</p>
        <button onClick={() => onSelect(course)}>Add</button>
      </div>
    );
  }
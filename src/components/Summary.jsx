export default function Summary({ selectedCourses }) {
    return (
      <div>
        <h2>📊 Summary</h2>
        <ul>
          {selectedCourses.map(c => (
            <li key={c.id}>{c.name} ({c.credits} credits)</li>
          ))}
        </ul>
      </div>
    );
  }
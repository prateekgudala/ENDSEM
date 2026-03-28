export const fetchCourses = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Data Structures", credits: 4, prereq: [] },
          { id: 2, name: "Algorithms", credits: 4, prereq: [1] },
          { id: 3, name: "Database Systems", credits: 3, prereq: [] },
          { id: 4, name: "Operating Systems", credits: 4, prereq: [1] },
          { id: 5, name: "Computer Networks", credits: 3, prereq: [] },
          { id: 6, name: "Machine Learning", credits: 4, prereq: [2] }
        ]);
      }, 1000);
    });
  };
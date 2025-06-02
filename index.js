const lessonsData = [];

// Function to add lesson data (called by each lesson file)
function addLesson(lesson) {
  lessonsData.push(lesson);
  console.log('Lesson added:', lesson.name, 'Total lessons:', lessonsData.length);
}
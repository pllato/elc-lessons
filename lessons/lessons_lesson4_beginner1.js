if (!window.lessonsData) {
  window.lessonsData = [];
}

window.lessonsData.push({
  level: 'beginner1', // Уровень урока
  lesson: 'lesson4', // Идентификатор урока
  name: 'Lesson 4: Where are you from?', // Название урока
  requiredCorrect: 3, // Количество правильных ответов для каждой структуры, чтобы завершить урок
  structures: [
    {
      id: 'where-are-you-from',
      structure: 'Where are you from? I am from _______.',
      hasName: true, // Указывает, что ответ уникален (чтобы избежать повторов)
    },
    {
      id: 'where-is-he-from',
      structure: 'Where is he from? He is from _______.',
      hasName: true,
    },
    {
      id: 'where-is-she-from',
      structure: 'Where is she from? She is from _______.',
      hasName: true,
    }
  ],
  validateStructure: function(spokenText, structure) {
    spokenText = spokenText.toLowerCase().trim();

    // Разбиваем сказанное на слова
    const words = spokenText.split(/\s+/);

    // Проверяем, соответствует ли сказанное структуре
    if (structure.id === 'where-are-you-from') {
      // Ожидаем: "I am from [место]"
      if (words.length < 4) return false; // Минимум 4 слова: "I am from [место]"
      return words[0] === 'i' && words[1] === 'am' && words[2] === 'from';
    } else if (structure.id === 'where-is-he-from') {
      // Ожидаем: "He is from [место]"
      if (words.length < 4) return false;
      return words[0] === 'he' && words[1] === 'is' && words[2] === 'from';
    } else if (structure.id === 'where-is-she-from') {
      // Ожидаем: "She is from [место]"
      if (words.length < 4) return false;
      return words[0] === 'she' && words[1] === 'is' && words[2] === 'from';
    }
    return false;
  }
});
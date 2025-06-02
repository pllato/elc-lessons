addLesson({
  level: "beginner1",
  lesson: "lesson3",
  name: "Урок 3",
  structures: [
    { structure: "I am a _______.", pattern: ["i", "am", "a", "profession"], id: "s1", hasName: true },
    { structure: "You are a _______.", pattern: ["you", "are", "a", "profession"], id: "s2", hasName: true },
    { structure: "He is a ________.", pattern: ["he", "is", "a", "profession"], id: "s3", hasName: true },
    { structure: "She is a ________.", pattern: ["she", "is", "a", "profession"], id: "s4", hasName: true },
    { structure: "We are ____s.", pattern: ["we", "are", "profession"], id: "s5", hasName: true, requiresPlural: true },
    { structure: "They are ____s.", pattern: ["they", "are", "profession"], id: "s6", hasName: true, requiresPlural: true }
  ],
  requiredCorrect: 2,
  irregularPlurals: {
    "child": "children",
    "person": "people",
    "man": "men",
    "woman": "women",
    "mouse": "mice",
    "goose": "geese",
    "foot": "feet",
    "tooth": "teeth"
  },
  validateStructure: function(text, structure) {
    const words = text.split(' ').filter(word => word.length > 0);
    const pattern = structure.pattern;
    let wordIndex = 0;
    let spokenProfession = "";
    let baseForm = ""; // Базовая форма слова для проверки уникальности

    for (let part of pattern) {
      if (part === 'profession') {
        if (!words[wordIndex]) return false; // Должно быть слово для профессии
        spokenProfession = words[wordIndex];

        // Определяем базовую форму слова для проверки уникальности
        if (spokenProfession.endsWith('s')) {
          baseForm = spokenProfession.slice(0, -1); // Убираем "s" для регулярных форм
        } else {
          // Проверяем, является ли слово нерегулярной формой множественного числа
          baseForm = Object.keys(this.irregularPlurals).find(
            key => this.irregularPlurals[key] === spokenProfession
          ) || spokenProfession; // Если не нашли в списке, оставляем как есть
        }

        // Для "We are ____s" и "They are ____s" профессия должна быть во множественном числе
        if (structure.requiresPlural) {
          const isRegularPlural = spokenProfession.endsWith('s'); // Регулярная форма множественного числа
          const isIrregularPlural = Object.values(this.irregularPlurals).includes(spokenProfession); // Нерегулярная форма
          if (!isRegularPlural && !isIrregularPlural) return false; // Должно быть либо "s", либо нерегулярная форма
        } else {
          // Для единственного числа (I, You, He, She)
          const isIrregularPlural = Object.values(this.irregularPlurals).includes(spokenProfession);
          if (isIrregularPlural) return false; // Нерегулярная форма множественного числа не допускается
          if (spokenProfession.endsWith('s')) return false; // Не должно быть во множественном числе
          if (wordIndex > 0 && words[wordIndex - 1] !== 'a') return false; // Должно быть 'a' перед профессией
        }

        wordIndex++;
      } else {
        if (!words[wordIndex] || words[wordIndex] !== part) return false;
        wordIndex++;
      }
    }
    if (wordIndex !== words.length) return false;

    // Проверяем уникальность профессии (если hasName: true)
    if (structure.hasName) {
      const isDuplicate = spokenHistory.includes(baseForm);
      if (isDuplicate) return false; // Профессия уже использовалась
    }

    return true;
  }
});
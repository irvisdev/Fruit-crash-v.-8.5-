import { CANDY_COLORS } from '../constants';

const PRAISES_RU = ["Хо-хо-хо!", "Морозно!", "Отлично!", "Волшебно!", "Вкусно!"];
const PRAISES_EN = ["Ho-ho-ho!", "Frosty!", "Excellent!", "Magical!", "Tasty!"];

export const generateOfflineLevel = (level: number) => {
    // Чередуем: 1, 3, 5... - Сбор. 2, 4, 6... - Очки.
    const levelType = level % 2 !== 0 ? 'collect' : 'score';

    let targetScore = 0;
    const targetFruits = [];

    if (levelType === 'score') {
        targetScore = 800 + (level * 150); 
    } else {
        targetScore = 300 + (level * 50);
        const targetsCount = Math.min(4, 2 + Math.floor((level) / 5));
        const availableColors = [...CANDY_COLORS].sort(() => 0.5 - Math.random());
        for (let i = 0; i < targetsCount; i++) {
            targetFruits.push({ color: availableColors[i], count: 6 + Math.floor(level * 0.5) });
        }
    }

    const storiesRu = [
        "Дядя Макар проверяет списки.", "Сани требуют подзарядки.", "Снеговики помогают в саду.",
        "Маскировка почти идеальна.", "Нужно наполнить погреб.", "Эльфы устроили соревнование.",
        "Готовим волшебный компот.", "Северное сияние освещает сад.", "Замерзшие ветки сладкие.",
        "Дядя Макар надевает шубу."
    ];
    const storiesEn = [
        "Uncle Makar checks the lists.", "Sleigh needs recharging.", "Snowmen help in the garden.",
        "Camouflage is almost perfect.", "Need to fill the cellar.", "Elves started a competition.",
        "Cooking magic compote.", "Northern lights light up the garden.", "Frozen branches are sweet.",
        "Uncle Makar puts on his coat."
    ];

    const storyIndex = level % storiesRu.length;

    // Возвращаем тексты на обоих языках
    return { 
      levelType,
      objectiveRu: levelType === 'score' ? `Уровень ${level}: Набери ${targetScore} очков!` : `Уровень ${level}: Собери фрукты!`,
      objectiveEn: levelType === 'score' ? `Level ${level}: Score ${targetScore} points!` : `Level ${level}: Collect fruits!`,
      storyRu: storiesRu[storyIndex] || "Зима близко...",
      storyEn: storiesEn[storyIndex] || "Winter is coming...",
      targetScore,
      targetFruits
    };
};

export const getLevelObjective = async (level: number) => {
  return generateOfflineLevel(level);
};

export const getAICommentary = async (scoreDelta: number, lang: 'ru' | 'en' = 'ru') => {
  const arr = lang === 'en' ? PRAISES_EN : PRAISES_RU;
  return arr[Math.floor(Math.random() * arr.length)];
};

import {faker} from '@faker-js/faker';
import {IEmotion} from '../interfaces/Emotion';
import {emotions} from './emotions';
import {IDiaryItemWithId} from '../interfaces/DiaryItem';
import {nanoid} from 'nanoid';

function generateRandomEmotion(): IEmotion {
  const i = Math.floor(Math.random() * emotions.length);
  const random = emotions[i];
  return {
    id: i,
    emotion: random.emotion,
    emoji: random.emoji,
  };
}

// Generate sample data for MemoryItemProps
function generateSampleMemoryItem(): IDiaryItemWithId {
  return {
    id: nanoid(),
    date: faker.date.past(),
    title: faker.lorem.words(),
    image: faker.image.url(),
    entry: faker.lorem.paragraphs(),
    emotion: [generateRandomEmotion(), generateRandomEmotion()], // Generate two random emotions for demonstration
    isSpecial: !Math.round(Math.random()),
  };
}

export function generateMemories(amount = 10) {
  return Array.from({length: amount}, () => generateSampleMemoryItem());
}

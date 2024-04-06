export interface IEmotion {
  id: number;
  emotion: string;
  emoji: string;
}

export interface IEmotionWithoutId extends Omit<IEmotion, 'id'> {}

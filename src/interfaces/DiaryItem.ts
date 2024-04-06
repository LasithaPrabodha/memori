import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {IEmotion} from './Emotion';

export interface IDiaryItem {
  id?: string;
  date: Date | FirebaseFirestoreTypes.Timestamp;
  title: string;
  image?: string;
  entry: string;
  emotion: IEmotion[];
  isSpecial: boolean;
  hasImage?: boolean;
}

export interface IDiaryItemWithId extends Omit<IDiaryItem, 'id'> {
  id: string;
}

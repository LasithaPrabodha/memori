import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {IDiaryItem, IDiaryItemWithId} from '../interfaces/DiaryItem';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
export default class MemoriesService {
  private static instance: MemoriesService;
  private list: IDiaryItemWithId[] = [];
  public reachedEnd = false;

  private constructor() {}

  public static getInstance(): MemoriesService {
    if (!MemoriesService.instance) {
      MemoriesService.instance = new MemoriesService();
    }
    return MemoriesService.instance;
  }

  private getUserMemories() {
    const uid = auth().currentUser?.uid;
    return firestore().collection(`Users/${uid}/Memories`);
  }

  public async saveTransaction(memory: IDiaryItem) {
    const {image, ..._memory} = memory;

    const doc = await this.getUserMemories().add({
      ..._memory,
      created: firestore.FieldValue.serverTimestamp(),
    });

    if (image) {
      const reference = storage().ref('/images/memories/' + doc.id);
      await reference.putFile(image);
    }
  }

  public async deleteMemory(id: string, hasImage: boolean) {
    await this.getUserMemories().doc(id).delete();

    if (hasImage) {
      const reference = storage().ref('/images/memories/' + id);
      await reference.delete();
    }
  }

  public async loadList(limit = 5): Promise<IDiaryItemWithId[]> {
    try {
      this.reachedEnd = false;

      console.log('loading');

      this.list = await this.getUserMemories()
        .orderBy('date', 'desc')
        .limit(limit)
        .get()
        .then(snapshot => {
          let list: IDiaryItemWithId[] = [];
          if (!snapshot.empty) {
            snapshot.forEach(async doc => {
              const data = doc.data() as IDiaryItem;

              list.push({
                ...data,
                date: (data.date as FirebaseFirestoreTypes.Timestamp).toDate(),
                id: doc.id,
              });
            });
          }

          return list;
        });

      return this.list;
    } catch (e) {
      return [];
    }
  }

  public async loadImage(id: string) {
    return await storage()
      .ref('images/memories/' + id)
      .getDownloadURL();
  }

  public async loadMore(limit = 10) {
    const last = this.list[this.list.length - 1];
    if (!last) {
      return [];
    }
    console.log('loading more');
    const prevLastDoc = await this.getUserMemories().doc(last.id).get();

    let nextList: IDiaryItemWithId[] = [];
    try {
      nextList = await this.getUserMemories()
        .orderBy('date', 'desc')
        .startAt(prevLastDoc)
        .limit(limit)
        .get()
        .then(snapshot => {
          let list: IDiaryItemWithId[] = [];

          if (snapshot.size < limit) {
            this.reachedEnd = true;
          } else {
            this.reachedEnd = false;
          }

          snapshot.forEach((doc, i) => {
            // skipping the first one as it is the previously last
            if (i === 0) {
              return;
            }

            const data = doc.data() as IDiaryItem;
            list.push({...data, id: doc.id});
          });

          return list;
        });
    } catch (e) {
      this.reachedEnd = true;
      console.error(e);
    }

    this.list = [...this.list, ...nextList];

    return this.list;
  }
}

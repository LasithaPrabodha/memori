import {View, StyleSheet} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import PlusButton from '../components/Buttons/PlusButton';
import NewMemoryModal from '../components/NewMemory/NewMemoryModal';
import DiaryLayout from '../components/Memories/DiaryLayout';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';

const Diary = () => {
  const [modal, setModal] = useState(false);
  const [newMemoryAdded, setNewMemoryAdded] = useState(false);

  const handlePresentModalPress = useCallback(() => {
    if (modal) {
      setModal(false);
      actionSheetRef.current?.hide();
    } else {
      setModal(true);
      actionSheetRef.current?.show();
    }
  }, [modal]);

  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <View style={styles.diaryContainer}>
      <DiaryLayout
        toggleModal={handlePresentModalPress}
        onAddNewMemory={newMemoryAdded}
      />
      <PlusButton toggleModal={handlePresentModalPress} />

      <ActionSheet ref={actionSheetRef} onClose={() => setModal(false)}>
        <NewMemoryModal
          toggleModal={handlePresentModalPress}
          onAddNewMemory={() => setNewMemoryAdded(!newMemoryAdded)}
        />
      </ActionSheet>
    </View>
  );
};

Diary.navigationOptions = {
  headerLeft: null,
};

const styles = StyleSheet.create({
  diaryContainer: {
    flex: 1,
    backgroundColor: '#F0F7F7',
  },
  contentContainer: {
    flex: 1,
  },
});

export default Diary;

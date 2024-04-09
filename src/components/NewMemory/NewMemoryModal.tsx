import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import moment from 'moment';

import MemoryHeader from './MemoryHeader';
import TitleMemory from './TitleMemory';
import DescribeMemory from './DescribeMemory';
import AddPhoto from './AddPhoto';
import SpecialMemory from './SpecialMemory';
import EmotionHeader from './EmotionHeader';
import EmotionSelection from './EmotionSelection';
import MenuButton from '../Buttons/MenuButton';
import {IEmotion} from '../../interfaces/Emotion';
import MemoriesService from '../../services/MemoriesService';
import {IDiaryItem} from '../../interfaces/DiaryItem';

interface NewMemoryModalProps {
  toggleModal: () => void;
  onAddNewMemory: () => void;
}

const NewMemoryModal: React.FC<NewMemoryModalProps> = ({
  toggleModal,
  onAddNewMemory,
}) => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [image, setImage] = useState<string>('');
  const [entry, setEntry] = useState<string>('');
  const [isSpecial, setIsSpecial] = useState<boolean>(true);
  const [emotion, setEmotion] = useState<IEmotion[]>([]);
  const [mainShown, setMainShown] = useState<boolean>(true);
  const [processActive, setProcessActive] = useState<boolean>(false);
  const memoryService = MemoriesService.getInstance();

  const titleUpdate = (value: string) => setTitle(value);
  const entryUpdate = (value: string) => setEntry(value);
  const toggleSpecial = (value: boolean) => setIsSpecial(value);
  const handleDateChange = (value: Date) => setDate(value);
  const handleImagePathChange = (value: string) => setImage(value);
  const changeShown = () => setMainShown(false);
  const updateProcessActive = () => setProcessActive(previous => !previous);
  const handleEmotionChange = (value: IEmotion) => {
    if (emotion.some(em => em.id === value.id)) {
      const array = emotion.filter(em => em.id !== value.id);
      setEmotion(array);
    } else {
      setEmotion([...emotion, value]);
    }
  };

  const handleSubmit = async () => {
    // TODO: add memory
    const memory: IDiaryItem = {
      date,
      emotion,
      entry,
      image,
      isSpecial,
      title,
      hasImage: image !== '',
    };
    await memoryService.saveTransaction(memory);
    toggleModal();
    onAddNewMemory();
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={10}
      enabled>
      <View style={styles.menuview}>
        {mainShown ? (
          <>
            <MemoryHeader date={date} dateUpdate={handleDateChange} />
            <TitleMemory titleValue={title} titleUpdate={titleUpdate} />
            <DescribeMemory entryValue={entry} entryUpdate={entryUpdate} />
            <AddPhoto
              image={image}
              addImage={handleImagePathChange}
              updateProcessActive={updateProcessActive}
            />
            <SpecialMemory toggleValue={isSpecial} onToggle={toggleSpecial} />
            {title === '' ? (
              <MenuButton
                text="Continue"
                onPress={changeShown}
                processText="Please enter a title"
                processActive={true}
                disabled={true}
              />
            ) : (
              <MenuButton
                text="Continue"
                onPress={changeShown}
                processText="Loading..."
                processActive={processActive}
                disabled={processActive}
              />
            )}
          </>
        ) : (
          <>
            <EmotionHeader
              action={
                moment(date) < moment().add(-1, 'day').endOf('day')
                  ? 'did'
                  : 'do'
              }
            />
            <EmotionSelection emotionChange={handleEmotionChange} />
            {emotion.length !== 0 ? (
              <MenuButton
                text={`Create with ${emotion.length} emotion${
                  emotion.length !== 1 ? 's' : ''
                }`}
                onPress={handleSubmit}
              />
            ) : (
              <MenuButton text="Select an emotion" disabled={true} />
            )}
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  menuview: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default NewMemoryModal;

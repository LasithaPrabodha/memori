import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MemoriesService from '../../services/MemoriesService';
import {IDiaryItemWithId} from '../../interfaces/DiaryItem';
import {memoryDateFormat} from '../../utils/helpers';

interface DiaryItemProps {
  memory: IDiaryItemWithId;
  onDelete: (id: string, hasImage: boolean) => void;
}

const DiaryItem: React.FC<DiaryItemProps> = props => {
  const [image, setImage] = useState('');
  const memoriesService = MemoriesService.getInstance();

  useEffect(() => {
    if (props.memory.hasImage) {
      memoriesService.loadImage(props.memory.id).then(img => setImage(img));
    }
  }, [memoriesService, props.memory.hasImage, props.memory.id]);

  const deleteThisMemory = () => {
    Alert.alert(
      'Delete memory',
      'Are you sure you want to delete this memory?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            props.onDelete(props.memory.id, props.memory.image != null),
        },
      ],
    );
  };
  const date = useMemo(() => {
    return memoryDateFormat(props.memory.date as Date);
  }, [props.memory.date]);

  return (
    <View style={styles.memoryItem}>
      <Text style={styles.memoryDate}>{date}</Text>
      <Text style={styles.memoryTitle}>{props.memory.title}</Text>
      {image !== '' && (
        <View style={styles.imageComponent}>
          <Image
            style={styles.image}
            source={{uri: image}}
            resizeMode="cover"
          />
        </View>
      )}
      {props.memory.entry !== '' && (
        <Text style={styles.description}>{props.memory.entry}</Text>
      )}
      <View style={styles.wrapFix}>
        {props.memory.isSpecial && (
          <View style={styles.specialEmotion}>
            <Text style={styles.specialEmotionText}>⭐ Special</Text>
          </View>
        )}
        {props.memory.emotion.map(data => {
          return (
            <View key={data.emotion} style={styles.memoryEmotion}>
              <Text style={styles.memoryEmotionText}>
                {data.emoji} {data.emotion}
              </Text>
            </View>
          );
        })}
      </View>
      <TouchableOpacity style={styles.trash} onPress={deleteThisMemory}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={18}
          color="#717172"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  memoryItem: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 12,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FDFDFD',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
  },
  memoryDate: {
    color: '#717172',
    fontSize: 15,
  },
  memoryTitle: {
    color: '#082A2A',
    fontWeight: '600',
    fontSize: 23,
    marginTop: 5,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 5,
  },
  memoryEmotion: {
    margin: 3,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#006666',
    backgroundColor: '#F0F8F8',
  },
  specialEmotion: {
    margin: 3,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#FF836B',
    backgroundColor: '#FFF6F4',
  },
  memoryEmotionText: {
    color: '#338282',
    fontSize: 14,
  },
  specialEmotionText: {
    color: '#FF836B',
    fontSize: 14,
  },
  wrapFix: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: -3,
    marginTop: 10,
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
    height: 200,
    borderRadius: 10,
  },
  imageComponent: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.84,
  },
  trash: {
    position: 'absolute',
    right: 0,
    padding: 15,
  },
});

export default DiaryItem;

import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
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
    <View style={styles.memoryitem}>
      <Text style={styles.memorydate}>{date}</Text>
      <Text style={styles.memorytitle}>{props.memory.title}</Text>
      {image && (
        <View style={styles.imagecomponent}>
          <Image
            width={Dimensions.get('window').width - 70}
            style={styles.memoryimage}
            source={{uri: image}}
          />
        </View>
      )}
      {props.memory.entry !== '' && (
        <Text style={styles.memoryentry}>{props.memory.entry}</Text>
      )}
      <View style={styles.wrapfix}>
        {props.memory.isSpecial && (
          <View style={styles.specialemotion}>
            <Text style={styles.specialemotiontext}>⭐ Special</Text>
          </View>
        )}
        {props.memory.emotion.map(data => {
          return (
            <View key={data.emotion} style={styles.memoryemotion}>
              <Text style={styles.memoryemotiontext}>
                {data.emoji} {data.emotion}
              </Text>
            </View>
          );
        })}
      </View>
      <TouchableOpacity style={styles.trash} onPress={deleteThisMemory}>
        <MaterialCommunityIcons name="trash-can-outline" size={18} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  memoryitem: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 12.5,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
  memorydate: {
    color: '#717172',
    fontSize: 15,
  },
  memorytitle: {
    color: '#082A2A',
    fontWeight: '600',
    fontSize: 23,
    marginTop: 5,
  },
  memoryentry: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 5,
  },
  memoryemotion: {
    margin: 3,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#006666',
    backgroundColor: '#F0F8F8',
  },
  specialemotion: {
    margin: 3,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#FF836B',
    backgroundColor: '#FFF6F4',
  },
  memoryemotiontext: {
    color: '#338282',
    fontSize: 14,
  },
  specialemotiontext: {
    color: '#FF836B',
    fontSize: 14,
  },
  wrapfix: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: -3,
    marginTop: 10,
  },
  memoryimage: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    height: 200,
  },
  imagecomponent: {
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

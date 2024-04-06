import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {emotions} from '../../utils/emotions';
import {IEmotion} from '../../interfaces/Emotion';

interface EmotionProps {
  emoji: string;
  onPress: () => void;
}

interface EmotionSelectionProps {
  emotionChange: (value: IEmotion) => void;
}

const EmotionSelection: React.FC<EmotionSelectionProps> = ({emotionChange}) => {
  return (
    <View style={styles.emotionview}>
      {emotions.map(data => (
        <Emotion
          key={data.id}
          emoji={data.emoji}
          onPress={() => emotionChange(data)}
        />
      ))}
    </View>
  );
};

const Emotion: React.FC<EmotionProps> = props => {
  const [clicked, setClicked] = useState(false);

  const toggleClicked = () => {
    setClicked(previous => !previous);
  };

  const handlePress = () => {
    toggleClicked();
    props.onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.emotionbutton,
        clicked ? {backgroundColor: '#DCEFEF'} : {backgroundColor: '#FFF'},
      ]}>
      <Text style={styles.emotionbuttontext}>{props.emoji}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emotionview: {
    marginTop: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emotionbutton: {
    margin: 5,
    borderRadius: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: '#006666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emotionbuttontext: {
    color: '#338282',
    fontSize: 25,
  },
});

export default EmotionSelection;

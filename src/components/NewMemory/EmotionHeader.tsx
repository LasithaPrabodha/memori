import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface EmotionHeaderProps {
  action: string;
}

const EmotionHeader: React.FC<EmotionHeaderProps> = ({action}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>How {action} you feel?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default EmotionHeader;

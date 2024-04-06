import React from 'react';
import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';

interface TitleMemoryProps extends TextInputProps {
  titleValue: string;
  titleUpdate: (text: string) => void;
}

const TitleMemory: React.FC<TitleMemoryProps> = props => {
  return (
    <View>
      <TextInput
        style={styles.titleinput}
        onChangeText={props.titleUpdate}
        value={props.titleValue}
        placeholder="Give this entry a title (<50 chars)"
        placeholderTextColor="#b3b3b3"
        maxLength={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleinput: {
    borderColor: '#C8D2D7',
    color: '#000',
    borderWidth: 1,
    height: 40,
    borderRadius: 7.5,
    marginTop: 15,
    paddingLeft: 10,
    fontSize: 16,
    justifyContent: 'flex-start',
  },
});

export default TitleMemory;

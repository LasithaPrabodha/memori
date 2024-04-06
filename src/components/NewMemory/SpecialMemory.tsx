import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

interface SpecialMemoryProps {
  toggleValue: boolean;
  onToggle: (value: boolean) => void;
}

const SpecialMemory: React.FC<SpecialMemoryProps> = props => {
  return (
    <View style={styles.switch}>
      <Text style={styles.switchText}>Keep as memory</Text>
      <Switch
        onValueChange={props.onToggle}
        value={props.toggleValue}
        trackColor={{true: '#006565'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switch: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    marginTop: -34,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 16,
    paddingRight: 10,
  },
});

export default SpecialMemory;

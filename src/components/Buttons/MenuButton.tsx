import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const MenuButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={props.disabled ? 1.0 : 0.5}
      style={[props.disabled ? styles.buttondisabled : styles.button]}
      onPress={props.disabled ? null : props.onPress}>
      {props.processActive ? (
        <Text style={styles.buttontext}>{props.processText}</Text>
      ) : (
        <Text style={styles.buttontext}>{props.text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    height: 45,
    marginTop: 20,
    borderRadius: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttondisabled: {
    backgroundColor: '#C8D2D7',
    height: 45,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MenuButton;

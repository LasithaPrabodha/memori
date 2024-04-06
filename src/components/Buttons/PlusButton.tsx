import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface PlusButtonProps {
  toggleModal: () => void;
}

const PlusButton: React.FC<PlusButtonProps> = ({toggleModal}) => {
  const togglePressed = () => {
    toggleModal();
  };

  return (
    <TouchableOpacity style={styles.button} onPressIn={togglePressed}>
      <MaterialCommunityIcons name="plus" size={32} color={'white'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#006565',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.5,
    position: 'absolute',
    bottom: 25,
    right: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlusButton;

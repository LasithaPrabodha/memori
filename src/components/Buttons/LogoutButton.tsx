import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LogoutButton: React.FC = () => {
  const onLogutPressed = () => {
    auth().signOut();
  };
  return (
    <TouchableOpacity onPress={onLogutPressed} style={{marginEnd: 16}}>
      <MaterialCommunityIcons color="#006565" name="logout" size={24} />
    </TouchableOpacity>
  );
};

export default LogoutButton;

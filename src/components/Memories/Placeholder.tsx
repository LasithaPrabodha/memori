import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

import diaryPlaceholder from '../../assets/placeholders/diary.png';

const Placeholder = () => {
  return (
    <View style={styles.emptylist}>
      <Image style={styles.placeholderimagediary} source={diaryPlaceholder} />
      <Text style={styles.placeholderheader}>No diary entries found</Text>
      <Text style={styles.placeholderdesc}>
        Get started by creating a new diary entry and capture your memories
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptylist: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  placeholderimagediary: {
    width: 242,
    height: 215,
  },
  placeholderheader: {
    fontWeight: '600',
    fontSize: 17,
    marginTop: 20,
  },
  placeholderdesc: {
    width: 270,
    marginTop: 10,
    lineHeight: 18,
    textAlign: 'center',
  },
});

export default Placeholder;

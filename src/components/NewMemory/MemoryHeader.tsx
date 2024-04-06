import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {dateFormat} from '../../utils/helpers';
import DatePicker from 'react-native-date-picker';

interface MemoryHeaderProps {
  date: Date;
  dateUpdate: (date: Date) => void;
}

const MemoryHeader: React.FC<MemoryHeaderProps> = props => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    props.dateUpdate(date);
    setDatePickerVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>How was </Text>
        <TouchableOpacity style={styles.datebutton} onPress={showDatePicker}>
          <Text style={styles.headerText}>{dateFormat(props.date)}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>?</Text>
      </View>
      <DatePicker
        modal
        open={datePickerVisible}
        mode="date"
        date={props.date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date(1900, 0, 1)}
        maximumDate={new Date()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '500',
  },
  datebutton: {
    marginLeft: 3,
    borderBottomWidth: 1,
    borderColor: '#006565',
    paddingBottom: 2,
    fontWeight: '500',
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
  },
});

export default MemoryHeader;

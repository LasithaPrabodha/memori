import React, {useCallback, useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CalendarProps {
  onDateChange: (date: Date | null) => void;
}

const Calendar: React.FC<CalendarProps> = ({onDateChange}) => {
  const [date, setDate] = useState<Date | null>();
  const [open, setOpen] = useState(false);

  const openPicker = useCallback(() => setOpen(true), []);
  const closePicker = useCallback(() => setOpen(false), []);

  const dateForPicker = useMemo(
    () =>
      date != null
        ? new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
          )
        : new Date(),
    [date],
  );

  const clearDate = useCallback(() => {
    setDate(null);
    onDateChange(null);
  }, [onDateChange]);
  return (
    <>
      <View
        style={{display: 'flex', flexDirection: 'row', marginHorizontal: 16}}>
        <TouchableOpacity onPress={openPicker}>
          <MaterialCommunityIcons color="#006565" name="calendar" size={24} />
        </TouchableOpacity>
        {date && (
          <TouchableOpacity onPress={clearDate} style={{marginStart: 4}}>
            <MaterialCommunityIcons color="red" name="close" size={24} />
          </TouchableOpacity>
        )}
      </View>
      <DatePicker
        modal
        maximumDate={new Date()}
        mode="date"
        open={open}
        date={dateForPicker}
        onConfirm={_date => {
          setDate(_date);
          onDateChange(_date);
          closePicker();
        }}
        onCancel={closePicker}
      />
    </>
  );
};

export default Calendar;

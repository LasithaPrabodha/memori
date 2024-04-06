import moment from 'moment';

export function dateFormat(date: Date): string {
  return moment(date).calendar(null, {
    lastWeek: '[last] dddd',
    lastDay: '[yesterday]',
    sameDay: '[today]',
    sameElse: function () {
      return 'MMM DD, YYYY';
    },
  });
}

export function memoryDateFormat(date: Date): string {
  return moment(date).calendar(null, {
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today] [at] h[:]mmA',
    sameElse: function () {
      return 'MMMM DD, YYYY';
    },
  });
}

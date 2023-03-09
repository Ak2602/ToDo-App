import date from 'date-and-time';

const now = new Date();
const value = date.format(now, 'YYYY/MM/DD HH:MM:SS');

export default value;
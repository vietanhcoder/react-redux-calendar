export const FormatFullDate = (date) => {
  let datePicker =
    parseInt(date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
  return datePicker;
};

export const FormatDate = (date) => {
  let datePicker = parseInt(date.getDate() + 1);
  return datePicker;
};
export const FormatMonth = (month) => {
  let monthPicker = parseInt(month.getMonth() + 1);
  return monthPicker;
};
export const FormatYear = (year) => {
  let yearPicker = parseInt(year.getFullYear());
  return yearPicker;
};

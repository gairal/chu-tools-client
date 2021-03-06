import moment from 'moment';
import * as React from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';

interface IProps {
  loading: boolean;
  setStart: React.Dispatch<React.SetStateAction<moment.Moment>>;
  setEnd: React.Dispatch<React.SetStateAction<moment.Moment>>;
  start: moment.Moment;
  end: moment.Moment;
}

const DatePicker: React.SFC<IProps> = ({ setStart, start, setEnd, end }) => {
  const [focused, setFocused] = React.useState();

  const handleChange = ({
    startDate,
    endDate,
  }: {
    startDate: moment.Moment;
    endDate: moment.Moment;
  }) => {
    setStart(startDate);
    setEnd(endDate);
  };

  const onFocus = (focusedInput: FocusedInputShape) => setFocused(focusedInput);

  const isOutsideRange = (day: moment.Moment) => {
    const diff = moment().diff(day, 'days');
    return diff < 0 || diff > 9;
  };

  return (
    <DateRangePicker
      startDate={start}
      startDateId="postStartDate"
      endDate={end}
      endDateId="postStartDate"
      onDatesChange={handleChange}
      focusedInput={focused}
      onFocusChange={onFocus}
      isOutsideRange={isOutsideRange}
    />
  );
};

export default DatePicker;

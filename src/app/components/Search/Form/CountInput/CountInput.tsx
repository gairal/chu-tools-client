import * as React from 'react';

interface IProps {
  count: number;
  loading: boolean;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const CountInput: React.SFC<IProps> = ({ count, setCount }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(+e.target.value);
  };

  return (
    <input
      className="flex-1 mx-2 input"
      type="number"
      value={count}
      onChange={handleChange}
      min="1"
      max="100"
    />
  );
};

export default CountInput;

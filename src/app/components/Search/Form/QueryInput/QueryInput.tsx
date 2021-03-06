import * as React from 'react';

interface IProps {
  keyword: string;
  loading: boolean;
  search: () => void;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const QueryInput: React.SFC<IProps> = ({ keyword, search, setKeyword }) => {
  const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) search();
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <input
      className="flex-2 mb-2 md:mb-0 md:mr-2 input"
      onChange={handleKeywordChange}
      onKeyUp={keyPress}
      placeholder="keyword"
      type="text"
      value={keyword}
    />
  );
};

export default QueryInput;

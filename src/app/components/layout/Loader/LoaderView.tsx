import * as React from 'react';

import BarLoader from 'react-bar-loader';

interface ILoaderProps {
  categoryLoading: boolean;
  sentimentLoading: boolean;
  sheetLoading: boolean;
  postLoading: boolean;
}

type AllProps = ILoaderProps;

const LoaderView: React.SFC<AllProps> = ({
  categoryLoading,
  sentimentLoading,
  sheetLoading,
  postLoading,
}) => {
  return (
    (categoryLoading || sentimentLoading || sheetLoading || postLoading) && (
      <BarLoader
        className="absolute pin-b pin-l pin-r"
        color="#1D8BF1"
        height="2"
      />
    )
  );
};

export default LoaderView;

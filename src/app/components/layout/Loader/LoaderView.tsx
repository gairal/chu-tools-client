import * as React from 'react';

import BarLoader from 'react-bar-loader';

interface ILoaderProps {
  loading: boolean;
}

type AllProps = ILoaderProps;

const LoaderView: React.SFC<AllProps> = ({ loading }) => {
  return (
    loading && (
      <BarLoader
        className="absolute pin-b pin-l pin-r"
        color="#1D8BF1"
        height="2"
      />
    )
  );
};

export default LoaderView;

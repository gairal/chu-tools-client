import * as React from 'react';
// import styled from 'styled-components';

import { ITweet } from '@/store/search/types';

interface IPropsFromState {
  tweets: ITweet[];
  loading: boolean;
}

type AllProps = IPropsFromState;

const ResultView: React.SFC<AllProps> = ({ tweets }) => {
  return <div>{tweets}</div>;
};

export default ResultView;

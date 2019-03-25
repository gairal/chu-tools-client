import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SaveFormView from '@/components/Search/Result/SaveForm/SaveFormView';
import { IApplicationState } from '@/store';
import { saveSend } from '@/store/sheet/actions';
import { ITweet } from '@/store/tweet/types';

const mapStateToProps = ({ tweet, sheet }: IApplicationState) => ({
  loading: tweet.loading,
  sheets: sheet.sheets,
  tweets: tweet.tweets,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  save: (sheetId: string, tweets: ITweet[]) =>
    dispatch(saveSend(sheetId, tweets)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaveFormView);

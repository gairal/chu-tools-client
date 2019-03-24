import * as React from 'react';

import SaveButton from '@/components/Search/Result/SaveForm/SaveButton';
import SheetSelector from '@/components/Search/Result/SaveForm/SheetSelector';
import { saveSend } from '@/store/sheet/actions';
import { ISheet } from '@/store/sheet/types';
import { IOrderedTweetIds, ITweet } from '@/store/tweet/types';

interface IProps {
  loading: boolean;
  save: typeof saveSend;
  sheets: ISheet[];
  tweets: ITweet[];
}

const SaveForm: React.SFC<IProps> = ({ loading, sheets, save, tweets }) => {
  const [sheetId, setSheetId] = React.useState(sheets[0].id);

  const saveSheet = (tweetIds: IOrderedTweetIds) => {
    save(sheetId, tweetIds);
  };

  return (
    <form>
      <SheetSelector sheets={sheets} setSheetId={setSheetId} />
      <SaveButton loading={loading} save={saveSheet} tweets={tweets} />
    </form>
  );
};

export default SaveForm;

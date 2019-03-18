import { ITweet } from '@/store/search/types';
import Persistable from './Persistable';

export default class Search extends Persistable<ITweet> {
  constructor(idToken: string) {
    super('VC_DIALOG', idToken);
  }
}

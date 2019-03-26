import { ITweet } from '@/store/tweet/types';
import Persistable from './Persistable';

export default class Search extends Persistable<ITweet> {
  constructor() {
    super('CHOOLS_SEARCH');
  }
}

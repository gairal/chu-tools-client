import { IPost } from '@/store/types';
import Persistable from './Persistable';

export default class Search extends Persistable<IPost> {
  constructor() {
    super('CHOOLS_SEARCH');
  }
}

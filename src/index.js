import { createClient } from './events';
import { LOCAL_STORAGE_KEY, INITIAL_STATE } from './constants';

export default createClient(LOCAL_STORAGE_KEY, INITIAL_STATE);

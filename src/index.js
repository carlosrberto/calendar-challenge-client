import { createClient } from './events';
import { LOCAL_STORAGE_KEY } from './constants';

export default createClient(LOCAL_STORAGE_KEY);

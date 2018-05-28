import { LOCAL_STORAGE_KEY } from './constants';
import events from './index';

describe('events', () => {
  beforeEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  });

  it('should return a client with all methods', () => {
    expect(Object.keys(events)).toEqual([
      'all',
      'filter',
      'get',
      'create',
      'update',
      'remove',
    ]);
  });
});

import {createContext} from 'react';
import {defaultCategoryList, defaultCommandList} from './default_commands';

const BoardContext = createContext({
  categories: defaultCategoryList,
  commands: defaultCommandList,
  name: '',
  public: false,
  savedBoards: [],

  setNewContext: () => {},
  addSavedBoard: () => {},
  clearContext: () => {},
});

export default BoardContext;

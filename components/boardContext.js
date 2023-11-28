import {createContext} from 'react';
import {defaultCategoryList, defaultCommandList} from './default_commands';

const BoardContext = createContext({
  categories: defaultCategoryList,
  commands: defaultCommandList,
  name: '',
  savedBoards: [],

  setNewContext: () => {},
  updateContext: () => {},
  clearContext: () => {},
});

export default BoardContext;

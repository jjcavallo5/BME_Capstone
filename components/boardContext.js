import {createContext} from 'react';
import {defaultCategoryList, defaultCommandList} from './default_commands';

const BoardContext = createContext({
  categories: defaultCategoryList,
  commands: defaultCommandList,

  setNewContext: () => {},
  updateContext: () => {},
  clearContext: () => {},
});

export default BoardContext;

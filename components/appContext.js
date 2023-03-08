import {createContext} from 'react';
import {defaultCategoryList, defaultCommandList} from './default_commands';
import RNTTSvoices from '../backend/RNTTS_voices';
import {themes} from '../styles/color_themes';

const AppContext = createContext({
  categories: defaultCategoryList,
  commands: defaultCommandList,
  recentSearches: [],
  voice: {category: 'RNTTS', data: RNTTSvoices[0].data},
  theme: themes.light,
  firstName: '',
  lastName: '',
  cognitiveAge: 0,
  chronologicalAge: 0,
  isPremiumUser: false,

  setNewContext: () => {},
  updateContext: () => {},
  clearContext: () => {},
});

export default AppContext;

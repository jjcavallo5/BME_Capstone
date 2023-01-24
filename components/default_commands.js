const defaultCommandList = [
  {name: 'Hello', iconName: 'hand-wave', category: 'Greetings', color: 'gray'},
  {
    name: 'Goodbye',
    iconName: 'hand-wave-outline',
    category: 'Greetings',
    color: 'gray',
  },
  {
    name: 'Thank You',
    iconName: 'handshake-outline',
    category: 'Manners',
    color: 'gray',
  },
  {
    name: 'Sorry',
    iconName: 'emoticon-frown',
    category: 'Manners',
    color: 'gray',
  },
  {
    name: 'Excuse Me!',
    iconName: 'hand-pointing-up',
    category: 'Manners',
    color: 'gray',
  },
  {
    name: 'What was that?',
    iconName: 'chat-question-outline',
    category: 'Questions',
  },
];

const defaultCategoryList = [
  {name: 'Greetings', iconName: 'folder-open'},
  {name: 'Manners', iconName: 'folder-open'},
  {name: 'Questions', iconName: 'folder-open'},
];
export {defaultCategoryList, defaultCommandList};

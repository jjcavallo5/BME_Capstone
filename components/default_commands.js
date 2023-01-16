const defaultCommandList = {
  categories: [
    {name: 'Greetings', iconName: 'folder-open'},
    {name: 'Manners', iconName: 'folder-open'},
    {name: 'Questions', iconName: 'folder-open'},
  ],
  commands: [
    {name: 'Hello', iconName: 'hand-wave', category: 'Greetings'},
    {name: 'Goodbye', iconName: 'hand-wave-outline', category: 'Greetings'},
    {name: 'Thank You', iconName: 'handshake-outline', category: 'Manners'},
    {name: 'Sorry', iconName: 'emoticon-frown', category: 'Manners'},
    {name: 'Excuse Me!', iconName: 'hand-pointing-up', category: 'Manners'},
    {
      name: 'What was that?',
      iconName: 'chat-question-outline',
      category: 'Questions',
    },
  ],
};

export default defaultCommandList;

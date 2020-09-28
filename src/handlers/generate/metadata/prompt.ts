export const promptMetadata = [
  {
    name: 'projectTitle',
    type: 'input',
    message: 'App title:',
  },
  {
    name: 'shortDescriptionEnUs',
    type: 'input',
    message: 'Short description (en-US):',
  },
  {
    name: 'fullDescriptionEnUs',
    type: 'editor',
    message: 'Full description (en-US):',
  },
  {
    name: 'featuresEnUs',
    type: 'editor',
    message: 'Features (en-US):',
  },
  {
    name: 'appVTexStore',
    type: 'input',
    message: 'App url on vtex store',
    suffix: ' https://vtex.io/docs/app/{app}',
    transformer(input: string) {
      return input.replace(/.*\/\s*([\w._-]+).*/g, '$1');
    },
  },
];

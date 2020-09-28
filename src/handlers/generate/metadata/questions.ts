export const questions = [
  {
    name: 'projectTitle',
    type: 'input',
    message: 'App title:',
  },
  {
    name: 'shortDescription',
    type: 'input',
    message: 'Short description (en-US):',
  },
  {
    name: 'fullDescription',
    type: 'editor',
    message: 'Full description (en-US):',
  },
  {
    name: 'features',
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

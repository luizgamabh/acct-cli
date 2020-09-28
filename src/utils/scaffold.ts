import * as Scaffold from 'scaffold-generator';
import * as mustache from 'mustache';

const scaffold = async (
  inDir: string,
  outDir: string,
  replacements?: any
): Promise<any> => {
  return new Scaffold({
    data: {
      ...replacements,
    },
    render: mustache.render,
  }).copy(inDir, outDir);
};

export default scaffold;

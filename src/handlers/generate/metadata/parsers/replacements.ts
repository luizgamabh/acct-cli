import * as inquirer from 'inquirer';

import { MetadataReplacements } from '../interfaces/metadata-replacements.type';
import { questions } from '../questions';
import { answersParser } from './answers-parser';
import { MetadataReplacementKeys } from '../interfaces/metadata-replacement-keys.interface';
import * as ora from 'ora';

export const getReplacements = async () => {
  const answers: MetadataReplacementKeys = await inquirer.prompt(questions);

  const spinner = ora('Parsing keys').start();

  const replacements: MetadataReplacements = await answersParser(answers);

  spinner.succeed('Keys parsed');

  return replacements;
};

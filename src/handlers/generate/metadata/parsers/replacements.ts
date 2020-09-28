import * as inquirer from 'inquirer';
import { questions } from '@acct/handlers/generate/metadata/questions';
import { MetadataReplacements } from '@acct/handlers/generate/metadata/interfaces/metadata-replacements.type';
import { answersParser } from '@acct/handlers/generate/metadata/parsers/answers-parser';
import { MetadataReplacementKeys } from '@acct/handlers/generate/metadata/interfaces/metadata-replacement-keys.interface';

export const getReplacements = async () => {
  const answers: MetadataReplacementKeys = await inquirer.prompt(questions);

  const replacements: MetadataReplacements = await answersParser(answers);

  return replacements;
};

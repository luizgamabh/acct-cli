import { MetadataReplacements } from '../interfaces/metadata-replacements.type';
import { MetadataReplacementKeys } from '../interfaces/metadata-replacement-keys.interface';
import { translateKeys } from './translate-keys';

export const answersParser = async (
  answers: Pick<
    MetadataReplacementKeys,
    | 'appVTexStore'
    | 'features'
    | 'fullDescription'
    | 'projectTitle'
    | 'shortDescription'
  >
): Promise<MetadataReplacements> => {
  const result: MetadataReplacements = {
    en: await translateKeys(null, answers),
    es: await translateKeys('es', answers),
    pt: await translateKeys('pt', answers),
  };
  return result;
};

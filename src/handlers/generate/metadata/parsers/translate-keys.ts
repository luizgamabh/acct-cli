import { MetadataReplacementKeys } from '@acct/handlers/generate/metadata/interfaces/metadata-replacement-keys.interface';
import { AvailableLanguages } from '@acct/interfaces/available-languages.type';
import translateTo from '@acct/utils/translate';

export const translateKeys = async (
  lang: AvailableLanguages | null,
  answers: Pick<
    MetadataReplacementKeys,
    | 'appVTexStore'
    | 'features'
    | 'fullDescription'
    | 'projectTitle'
    | 'shortDescription'
  >
): Promise<Required<MetadataReplacementKeys>> => {
  const result: MetadataReplacementKeys = {
    appVTexStore: answers.appVTexStore,
    features: lang
      ? await translateTo(lang, answers.features)
      : answers.features,
    fullDescription: lang
      ? await translateTo(lang, answers.fullDescription)
      : answers.fullDescription,
    projectTitle: answers.projectTitle,
    shortDescription: lang
      ? await translateTo(lang, answers.shortDescription)
      : answers.shortDescription,
  };

  const output: Required<MetadataReplacementKeys> = {
    ...result,
    featuresAsJson: `"${result.features
      .replace(/^(\s*-\s*|\s*$[\r\n\f\s\t])/gm, '')
      .split(/[\r\n]+/m)
      .filter((line: string) => Boolean(line.trim()))
      .join(
        `",
    "`
      )}"`,
    fullDescriptionAsJson: result.fullDescription.replace(/[\r\n\f]+/gm, ' '),
    projectTitleAsJson: result.projectTitle.replace(/[\r\n\f]+/gm, ' '),
    shortDescriptionAsJson: result.shortDescription.replace(/[\r\n\f]+/gm, ' '),
  };

  return output;
};

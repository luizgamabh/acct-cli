import { AvailableLanguages } from '@acct/interfaces/available-languages.type';
import { MetadataReplacementKeys } from '@acct/handlers/generate/metadata/interfaces/metadata-replacement-keys.interface';

export type MetadataReplacements = Record<
  AvailableLanguages,
  MetadataReplacementKeys
>;

import { MetadataReplacementKeys } from './metadata-replacement-keys.interface';
import { AvailableLanguages } from '../../../../interfaces/available-languages.type';

export type MetadataReplacements = Record<
  AvailableLanguages,
  MetadataReplacementKeys
>;

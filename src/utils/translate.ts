import translate from 'google-translate-open-api';
import { AvailableLanguages } from '../interfaces/available-languages.type';
import promiseResult from './promise-result';

const translateTo = async (
  language: AvailableLanguages,
  phrase: string
): Promise<string> => {
  const [error, translated] = await promiseResult(
    translate(phrase, {
      tld: 'com',
      to: language,
    })
  );
  if (error) {
    return phrase;
  }

  const [value] = translated?.data || [];

  return value || phrase;
};

export default translateTo;

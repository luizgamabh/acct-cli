import translate from 'google-translate-open-api';

type AvailableLangs = 'en' | 'es' | 'pt';

const translateTo = async (
  language: AvailableLangs,
  phrase: string
): Promise<string> => {
  return translate(phrase, {
    tld: 'com',
    to: language,
  });
};

export default translateTo;

import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'zh'].includes(locale as any)) {
    // Optionally, you can throw an error or default to a specific locale
    // For now, let's assume valid locales are always passed by the middleware
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

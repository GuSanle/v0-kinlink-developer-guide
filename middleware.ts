import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'zh'],

  // Used when no locale matches
  defaultLocale: 'zh',

  // Make sure to include pathnames that should not be internationalized.
  // For example, '/api' or '/_next'
  // pathnamePrefixes: ['/api', '/_next/static', '/_next/image', '/favicon.ico']
  // For this project, let's assume all paths should be localized for now.
  // If specific paths need to be excluded, they can be added to pathnamePrefixes.

  // If true, the middleware will redirect users from / to /<defaultLocale>
  localePrefix: 'as-needed' // or 'always' or 'never'
});

export const config = {
  // Match only internationalized pathnames
  // Update this regex if you have specific paths you want to exclude from the middleware.
  // This regex now includes an optional non-capturing group for common static assets
  // and ensures it matches the root and any sub-paths.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

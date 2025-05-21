
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pt', 'es'], 
  defaultLocale: 'pt', 
  // ... outras configurações ...
});

export const config = {
  
  matcher: ['/', '/(pt|en|es)/:path*'] 
};
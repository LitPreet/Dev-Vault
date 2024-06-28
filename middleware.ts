import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', 'question/:id', '/tags', '/tags/:id', '/profile/:id', '/community', '/jobs'])
const isIgnoredRoute = createRouteMatcher([
  '/api/webhooks', 
]);
export default clerkMiddleware((auth, req) => {
  if(isIgnoredRoute(req)) return;
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
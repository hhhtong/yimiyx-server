// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Access from '../../../app/middleware/access';
import NotFound from '../../../app/middleware/not-found';

declare module 'egg' {
  interface IMiddleware {
    access: typeof Access;
    notFound: typeof NotFound;
  }
}

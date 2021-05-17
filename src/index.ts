import { Plugin, RouteOptions } from '@hapi/hapi';
import { dependencies, logger, pkg } from './config';
import { HapiRest, Rest, CrudOperations } from 'types';
import { buildRoutes } from './helpers';
import * as R from 'ramda';
export const plugin: Plugin<HapiRest> = {
  pkg,
  dependencies,
  multiple: true,
  register: async (server, options) => {
    // logger.debug('Rest ', connector);
    // for (const model of options.models) {
    const paths = buildRoutes(options.path);

    const actions = options.connector(server);
    for (const key in actions) {
      const _key = key as keyof CrudOperations;
      const route = actions[_key];
      if (route) {
        const routeBase = paths[_key];
        const routeOptions: RouteOptions = R.mergeDeepRight(
          options.routeOptions || {},
          {
            app: {
              crud: {
                action: _key
              }
            }
          }
        );
        server.route({
          ...routeBase,
          handler: route.handler,
          options: routeOptions
        });
      }
    }
  }
};
export { HapiRest, HapiRestAction, CrudRoute, CrudOperations } from 'types';
declare module '@hapi/hapi' {
  interface ServerApplicationState {
    rest: Rest.AppState;
  }
  interface RouteOptionsApp {
    crud: {
      action: keyof CrudOperations;
    };
  }
}

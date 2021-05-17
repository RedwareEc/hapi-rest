/* eslint-disable @typescript-eslint/no-empty-interface */
import { Server, ServerRoute, RouteOptions } from '@hapi/hapi';

interface RestModel {
  connector: any;
  baseRoute: string;
}

export type HapiRestAction = Pick<ServerRoute, 'handler' | 'options'>;
export interface CrudOperations {
  create: HapiRestAction;
  readSingle: HapiRestAction;
  readFind: HapiRestAction;
  // readListPagination: any;
  readCount: HapiRestAction;
  update: HapiRestAction;
  deleteTemp: HapiRestAction;
  delete: HapiRestAction;
}
export interface HapiRest {
  connector: (server: Server) => Partial<CrudOperations>;
  path: string;
  routeOptions?: RouteOptions;
}

export interface CrudRoute {
  path: string;
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
}
export namespace Rest {
  export interface AppState {
    connector: any;
  }
}

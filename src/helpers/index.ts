import { camelToLineCase } from '@redware/js-utils';
import { CrudOperations, CrudRoute } from 'types';
import path from 'path';

export const buildRoutes = (
  base: string,
  prefix = ''
): Record<keyof CrudOperations, CrudRoute> => {
  const hasPrefix = base.startsWith(prefix);
  base = hasPrefix ? base.replace(prefix, '') : base;
  const basePath = camelToLineCase(base).toLowerCase();

  return {
    create: {
      path: path.posix.join('/', basePath),
      method: 'POST'
    },
    readSingle: {
      path: path.posix.join('/', basePath, '/{id}'),
      method: 'GET'
    },
    readFind: {
      path: path.posix.join('/', basePath, '/_find'),
      method: 'POST'
    },
    readCount: {
      path: path.posix.join('/', basePath, '/_count'),
      method: 'POST'
    },
    update: {
      path: path.posix.join('/', basePath, '/{id}'),
      method: 'PATCH'
    },
    delete: {
      path: path.posix.join('/', basePath, '/{id}/permanent'),
      method: 'DELETE'
    },
    deleteTemp: {
      method: 'DELETE',
      path: path.posix.join('/', basePath, '/{id}')
    }
  };
};

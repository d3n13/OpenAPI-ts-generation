const OpenAPI = require('openapi-typescript-codegen');
const path = require('path');
const fs = require('fs');

const rootPath = path.resolve(__dirname, '..', '..', '..');

const swaggerFilePath = path.resolve(
  rootPath,
  'apps',
  'api',
  'src',
  'generated',
  'spec',
  'swagger.json'
);

const outputPath = path.resolve(
  rootPath,
  'libs',
  'api-client',
  'src',
  'generated'
);

fs.readFile(swaggerFilePath, { encoding: 'utf-8' }, function (err, data) {
  if (!err) {
    OpenAPI.generate({
      input: JSON.parse(data),
      useUnionTypes: true,
      httpClient: OpenAPI.HttpClient.FETCH,
      output: outputPath,
    });
  } else {
    console.error(err);
  }
});

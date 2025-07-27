// /src/lambda.ts
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

import { AppModule } from './app.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  // Lambda 환경에서 DB 연결 최적화
  // app.enableShutdownHooks();

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  // context.callbackWaitsForEmptyEventLoop = false;
  if (event.path === '' || event.path === undefined) event.path = '/';

  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

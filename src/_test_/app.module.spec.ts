import { AppModule } from '../app.module';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

describe('Run app module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await NestFactory.create(AppModule);
    await app.listen(4500);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create the application', () => {
    expect(app).toBeDefined();
  });

  it('should listen ', async () => {
    const server = app.getHttpServer();
    expect(server).toBeDefined();
  });
});

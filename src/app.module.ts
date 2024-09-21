import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TripAvailabilityModule } from './trip-availability/trip-availability.module';
import { TripManagerModule } from './trip-manager/trip-manager.module';
import { TripAvailabilityController } from './trip-availability/trip-availability.controller';
import { TripManagerController } from './trip-manager/trip-manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceModule } from './places/place.module';
import { CacheModule } from '@nestjs/cache-manager';

const MONGO_USERNAME = 'sabadocarlos';
const MONGO_PASSWORD = 'XibYFUQI3En1f1VJ';
const MONGO_CLUSTER = 'cluster0.8v0gf.mongodb.net/';
const MONGO_APP_NAME = 'Cluster0';
const REDIS_ENDPOINT = 'redis-17559.c114.us-east-1-4.ec2.redns.redis-cloud.com';
const REDIS_PORT = '17559';
const REDIS_USERNAME = 'default';
const REDIS_PASSWORD = 'Yjfw7BuiRe5q2rjR3AagiCPKr5AVhIWC';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    TripAvailabilityModule,
    TripManagerModule,
    PlaceModule,
    MongooseModule.forRoot(
      `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}?retryWrites=true&w=majority&appName=${MONGO_APP_NAME}`,
    ),
    CacheModule.register({
      store: require('cache-manager-redis-store'),
      host: REDIS_ENDPOINT,
      port: REDIS_PORT,
      username: REDIS_USERNAME,
      password: REDIS_PASSWORD,
    }),
  ],
  controllers: [TripAvailabilityController, TripManagerController],
})
export class AppModule {}

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
import dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TripAvailabilityModule,
    TripManagerModule,
    PlaceModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`,
    ),
    CacheModule.register({
      store: require('cache-manager-redis-store'),
      host: process.env.REDIS_ENDPOINT,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    }),
  ],
  controllers: [TripAvailabilityController, TripManagerController],
})
export class AppModule {}

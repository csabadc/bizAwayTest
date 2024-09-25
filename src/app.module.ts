import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TripAvailabilityModule } from './trip-availability/trip-availability.module';
import { TripManagerModule } from './trip-manager/trip-manager.module';
import { TripAvailabilityController } from './trip-availability/trip-availability.controller';
import { TripManagerController } from './trip-manager/trip-manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlaceModule } from './places/place.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TripAvailabilityModule,
    TripManagerModule,
    PlaceModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get('MONGO_USERNAME')}:${configService.get('MONGO_PASSWORD')}@${configService.get('MONGO_CLUSTER')}?retryWrites=true&w=majority&appName=${configService.get('MONGO_APP_NAME')}`,
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: require('cache-manager-redis-store'),
        host: configService.get<string>('REDIS_ENDPOINT'),
        port: configService.get<number>('REDIS_PORT'),
        username: configService.get<string>('REDIS_USERNAME'),
        password: configService.get<string>('REDIS_PASSWORD'),
      }),
    }),
  ],
  controllers: [TripAvailabilityController, TripManagerController],
})
export class AppModule {}

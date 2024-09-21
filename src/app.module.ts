import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TripAvailabilityModule } from './trip-availability/trip-availability.module';
import { TripManagerModule } from './trip-manager/trip-manager.module';
import { TripAvailabilityController } from './trip-availability/trip-availability.controller';
import { TripManagerController } from './trip-manager/trip-manager.controller';
import { MongooseModule } from '@nestjs/mongoose';

const MONGO_USERNAME = 'sabadocarlos';
const MONGO_PASSWORD = 'XibYFUQI3En1f1VJ';
const MONGO_CLUSTER = 'cluster0.8v0gf.mongodb.net/';
const MONGO_APP_NAME = 'Cluster0';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TripAvailabilityModule,
    TripManagerModule,
    MongooseModule.forRoot(
      `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}?retryWrites=true&w=majority&appName=${MONGO_APP_NAME}`,
    ),
  ],
  controllers: [TripAvailabilityController, TripManagerController],
})
export class AppModule {}

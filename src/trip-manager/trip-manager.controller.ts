import { AuthGuard } from '../auth/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TripManagerService } from './trip-manager.service';
import { SaveTripDto } from './dto/save-trip.dto';
import { Trip } from '../common/model/trip.model';

@Controller('trip-manager')
export class TripManagerController {
  constructor(private TripManagerService: TripManagerService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getSavedTrips(@Req() request: Request): Promise<Trip[]> {
    return await this.TripManagerService.getSavedTrips(
      request['user'].username,
    );
  }
  @UseGuards(AuthGuard)
  @Post()
  async saveTrip(
    @Body() saveTripDto: SaveTripDto,
    @Req() request: Request,
  ): Promise<{ message: string }> {
    return await this.TripManagerService.saveTripDto(
      saveTripDto,
      request['user'].username,
    );
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTrip(@Param('id') id: string, @Req() request: Request) {
    await this.TripManagerService.deleteTrip(id, request['user'].username);
  }
}

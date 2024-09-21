import { IsEnum, IsString, Length } from 'class-validator';

export enum SortOptions {
  fastest = 'fastest',
  cheapest = 'cheapest',
}

export class FindTripsDto {
  @IsString()
  @Length(3)
  origin: string;
  @IsString()
  @Length(3)
  destination: string;
  @IsString()
  @IsEnum(SortOptions)
  sort_by: SortOptions;
}
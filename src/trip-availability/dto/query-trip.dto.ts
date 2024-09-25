import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export enum SortOptions {
  fastest = 'fastest',
  cheapest = 'cheapest',
}

export class FindTripsDto {
  @IsString()
  @Length(3)
  @IsNotEmpty()
  origin: string;
  @IsString()
  @Length(3)
  @IsNotEmpty()
  destination: string;
  @IsString()
  @IsEnum(SortOptions)
  sort_by: SortOptions;
}

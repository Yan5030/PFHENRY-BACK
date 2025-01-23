import { IsString, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
@IsOptional()
  auth0Id: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsString()
  name?: string;
}

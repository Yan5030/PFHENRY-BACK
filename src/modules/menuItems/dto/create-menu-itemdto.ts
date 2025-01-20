import { IsString, IsOptional, IsNumber, IsUUID, IsDecimal, IsUrl, Length } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @Length(1, 100)
  name: string; 

  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string; 

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number; 
  
  @IsNumber()
  stock:number

  @IsOptional()
  @IsUrl()
  @Length(0, 255)
  image_url?: string; 

  @IsOptional()
  @IsUUID()
  categoryId?: string; 
}
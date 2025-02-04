import { IsString, IsNumber } from 'class-validator';

export class SavePaypalDto {
  @IsString()
  paypalPaymentId: string;

  @IsString()
  orderId: string;

  @IsString()
  payerEmail: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  status: string;
}

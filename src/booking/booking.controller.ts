import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  ValidationPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { BookingService } from './booking.service';
import { BookingDto, idBookingDto } from './dto/booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post('')
  async createBooking(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    booking: BookingDto,
  ) {
    return await this.bookingService.createBooking(booking);
  }
  @Get(':id')
  async fildOneBooking(
    @Param('id', new ValidationPipe({ transform: true })) id: idBookingDto,
  ) {
    return await this.bookingService.fillOneBooking(id);
  }
  @Delete(':id')
  async deleteBooking(
    @Param('id', new ValidationPipe({ transform: true })) id: idBookingDto,
  ) {
    return await this.bookingService.deleteBooking(id);
  }
  @Get('/notify/:id')
  async updateStatus(
    @Param('id', new ValidationPipe({ transform: true })) id: idBookingDto,
  ) {
    return await this.bookingService.updateStatus(id);
  }
  @Post('/email')
  async fildEmailBooking(@Req() req: Request) {
    return await this.bookingService.fillEmailBooking(req.body.email);
  }
}

// app.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Booking } from '../booking/schema/booking.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Screenings } from 'src/screenings/schema/screenings.schema';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectModel(Screenings.name)
    private readonly bookingModel: Model<Screenings>,
  ) {}
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getSeats')
  async handleGetSeats(client: Socket, productId: any) {
    try {
      const seats = await this.bookingModel
        .find({ _id: productId.id.id })
        .populate(['movies', 'cinemas'])
        .lean()
        .exec();
      let arr = seats[0].timeSlots.filter(
        (item) => item.time === productId.id.time,
      );

      client.emit('seat', [{ ...seats[0], timeSlots: arr }]);
      client.join(`${productId.id.id}-${productId.id.time}`);
    } catch (error) {
      console.error('Error fetching comments from the database:', error);
    }
  }

  @SubscribeMessage('bookingseat')
  async handleUpdateSeats(client: Socket, payload: any) {
    try {
      let arr = [];
      const updatedSeats = payload[0].timeSlots[0].seats.map((seat: any) => {
        if (seat.active === 'status') {
          arr.push(seat.seats);
          return { ...seat, active: 'active' };
        }
        return seat;
      });

      const data = await this.bookingModel
        .find({ _id: payload[0]._id })
        .populate(['movies', 'cinemas'])
        .lean()
        .exec();
      let arrnew = data[0].timeSlots.map((item) => {
        return item.time === payload[0].timeSlots[0].time
          ? { ...item, seats: updatedSeats }
          : item;
      });
      let dataupdate = {
        timeSlots: arrnew,
      };

      const update = await this.bookingModel.findByIdAndUpdate(
        payload[0]._id,
        dataupdate,
        { new: true },
      );

      if (update) {
        this.server
          .to(`${payload[0]._id.toString()}-${payload[0].timeSlots[0].time}`)
          .emit('bookingseatnew', arr);
      } else {
        console.log('Comment not found');
      }
    } catch (error) {
      console.error('Error updating comment in the database:', error);
    }
  }
  @SubscribeMessage('unpaidseat')
  async handleUnpaid(client: Socket, payload: any) {
    try {
      

      const data = await this.bookingModel
        .find({ _id: payload.id })
        .populate(['movies', 'cinemas'])
        .lean()
        .exec();

      const updateSeats = data[0].timeSlots
        .filter((item) => item.time === payload.time)[0]
        .seats.map((item) => {
          if (payload.seats.includes(item.seats)) {
            return { ...item, active: 'no_active' };
          }
          return item;
        });

      let arrnew = data[0].timeSlots.map((item) => {
        return item.time === payload.time
          ? { ...item, seats: updateSeats }
          : item;
      });
      let dataupdate = {
        timeSlots: arrnew,
      };
      
      const update = await this.bookingModel.findByIdAndUpdate(
        payload.id,
        dataupdate,
        { new: true },
      );

      if (update) {
      this.server
        .to(`${payload.id.toString()}-${payload.time}`)
        .emit('bookingseatunpaid', payload.seats);
      } else {
        console.log('Comment not found');
      }
    } catch (error) {
      console.error('Error updating comment in the database:', error);
    }
  }
}

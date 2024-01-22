import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'toanbui219@gmail.com',
      pass: 'avfl rpqk bfft hjvj',
    },
  });

  async sendMail(to: string, subject: string, text: string) {
    let html = ` <div
      class=""
      style="
        width: 100%;
        display: flex !important;
        padding: 40px 0;
      "
    >
      <div class="" style="width: 300px;margin:0 auto">
        <img
          width="100%"
          src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7631/password_reset.png"
          alt=""
        />
        <h1 style="text-align: center; margin: 10px 0">Your Password</h1>
        <p
          style="
            text-align: center;
            font-size: 15px;
            color: grey;
            margin-top: 10px;
          "
        >
          Bạn đã đăng ký thành công,trở thành hội viên của Aovis.Đây là mật khẩu
          của bạn.
        </p>
        <button
          style="
            margin: 0 95px;
            padding: 10px 20px;
            border: none;
            background-color: black;
            color: white;
            border-radius: 5px;
            font-weight: 700;
            font-size: 20px;
          "
        >
          ${text}
        </button>
      </div>
    </div>`;
    const mailOptions = {
      from: 'toanbui219@gmail.com',
      to,
      subject,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }
}

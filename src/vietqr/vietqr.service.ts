import { Injectable } from '@nestjs/common';
import { VietQR} from "vietqr"

const vietQR = new VietQR({
  clientID: '631b6a45-85e5-4a85-96ab-092dbc1c18c0',
  apiKey: 'ed5eed12-6f7b-40a1-9d01-acc99b7177eb',
});
@Injectable()
export class VietqrService {
  constructor() {}
  async generateQrCode(req:any, res:any) {
    const { bank, accountName, accountNumber, amount, memo } = req.body;
    try {
        const qrCode = await vietQR.genQRCodeBase64({
            bank,
            accountName,
            accountNumber,
            amount,
            memo,
        });
      res.json({ qrCode:qrCode.data });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send(`Error generating QR code: ${error.message}`);
    }
  }
  
  async getBank( res:any) {
    try {
      const banks = await vietQR.getBanks();
      res.json(banks);
  } catch (error) {
      res.status(500).send('Error fetching banks');
  }
  }
}

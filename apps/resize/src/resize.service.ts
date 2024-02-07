import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { ResizeRequest, ResizeResponse } from 'proto/resize';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ResizeService {
  private saveDirectory = path.join(__dirname, '../');

  async resizeImage(resizeRequest: ResizeRequest): Promise<ResizeResponse> {
    try {
      const fileName = `resized-${Date.now()}.jpg`;
      const outputPath = path.join(this.saveDirectory, fileName);

      const { data: resizedImage, info } = await sharp(
        Buffer.from(resizeRequest.image),
      )
        .resize(resizeRequest.width, resizeRequest.height)
        .toBuffer({ resolveWithObject: true });

      // Save to disk
      fs.writeFileSync(outputPath, resizedImage);

      return {
        fileName: fileName,
        resizedWidth: info.width,
        resizedHeight: info.height,
      };
    } catch (error) {
      console.error('Image resizing and saving failed: ', error.message);
      throw new Error(error.message);
    }
  }
}

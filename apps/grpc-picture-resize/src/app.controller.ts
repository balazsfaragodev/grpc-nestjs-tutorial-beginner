import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import fetch from 'node-fetch';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/resize')
  async resizeImageByUrl(
    @Body() body: { imageUrl: string; width: number; height: number },
  ) {
    // Downloading the image from the provided URL
    const response = await fetch(body.imageUrl);
    if (!response.ok) {
      throw new Error('Failed to download the image');
    }
    const imageBuffer = await response.buffer();

    // Creating a resize request with the downloaded image
    const resizeRequest = {
      image: imageBuffer,
      width: body.width,
      height: body.height,
    };

    // Resizing the image using the gRPC service
    return this.appService.resizeImage(resizeRequest);
  }
}

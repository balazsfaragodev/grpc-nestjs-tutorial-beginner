import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  ResizeRequest,
  IMAGE_RESIZER_SERVICE_NAME,
  ImageResizerClient,
} from 'proto/resize';

@Injectable()
export class AppService implements OnModuleInit {
  private imageResizerClient: ImageResizerClient;

  constructor(@Inject('resize') private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.imageResizerClient = this.clientGrpc.getService<ImageResizerClient>(
      IMAGE_RESIZER_SERVICE_NAME,
    );
  }

  async resizeImage(resizeRequest: ResizeRequest) {
    const resizedImage = await this.imageResizerClient
      .resizeImage(resizeRequest)
      .toPromise();
    return resizedImage.fileName;
  }
}

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ResizeService } from './resize.service';
import { ResizeRequest, ResizeResponse } from 'proto/resize';

@Controller()
export class ResizeController {
  constructor(private readonly resizeService: ResizeService) {}

  @GrpcMethod('ImageResizer', 'ResizeImage')
  async resizeImage(resizeRequest: ResizeRequest): Promise<ResizeResponse> {
    return this.resizeService.resizeImage(resizeRequest);
  }
}

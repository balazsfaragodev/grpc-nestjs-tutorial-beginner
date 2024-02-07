/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "resize";

export interface ResizeRequest {
  image: Uint8Array;
  width: number;
  height: number;
}

export interface ResizeResponse {
  fileName: string;
  resizedWidth: number;
  resizedHeight: number;
}

export const RESIZE_PACKAGE_NAME = "resize";

export interface ImageResizerClient {
  resizeImage(request: ResizeRequest): Observable<ResizeResponse>;
}

export interface ImageResizerController {
  resizeImage(request: ResizeRequest): Promise<ResizeResponse> | Observable<ResizeResponse> | ResizeResponse;
}

export function ImageResizerControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["resizeImage"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ImageResizer", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ImageResizer", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const IMAGE_RESIZER_SERVICE_NAME = "ImageResizer";

import { Test, TestingModule } from '@nestjs/testing';
import { ResizeController } from './resize.controller';
import { ResizeService } from './resize.service';

describe('ResizeController', () => {
  let resizeController: ResizeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ResizeController],
      providers: [ResizeService],
    }).compile();

    resizeController = app.get<ResizeController>(ResizeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(resizeController.getHello()).toBe('Hello World!');
    });
  });
});

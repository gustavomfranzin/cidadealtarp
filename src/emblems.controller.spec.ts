import { Test, TestingModule } from '@nestjs/testing';
import { EmblemsController } from './emblems.controller';
import { EmblemsService } from './emblems.service';

describe('AppController', () => {
  let emblemsController: EmblemsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmblemsController],
      providers: [EmblemsService],
    }).compile();

    emblemsController = app.get<EmblemsController>(EmblemsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(emblemsController.getHello()).toBe('Hello World!');
    });
  });
});

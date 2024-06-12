import { Test, TestingModule } from '@nestjs/testing';
import { EmblemsController } from './emblems.controller';
import { EmblemsService } from './emblems.service';
import { EmblemsRepository } from './emblems.repository';

describe('EmblemsController', () => {
  let emblemsController: EmblemsController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let emblemsRepository: EmblemsRepository;

  const mockEmblemsRepository = () => ({
    find: jest.fn(),
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmblemsController],
      providers: [
        EmblemsService,
        { provide: EmblemsRepository, useFactory: mockEmblemsRepository },
      ],
    }).compile();

    emblemsController = app.get<EmblemsController>(EmblemsController);
    emblemsRepository = app.get<EmblemsRepository>(EmblemsRepository);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(emblemsController.getHello()).toBe('Hello World!');
    });
  });
});

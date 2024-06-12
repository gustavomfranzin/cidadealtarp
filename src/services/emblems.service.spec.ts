import { Test, TestingModule } from '@nestjs/testing';
import { EmblemsController } from './emblems.controller';
import { EmblemsService } from './emblems.service';
import { EmblemsRepository } from './emblems.repository';
import { EmblemsType } from './emblems.interface';

describe('EmblemsService', () => {
  let emblemsService: EmblemsService;

  const mockEmblems: EmblemsType[] = [
    {
      id: 1,
      slug: 'cda',
      name: 'Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    },
    {
      id: 2,
      slug: 'cda-valley',
      name: 'Cidade Alta Valley',
      image:
        'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
    },
  ];

  const mockEmblem: EmblemsType[] = [
    {
      id: 1,
      slug: 'cda',
      name: 'Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    },
  ];

  const mockEmblemsRepository = () => ({
    getEmblems: jest.fn().mockResolvedValue(mockEmblems),
    getEmblemsBySlug: jest.fn().mockImplementation(() => {
      return mockEmblem;
    }),
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmblemsController],
      providers: [
        EmblemsService,
        { provide: EmblemsRepository, useFactory: mockEmblemsRepository },
      ],
    }).compile();
    emblemsService = app.get<EmblemsService>(EmblemsService);
  });

  describe('/emblems', () => {
    it('should return an array of object from emblems', async () => {
      const result = await emblemsService.getEmblems();
      expect(result).toBe(mockEmblems);
    });
  });

  describe('/emblems/:slug', () => {
    it('should return an array of object for slug "cda"', async () => {
      const slug = 'cda';
      const result = await emblemsService.getEmblemsBySlug(slug);
      expect(result).toBe(mockEmblem);
    });
  });
});

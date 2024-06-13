import { Test, TestingModule } from '@nestjs/testing';
import { EmblemsController } from '../controllers/emblems.controller';
import { EmblemsService } from './emblems.service';
import { EmblemsRepository } from '../repository/emblems.repository';
import { AccountsRepository } from '../repository/accounts.repository';

describe('EmblemsService', () => {
  let emblemsService: EmblemsService;

  const mockEmblems = [
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
    {
      id: 3,
      slug: 'policia',
      name: 'Policia do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/policia.png',
    },
  ];

  const mockEmblemBySlug = [
    {
      id: 1,
      slug: 'cda',
      name: 'Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    },
  ];

  const mockEmblemsByUserId = {
    name: 'João Da Silva',
    email: 'joao.silva@cidadealta.com',
    capturedEmblems: mockEmblems,
  };

  const mockEmblemsRepository = () => ({
    getEmblems: jest.fn().mockResolvedValue(mockEmblems),
    countEmblems: jest.fn().mockResolvedValue(3),
    getEmblemsBySlug: jest.fn().mockResolvedValue(mockEmblemBySlug),
    getManyEmblemsBySlug: jest.fn().mockResolvedValue(mockEmblems),
  });

  const mockAccountRepository = () => ({
    getEmblemsByUserId: jest.fn().mockResolvedValue(mockEmblemsByUserId),
    getUserByIdAndSlug: jest.fn().mockResolvedValue(false),
    updateEmblemForUser: jest.fn(),
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmblemsController],
      providers: [
        EmblemsService,
        { provide: AccountsRepository, useFactory: mockAccountRepository },
        { provide: EmblemsRepository, useFactory: mockEmblemsRepository },
      ],
    }).compile();
    emblemsService = app.get<EmblemsService>(EmblemsService);
  });

  describe('/emblems', () => {
    it('should return all emblems', async () => {
      const data = {
        page: 1,
        itemsPerPage: 10,
      };

      const mockExpect = {
        itemsPerPage: 10,
        page: 1,
        pages: 1,
        totalItems: 3,
        items: mockEmblems,
      };

      const result = await emblemsService.getEmblems(data);
      expect(result).toStrictEqual(mockExpect);
    });
  });

  describe('/emblems/:slug', () => {
    it('should return emblem with slug "cda"', async () => {
      const userId = 1;
      const slug = 'cda';
      const result = await emblemsService.getEmblemsBySlug(userId, slug);
      expect(result).toBe(mockEmblemBySlug);
    });
  });

  describe('/:userId/emblems', () => {
    it('should return emblems user', async () => {
      const userId = 1;
      const result = await emblemsService.getEmblemsByUserId(userId);
      expect(result).toStrictEqual(mockEmblemsByUserId);
    });
  });
});

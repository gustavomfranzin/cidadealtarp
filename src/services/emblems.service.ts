import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  EmblemsByUserType,
  EmblemsType,
  ListFilter,
} from '../interfaces/emblems.interface';
import { EmblemsRepository } from '../repository/emblems.repository';
import { AccountsRepository } from '../repository/accounts.repository';

@Injectable()
export class EmblemsService {
  constructor(
    private readonly emblemsRepository: EmblemsRepository,
    private readonly accountsRepository: AccountsRepository,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getEmblems(data: ListFilter): Promise<object> {
    const offset = (data.page - 1) * data.itemsPerPage;

    try {
      const emblems = await this.emblemsRepository.getEmblems(offset, data);
      const totalItems = await this.emblemsRepository.countEmblems(data);
      const pages = Math.ceil(totalItems / data.itemsPerPage);

      return {
        pages,
        page: data.page,
        itemsPerPage: data.itemsPerPage,
        totalItems,
        items: emblems,
      };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar emblemas');
    }
  }

  async getEmblemsByUserId(userId): Promise<EmblemsByUserType> {
    const emblemsCapturedByUserId =
      await this.accountsRepository.getEmblemsByUserId(userId);
    const slugs = emblemsCapturedByUserId.capturedEmblems;

    const emblems = await this.emblemsRepository.getManyEmblemsBySlug(slugs);

    return {
      name: emblemsCapturedByUserId.name,
      email: emblemsCapturedByUserId.email,
      capturedEmblems: emblems,
    };
  }

  async getEmblemsBySlug(userId, slug: string): Promise<EmblemsType[]> {
    const emblem = await this.emblemsRepository.getEmblemsBySlug(slug);

    if (emblem.length === 0) {
      throw new Error('Emblema não encontrado');
    }

    const capturedEmblems = await this.accountsRepository.getUserByIdAndSlug(
      userId,
      slug,
    );

    if (capturedEmblems) {
      throw new Error('Emblema já capturado pelo usuário');
    }

    await this.accountsRepository.updateEmblemForUser(userId, slug);

    return emblem;
  }
}

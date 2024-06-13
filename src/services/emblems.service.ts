import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const user = await this.accountsRepository.getEmblemsByUserId(userId);
      const slugs = user.capturedEmblems;

      const emblems = await this.emblemsRepository.getManyEmblemsBySlug(slugs);

      return {
        name: user.name,
        email: user.email,
        capturedEmblems: emblems,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(
        'Erro ao buscar emblemas do usuário',
      );
    }
  }

  async getEmblemsBySlug(userId, slug: string): Promise<EmblemsType[]> {
    const emblem = await this.emblemsRepository.getEmblemsBySlug(slug);

    if (emblem.length === 0) {
      throw new NotFoundException('Emblema não encontrado');
    }

    const capturedEmblems = await this.accountsRepository.getUserByIdAndSlug(
      userId,
      slug,
    );

    if (capturedEmblems) {
      throw new ConflictException('Emblema já capturado pelo usuário');
    }

    await this.accountsRepository.updateEmblemForUser(userId, slug);

    return emblem;
  }
}

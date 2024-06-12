import { Injectable } from '@nestjs/common';
import { EmblemsType } from './emblems.interface';
import { EmblemsRepository } from './emblems.repository';
import { AccountsRepository } from './accounts.repository';

@Injectable()
export class EmblemsService {
  constructor(
    private readonly emblemsRepository: EmblemsRepository,
    private readonly accountsRepository: AccountsRepository,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getEmblems(): Promise<EmblemsType[]> {
    return await this.emblemsRepository.getEmblems();
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

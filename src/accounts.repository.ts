import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from './entities/Accounts';
import { AccountsDetails } from './emblems.interface';

@Injectable()
export class AccountsRepository {
  constructor(
    @InjectRepository(Accounts)
    private readonly repository: Repository<Accounts>,
  ) {}

  async getEmblemsByUserId(userId): Promise<AccountsDetails | null> {
    const user = await this.repository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (!user.capturedEmblems) {
      throw new Error('Nenhum emblema encontrado');
    }

    const capturedEmblems = user.capturedEmblems.split(',') || [];
    return {
      name: user.name,
      email: user.email,
      capturedEmblems: capturedEmblems,
    };
  }

  async getUserByIdAndSlug(userId, slug: string): Promise<boolean> {
    const user = await this.repository.findOne({
      where: { id: userId },
    });

    const capturedEmblems = user.capturedEmblems || [];
    return capturedEmblems.includes(slug);
  }

  async updateEmblemForUser(userId, slug: string): Promise<void> {
    const user = await this.repository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    let newCapturedEmblems = slug;

    if (user.capturedEmblems) {
      newCapturedEmblems = `${user.capturedEmblems},${slug}`;
    }

    await this.repository.update(userId, {
      capturedEmblems: newCapturedEmblems,
    });
  }
}

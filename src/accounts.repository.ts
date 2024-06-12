import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from './entities/Accounts';

@Injectable()
export class AccountsRepository {
  constructor(
    @InjectRepository(Accounts)
    private readonly repository: Repository<Accounts>,
  ) {}

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

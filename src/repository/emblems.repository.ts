import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Emblems } from '../entities/Emblems';
import { ListFilter } from 'src/interfaces/emblems.interface';

@Injectable()
export class EmblemsRepository {
  constructor(
    @InjectRepository(Emblems)
    private readonly repository: Repository<Emblems>,
  ) {}

  async getEmblems(offset: number, data: ListFilter): Promise<Emblems[]> {
    return await this.repository.find({
      skip: offset,
      take: data.itemsPerPage,
    });
  }

  async countEmblems(): Promise<number> {
    return this.repository.count();
  }

  async getEmblemsBySlug(slug: string): Promise<Emblems[]> {
    return await this.repository.find({ where: { slug: slug } });
  }

  async getManyEmblemsBySlug(slugs: string[]): Promise<Emblems[]> {
    return await this.repository.find({ where: { slug: In(slugs) } });
  }
}

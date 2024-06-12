import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, In, Repository } from 'typeorm';
import { Emblems } from '../entities/Emblems';
import { ListFilter } from 'src/interfaces/emblems.interface';

@Injectable()
export class EmblemsRepository {
  constructor(
    @InjectRepository(Emblems)
    private readonly repository: Repository<Emblems>,
  ) {}

  async getEmblems(offset: number, data: ListFilter): Promise<Emblems[]> {
    const options: FindManyOptions<Emblems> = {
      skip: offset,
      take: data.itemsPerPage,
    };
    if (typeof data.findByName === 'string' && data.findByName.trim() !== '') {
      options.where = { ...options.where, name: ILike(`%${data.findByName}%`) };
    }

    return await this.repository.find(options);
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

import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
      where: {},
    };
    if (
      typeof data.findByName === 'string' &&
      data.findByName !== 'undefined'
    ) {
      options.where = { ...options.where, name: ILike(`%${data.findByName}%`) };
    }

    try {
      const result = await this.repository.find(options);
      if (!result) {
        return [];
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar emblemas no banco de dados',
      );
    }
  }

  async countEmblems(data: ListFilter): Promise<number> {
    const options = {
      where: {},
    };
    if (
      typeof data.findByName === 'string' &&
      data.findByName !== 'undefined'
    ) {
      options.where = { ...options.where, name: ILike(`%${data.findByName}%`) };
    }
    try {
      const result = this.repository.count(options);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao contar emblemas no banco de dados',
      );
    }
  }

  async getEmblemsBySlug(slug: string): Promise<Emblems[]> {
    return await this.repository.find({ where: { slug: slug } });
  }

  async getManyEmblemsBySlug(slugs: string[]): Promise<Emblems[]> {
    return await this.repository.find({ where: { slug: In(slugs) } });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Emblems } from '../entities/Emblems';

@Injectable()
export class EmblemsRepository {
  constructor(
    @InjectRepository(Emblems)
    private readonly repository: Repository<Emblems>,
  ) {}

  async getEmblems(): Promise<Emblems[]> {
    return await this.repository.find();
  }

  async getEmblemsBySlug(slug: string): Promise<Emblems[]> {
    return await this.repository.find({ where: { slug: slug } });
  }

  async getManyEmblemsBySlug(slugs: string[]): Promise<Emblems[]> {
    return await this.repository.find({ where: { slug: In(slugs) } });
  }
}

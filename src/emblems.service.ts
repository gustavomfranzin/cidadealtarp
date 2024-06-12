import { Injectable } from '@nestjs/common';
import { EmblemsType } from './emblems.interface';
import { EmblemsRepository } from './emblems.repository';

@Injectable()
export class EmblemsService {
  constructor(private readonly emblemsRepository: EmblemsRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getEmblems(): Promise<EmblemsType[]> {
    return await this.emblemsRepository.getEmblems();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ang } from 'ang.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Ang)
    private readonly angRepo: Repository<Ang>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getEntity(): Promise<string> {
    const user = await this.angRepo.findOne({ where: { id: 1 } });
    return `Hello ${user?.name ?? 'World'}!`;
  }
}

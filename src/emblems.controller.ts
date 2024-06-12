import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { EmblemsService } from './emblems.service';
import { Request, Response } from 'express';

@Controller()
export class EmblemsController {
  constructor(private readonly emblemService: EmblemsService) {}

  @Get()
  getHello(): string {
    return this.emblemService.getHello();
  }

  @Get('/emblems')
  async getEmblems(@Req() req: Request, @Res() res: Response) {
    try {
      const emblems = await this.emblemService.getEmblems();
      return res.status(HttpStatus.OK).json(emblems);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro ao obter emblemas', error });
    }
  }
}

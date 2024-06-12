import { Controller, Get, HttpStatus, Put, Req, Res } from '@nestjs/common';
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

  @Put('/emblems/:slug')
  async getEmblemsBySlug(@Req() req: Request, @Res() res: Response) {
    try {
      const { slug } = req.params;
      const userId = req.headers['user_id'];

      if (!userId) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'ID do usuário não fornecido nos headers' });
      }
      const emblem = await this.emblemService.getEmblemsBySlug(userId, slug);
      return res.status(HttpStatus.OK).json(emblem);
    } catch (error) {
      let errorMessage = 'Erro ao obter emblemas';

      if (error.message === 'Emblema não encontrado') {
        errorMessage = 'Emblema não encontrado';
      } else if (error.message === 'Emblema já capturado pelo usuário') {
        errorMessage = 'Emblema já capturado pelo usuário';
      }

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage });
    }
  }
}

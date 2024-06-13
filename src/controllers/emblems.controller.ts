import { Controller, Get, HttpStatus, Put, Req, Res } from '@nestjs/common';
import { EmblemsService } from '../services/emblems.service';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('emblems')
@Controller()
export class EmblemsController {
  constructor(private readonly emblemService: EmblemsService) {}

  @Get()
  @ApiOperation({ summary: 'Verifica se a api está disponível' })
  @ApiResponse({
    status: 200,
    description: 'Retorna "Hello World"',
  })
  getHello(): string {
    return this.emblemService.getHello();
  }

  @Get('/emblems')
  @ApiOperation({ summary: 'Obtém todos os emblemas' })
  @ApiResponse({
    status: 200,
    description: 'Lista todos emblemas',
  })
  async getEmblems(@Req() req: Request, @Res() res: Response) {
    try {
      const { page = 1, itemsPerPage = 10, findByName } = req.query;

      const data = {
        findByName: String(findByName),
        page: parseInt(page as string),
        itemsPerPage: parseInt(itemsPerPage as string),
      };

      const emblems = await this.emblemService.getEmblems(data);
      return res.status(HttpStatus.OK).json(emblems);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno durante a requisição' });
    }
  }

  @Get('/:userId/emblems')
  @ApiOperation({ summary: 'Obtém emblemas resgatados do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista todos emblemas de um usuário',
  })
  async getEmblemsByUserId(@Req() req: Request, @Res() res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'ID do usuário não fornecido' });
      }

      const emblems = await this.emblemService.getEmblemsByUserId(userId);
      return res.status(HttpStatus.OK).json(emblems);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno durante a requisição' });
    }
  }

  @Put('/emblems/:slug')
  @ApiOperation({
    summary:
      'Lista o emblema e resgata o emblema caso usuário não tenha resgatado antes',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista todos emblemas',
  })
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
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Emblema Resgatado!', item: emblem });
    } catch (error) {
      if (error.message == 'Emblema não encontrado') {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: error.message });
      }
      if (error.message == 'Emblema já capturado pelo usuário') {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      }
    }
  }
}

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
      let errorMessage = 'Erro ao obter emblemas';

      if (error.message === 'Nenhum emblema encontrado') {
        errorMessage = 'Nenhum emblema encontrado';
      } else if (error.message === 'Usuário não encontrado') {
        errorMessage = 'Usuário não encontrado';
      }

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage });
    }
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
        .json({ message: 'Erro ao obter emblemas', error });
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

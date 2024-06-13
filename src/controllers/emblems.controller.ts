import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { EmblemsService } from '../services/emblems.service';
import { Request, Response } from 'express';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Número da página para paginação',
  })
  @ApiQuery({
    name: 'itemsPerPage',
    type: Number,
    required: false,
    description: 'Número de itens por página',
  })
  @ApiQuery({
    name: 'findByName',
    type: String,
    required: false,
    description: 'Nome para filtrar emblemas pelo nome',
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
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
    description: 'ID do usuário',
  })
  async getEmblemsByUserId(@Req() req: Request, @Res() res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        throw new BadRequestException(
          'ID do usuário não fornecido nos headers',
        );
      }

      const emblems = await this.emblemService.getEmblemsByUserId(userId);
      return res.status(HttpStatus.OK).json(emblems);
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: error.message });
      }
      if (error instanceof NotFoundException) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: error.message });
      }
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
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'Slug do emblema',
  })
  @ApiHeader({
    name: 'user_id',
    required: true,
    description: 'ID do usuário enviado nos headers',
  })
  @ApiResponse({
    status: 200,
    description: 'Emblema resgatado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Emblema não encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'Emblema já capturado pelo usuário',
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida',
  })
  async getEmblemsBySlug(@Req() req: Request, @Res() res: Response) {
    try {
      const { slug } = req.params;
      const userId = req.headers['user_id'];

      if (!userId) {
        throw new BadRequestException(
          'ID do usuário não fornecido nos headers',
        );
      }
      const emblem = await this.emblemService.getEmblemsBySlug(userId, slug);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Emblema Resgatado!', item: emblem });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: error.message });
      }
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      }

      if (error instanceof BadRequestException) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: error.message });
      }

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro interno durante a requisição' });
    }
  }
}

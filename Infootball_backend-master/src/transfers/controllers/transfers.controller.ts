import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransfersService } from '../services/transfers.service';
import { Transfer } from '../entities/transfer.entity';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Post()
  create(@Body() createTransferDto: Partial<Transfer>): Promise<Transfer> {
    return this.transfersService.create(createTransferDto);
  }

  @Get()
  findAll(): Promise<Transfer[]> {
    return this.transfersService.findAll();
  }

  @Get('top')
  findTopTransfers(@Query('limit') limit?: number): Promise<Transfer[]> {
    return this.transfersService.findTopTransfers(limit);
  }

  @Get('season/:season')
  findBySeason(@Param('season') season: string): Promise<Transfer[]> {
    return this.transfersService.findBySeason(season);
  }

  @Get('player/:playerId')
  findByPlayer(@Param('playerId') playerId: string): Promise<Transfer[]> {
    return this.transfersService.findByPlayer(playerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Transfer> {
    return this.transfersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransferDto: Partial<Transfer>,
  ): Promise<Transfer> {
    return this.transfersService.update(id, updateTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.transfersService.remove(id);
  }
}

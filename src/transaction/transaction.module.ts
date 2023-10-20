import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { Module } from '@nestjs/common';
import { Transaction, TransactionSchema } from './repository/entities';
import { TransactionRepository } from './repository/repositories/transaction.repository';
import { TransactionResolver } from './transaction.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
  ],
  providers: [TransactionService, TransactionRepository, TransactionResolver],
  exports: [MongooseModule, TransactionService, TransactionRepository],
})
export class TransactionModule {}

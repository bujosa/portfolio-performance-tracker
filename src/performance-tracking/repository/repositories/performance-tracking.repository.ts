import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Portfolio } from 'src/portfolio/repository/entities';

@Injectable()
export class PerformanceTrackingRepository {
  constructor(
    @InjectModel(Portfolio.name)
    readonly entityModel: Model<Portfolio>,
  ) {}

  public async aggregateEntities<Z = any>(pipeline: any[]): Promise<Z[]> {
    try {
      return await this.entityModel.aggregate(pipeline);
    } catch (error) {
      console.error(`${JSON.stringify(error)}`);

      throw error;
    }
  }
}

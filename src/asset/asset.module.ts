import { MongooseModule } from '@nestjs/mongoose';
import { AssetService } from './asset.service';
import { Module } from '@nestjs/common';
import { Asset, AssetSchema } from './repository/entities';
import { AssetRepository } from './repository/repositories/asset.repository';
import { AssetResolver } from './asset.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Asset.name,
        schema: AssetSchema,
      },
    ]),
  ],
  providers: [AssetService, AssetRepository, AssetResolver],
  exports: [MongooseModule, AssetService, AssetRepository],
})
export class AssetModule {}

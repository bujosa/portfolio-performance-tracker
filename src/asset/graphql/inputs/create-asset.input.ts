import { InputType, Field } from '@nestjs/graphql';
import { ValidationInput } from 'src/common/validation';
import {
  validateNameWithJoi,
  validateUrlFormatWithJoi,
} from 'src/common/validation/strings';
import * as joi from 'joi';

@InputType({ description: 'Create asset input' })
export class CreateAssetInput extends ValidationInput {
  @Field({ description: 'Name of the asset example: "Bitcoin"' })
  name: string;

  @Field({ description: 'Symbol of the asset example "BTC"' })
  symbol: string;

  @Field({ description: 'URL of the asset' })
  url: string;

  public static validationSchema = joi.object<CreateAssetInput>({
    name: validateNameWithJoi.required(),
    symbol: validateNameWithJoi.required(),
    url: validateUrlFormatWithJoi('url').required(),
  });
}

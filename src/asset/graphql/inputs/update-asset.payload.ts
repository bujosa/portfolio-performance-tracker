import { InputType, PickType } from '@nestjs/graphql';
import { CreateAssetInput } from './create-asset.input';
import { validateUrlFormatWithJoi } from 'src/common/validation/strings/url';
import * as joi from 'joi';

@InputType()
export class UpdateAssetPayload extends PickType(CreateAssetInput, ['url']) {
  public static validationSchema = joi
    .object<UpdateAssetPayload>({
      url: validateUrlFormatWithJoi('url').required(),
    })
    .min(1);
}

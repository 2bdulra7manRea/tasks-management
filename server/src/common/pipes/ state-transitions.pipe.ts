import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ChangeStatusTaskDto } from 'src/task/dto/change-status-dto';
import { StateTransitionsContext } from 'src/task/state/state-transitions-context';
import { stringTolowerCase } from '../helpers/helper';

@Injectable()
export class StateTransitionsPipe implements PipeTransform<any> {
  async transform(value: ChangeStatusTaskDto, { metatype }: ArgumentMetadata) {
    const { previousStatus, status } = value;

    const stateTransitionsContext = new StateTransitionsContext();

    const isStateValid = stateTransitionsContext.validateStateTransition(
      stringTolowerCase(previousStatus),
      stringTolowerCase(status),
    );

    if (!isStateValid) {
      throw new BadRequestException(
        'Validation failed, state transition is not valid',
      );
    }

    return value;
  }
}

import { IPreviousStateTransitions } from '../interface/state';
import {
  StatusBlocked,
  StatusDone,
  StatusInProgress,
  StatusInQA,
  StatusToDo,
} from './state-tranitions';

export class StateTransitionsContext {
  private readonly previousStateTransitions: IPreviousStateTransitions = {
    todo: new StatusToDo(),
    blocked: new StatusBlocked(),
    inprogress: new StatusInProgress(),
    inqa: new StatusInQA(),
    done: new StatusDone(),
  };

  validateStateTransition(previousStatus: string, status: string): boolean {
    const getState = this.previousStateTransitions[previousStatus];
    if (!getState) {
      return false;
    }

    return getState.check(status);
  }
}

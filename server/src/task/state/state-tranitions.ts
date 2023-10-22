import { STATE_TRANSITIONS } from 'src/common/enum/state.enum';
import { State } from '../interface/state';

export class StatusToDo implements State {
  check(statue: string): boolean {
    if (statue === STATE_TRANSITIONS.IN_PROGRESS) return true;

    return false;
  }
}

export class StatusBlocked implements State {
  check(statue: string): boolean {
    if (statue === STATE_TRANSITIONS.TO_DO) return true;

    return false;
  }
}

export class StatusInProgress implements State {
  check(statue: string): boolean {
    if (
      statue === STATE_TRANSITIONS.BLOCKED ||
      statue === STATE_TRANSITIONS.IN_QA
    )
      return true;

    return false;
  }
}

export class StatusInQA implements State {
  check(statue: string): boolean {
    if (statue === STATE_TRANSITIONS.TO_DO || statue === STATE_TRANSITIONS.DONE)
      return true;

    return false;
  }
}

export class StatusDone implements State {
  check(statue: string): boolean {
    if (statue === STATE_TRANSITIONS.DEPLOYED) return true;

    return false;
  }
}

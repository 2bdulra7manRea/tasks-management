import { State } from '../interface/state';

export class StatusToDo implements State {
  check(statue: string): boolean {
    if (statue.toLowerCase() === 'inprogress') return true;

    return false;
  }
}

export class StatusBlocked implements State {
  check(statue: string): boolean {
    if (statue.toLowerCase() === 'todo') return true;

    return false;
  }
}

export class StatusInProgress implements State {
  check(statue: string): boolean {
    if (statue === 'blocked' || statue === 'inqa') return true;

    return false;
  }
}

export class StatusInQA implements State {
  check(statue: string): boolean {
    if (statue === 'todo' || statue === 'done') return true;

    return false;
  }
}

export class StatusDone implements State {
  check(statue: string): boolean {
    if (statue === 'deployed') return true;

    return false;
  }
}

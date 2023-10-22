export interface State {
  check(statue: string): boolean;
}

export interface IPreviousStateTransitions {
  [key: string]: State;
}

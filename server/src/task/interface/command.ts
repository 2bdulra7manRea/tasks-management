export interface Command<T> {
  execute(id: number, changes: T): Promise<void>;
}

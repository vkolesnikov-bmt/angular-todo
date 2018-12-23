export class Todo {
  id: number;
  task: string;
  status: boolean;
  owner?: number;

  constructor(task: string) {
    this.id = Number(new Date().getTime().toString(10));
    this.task = task;
    this.status = false;
  }
}

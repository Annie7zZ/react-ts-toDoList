import { type } from "os";

export interface actionType {
  type: string;
  data: any;
}

interface toDo {
  id?: number;
  title: string;
  isDone: boolean;
}
export type ToDo = toDo[];

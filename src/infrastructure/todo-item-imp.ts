import { TodoItem } from '../domain/todo-item';

export class TodoItemImp implements TodoItem {
  description: string;
  completed: boolean;

  constructor(description: string) {
    this.description = description;
    this.completed = false;
  }

  complete(){
    this.completed = true;
  }

  uncomplete(){
    this.completed = false;
  }

  change_description(new_description: string){
    this.description = new_description;
  }
}
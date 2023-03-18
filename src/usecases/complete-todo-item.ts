import { TodoItem } from "domain/todo-item";
import { TodoListRepository } from "./ports/todo-list-repository";

export class CompleteTodoItem {
    constructor(private todoListRepository: TodoListRepository) {}

    async perform(id: number, item_description: TodoItem["description"]) {
        const todolist = await this.todoListRepository.findById(id); ;
        if (todolist) {
          const todo = todolist.find_by_description(item_description);
          if (todo) {
            todo.complete();
            this.todoListRepository.update(todolist.id, todolist);
          }
        }
      }
}


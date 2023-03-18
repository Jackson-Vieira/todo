import { TodoListRepository } from "../infrastructure/interfaces/todo-list-repository";
import { TodoItem } from "../entities/todo-item";

export class CreateTodoItem {
  constructor(private readonly todoListRepository: TodoListRepository) {}
  async perform(user_email: string, item_description: string): Promise<boolean> {
    const todolist = await this.todoListRepository.findByEmail(user_email);
    if (todolist) {
      const todoExist = todolist.find_by_description(item_description);
      if (todoExist) {
        throw new Error("Todo item already exists");
      }
      const todo = new TodoItem(item_description);
      todolist.add(todo);
      this.todoListRepository.update(user_email, todolist);
      return true;
    }
    return false;
  }
}

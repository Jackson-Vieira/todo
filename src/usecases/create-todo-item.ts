import { TodoListRepository } from "../infrastructure/interfaces/todo-list-repository";
import { TodoItem } from "../entities/todo-item";

export class CreateTodoItem {
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async perform(user_email: string, item_description: string): Promise<void> {
    this.todoListRepository.setStatus("Adding todo item to user todo list...");

    const todolist = await this.todoListRepository.findByEmail(user_email);
    if (!todolist) {
      this.todoListRepository.setStatus("Ready");
      throw new Error("User not found");
    }

    if (todolist.find_by_description(item_description)) {
      this.todoListRepository.setStatus("Ready");
      throw new Error("Todo item already exists");
    }

    const todo = new TodoItem(item_description);
    todolist.add(todo);
    await this.todoListRepository.update(user_email, todolist);

    this.todoListRepository.setStatus("Ready");
  }
}
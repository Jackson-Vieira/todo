import { TodoItem } from "domain/todo-item";
import { TodoListRepository } from "./ports/todo-list-repository";

export class UpdateTodoItem {
  constructor(private todoListRepository: TodoListRepository) {}
  async perform(
    id: number,
    item_description: TodoItem["description"],
    new_description: string
  ): Promise<void> {
    const todoList = await this.todoListRepository.findById(id);
    if (todoList) {
      todoList.change_description(item_description, new_description);
      this.todoListRepository.update(id, todoList);
    }
  }
}

// Python Example

// class ChangeItem:
//     def __init__(self, todo_list_repository):
//         self.todo_list_repository = todo_list_repository

//     def perform(self, user_email, item_description, change_type, new_value):
//         todo_list = self.todo_list_repository.find_by_email(user_email)
//         if not todo_list:
//             raise InvalidUserError()
//         if change_type == ChangeType.DESCRIPTION:
//             todo_list.change_description(item_description, new_value)
//         elif change_type == ChangeType.PRIORITY:
//             todo_list.change_priority_by_description(item_description, new_value)
//         self.todo_list_repository.update(user_email, todo_list)

// class ChangeType(Enum):
//     DESCRIPTION = 0
//     PRIORITY = 1

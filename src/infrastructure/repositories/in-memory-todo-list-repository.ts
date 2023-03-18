import { TodoListRepository } from "@/infrastructure/interfaces/todo-list-repository";
import { TodoList } from "@/entities/todo-list";
import { Observable, Event } from "../interfaces/observable";

export class InMemoryTodoListRepository
  extends Observable
  implements TodoListRepository
{
  private todoLists: TodoList[] = [];
  
  async save(todoList: TodoList): Promise<void> {
    const todoListExist = this.todoLists.includes(todoList);
    if (todoListExist) {
      throw new Error("TodoList already exists");
    }
    this.todoLists.push(todoList);
    this.updateObservers({ type: Event.EventType.todoAdded });
  }

  async update(user_email: string, todoList: TodoList): Promise<void> {
    const index = this.todoLists.findIndex(
      (tl) => tl.user.email === user_email
    );
    if (index === -1) {
      throw new Error("TodoList not found");
    }
    this.todoLists[index] = todoList;
    this.updateObservers({ type: Event.EventType.todoUpdated });
  }

  async remove(user_email: string): Promise<void> {
    this.todoLists = this.todoLists.filter((tl) => tl.user.email !== user_email);
    this.updateObservers({ type: Event.EventType.todoRemoved });
  }

  findByEmail(user_email: string): Promise<TodoList | undefined> {
    const todoList = this.todoLists.find((tl) => tl.user.email === user_email);
    return Promise.resolve(todoList);
  }

  list(): Promise<TodoList[]> {
    return Promise.resolve(this.todoLists);
  }

  setStatus(status: string): void {
    console.log('setting status to', status)
  }
}

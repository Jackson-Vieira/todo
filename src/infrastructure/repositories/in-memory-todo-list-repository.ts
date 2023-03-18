import { TodoListRepository } from "usecases/ports/todo-list-repository";
import { TodoList } from "domain/todo-list";
import { Observable, Event } from "../observable";

export class InMemoryTodoListRepository
  extends Observable
  implements TodoListRepository
{
  private todoLists: TodoList[] = [];

  async add(todoList: TodoList): Promise<void> {
    this.updateObservers({ type: Event.EventType.todoAdded });
    this.todoLists.push(todoList);
  }

  async update(id: number, todoList: TodoList): Promise<void> {
    const index = this.todoLists.findIndex((tl) => tl.id === id);
    if (index === -1) {
      throw new Error("TodoList not found");
    }
    this.todoLists[index] = todoList;
    this.updateObservers({ type: Event.EventType.todoUpdated });
  }

  async remove(id: number): Promise<void> {
    this.todoLists = this.todoLists.filter((tl) => tl.id !== id);
    this.updateObservers({ type: Event.EventType.todoRemoved });
  }

  findById(id: number): Promise<TodoList> {
    const todoList = this.todoLists.find((tl) => tl.id === id);
    if (!todoList) {
      throw new Error("TodoList not found");
    }
    return Promise.resolve(todoList);
  }

  list(): Promise<TodoList[]> {
    return Promise.resolve(this.todoLists);
  }
}

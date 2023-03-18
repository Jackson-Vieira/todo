import {
  CreateTodoItem,
  CompleteTodoItem,
  CreateTodoList,
  UpdateTodoItem,
} from "./usecases";

import { InMemoryTodoListRepository } from "./infrastructure/repositories";
import { Event } from "./infrastructure/observable";

const todoListRepository = new InMemoryTodoListRepository();
todoListRepository.addObserver(Event.EventType.todoAdded, (e: Event) =>
  console.log("todo added", e)
);
todoListRepository.addObserver(Event.EventType.todoCompleted, (e: Event) =>
  console.log("todo completed", e)
);
todoListRepository.addObserver(Event.EventType.todoRemoved, (e: Event) =>
  console.log("todo removed", e)
);

const createTodoList = () => {
  const createTodoList = new CreateTodoList(todoListRepository);
  createTodoList.perform();
};

const createTodoItem = (todoListId: number, description: string) => {
  const createTodoItem = new CreateTodoItem(todoListRepository);
  createTodoItem.perform(todoListId, description);
};

const updateTodoItem = (
  todoListId: number,
  item_description: string,
  new_description: string
) => {
  const updateTodoItem = new UpdateTodoItem(todoListRepository);
  updateTodoItem.perform(todoListId, item_description, new_description);
};

const completeTodoItem = (todoListId: number, item_description: string) => {
  const completeTodoItem = new CompleteTodoItem(todoListRepository);
  completeTodoItem.perform(todoListId, item_description);
};

const listTodos = async () => {
  const todos = await todoListRepository.list();
  todos.forEach((todo) => {
    console.log(todo.id);
  });
};

const listTodoItems = async (todoListId: number) => {
  const todolist = await todoListRepository.findById(todoListId);
  const items = todolist.list();
  items.forEach((item) => {
    console.log(item.description);
  });
};

window.app = {
  createTodoList,
  createTodoItem,
  updateTodoItem,
  completeTodoItem,
  listTodos,
  listTodoItems,
};

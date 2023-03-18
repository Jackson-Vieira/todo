import {
  CreateTodoItem,
  CompleteTodoItem,
  CreateTodoList,
  UpdateTodoItem,
  CreateUser,
} from "./usecases";

import { InMemoryTodoListRepository } from "./infrastructure/repositories";
import { Event } from "./infrastructure/interfaces/observable";
import { User } from "./entities/user";
import { InMemoryUserRepository } from "./infrastructure/repositories/in-memory-user-repository";

const todoListRepository = new InMemoryTodoListRepository();
const userRepository = new InMemoryUserRepository();
todoListRepository.addObserver(Event.EventType.todoAdded, (e: Event) =>
  console.log("todo added", e)
);
todoListRepository.addObserver(Event.EventType.todoCompleted, (e: Event) =>
  console.log("todo completed", e)
);
todoListRepository.addObserver(Event.EventType.todoRemoved, (e: Event) =>
  console.log("todo removed", e)
);
const createTodoList = (user: User) => {
  const createTodoList = new CreateTodoList(todoListRepository);
  createTodoList.perform(user);
};

const createUser = async (email: string, name: string) => {
  const createUser = new CreateUser(userRepository);
  const user = await createUser.perform(email, name);
  createTodoList(user)
  return user;
};

const createTodoItem = (user_email: string, item_description: string) => {
  const createTodoItem = new CreateTodoItem(todoListRepository);
  createTodoItem.perform(user_email, item_description);
};

const updateTodoItem = (
  user_email: string,
  item_description: string,
  new_description: string
) => {
  const updateTodoItem = new UpdateTodoItem(todoListRepository);
  updateTodoItem.perform(user_email, item_description, new_description);
};

const completeTodoItem = (user_email: string, item_description: string) => {
  const completeTodoItem = new CompleteTodoItem(todoListRepository);
  completeTodoItem.perform(user_email, item_description);
};

const listTodos = async () => {
  console.log("listTodos");
};

const listTodoItems = async (user_email: string) => {
  const todolist = await todoListRepository.findByEmail(user_email);
  const items = todolist.list();
  items.forEach((item) => {
    console.log(item.description);
  });
};

window.app = {
  createTodoList,
  createTodoItem,
  createUser,
  updateTodoItem,
  completeTodoItem,
  listTodos,
  listTodoItems,
};

export interface Event {
  type: Event.EventType;
  sender?: any;
  payload?: any;
}

export namespace Event {
  export enum EventType {
    todoAdded = "todoAdded",
    todoRemoved = "todoRemoved",
    todoUpdated = "todoUpdated",
    todoCompleted = "todoCompleted",
  }
}

export class Observable {
  observers: { [key: string]: Function[] } = {};

  updateObservers(e: Event) {
    let items = this.observers[e.type];

    if (items) {
      e.sender = this;

      for (let i = 0; i < items.length; i++) {
        items[i](e);
      }
    }
  }

  addObserver(eventName: Event.EventType, observer: Function) {
    let key = eventName;

    if (!this.observers[key]) {
      this.observers[eventName] = [observer];
      return;
    }

    let isObserver = false;
    let observers = this.observers[key];
    let index = 0;

    while (index < observers.length && !isObserver) {
      if (observers[index] == observer) {
        isObserver = true;
      }
      index++;
    }

    if (!isObserver) {
      this.observers[key].push(observer);
    }
  }

  removeObserver(eventName: Event.EventType, observer: Function) {
    let key = eventName;
    let observers = this.observers[key];

    if (!observers) {
      return;
    }

    let found = false;
    let index = 0;

    while (index < observers.length && !found) {
      if (observers[index] == observer) {
        observers.splice(index, 1);
        found = true;
      }

      index++;
    }
  }

  resetObservers() {
    this.observers = {};
  }

  toString() {
    let s = "Object type: Observable\n";

    for (let index in this.observers) {
      s += `${index} - ${this.observers[index].length} observers`;
    }

    return s;
  }
}

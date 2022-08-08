import { atom } from "recoil";

export interface ITodo {
    id: number;
    text: string;
    category: "TO_DO" | "DOING" | "DONE"; // 할 일(todo), 하고 있는 일(doing), 한 일(done)
  }
  
export const todoState = atom<ITodo[]>({ // TODO들의 배열임을 알려줌
    key: "todo",
    default: [],
  });
  
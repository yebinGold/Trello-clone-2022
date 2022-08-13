import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface ITodoState {
  // todo, doing, done 말고 다른 옵션도 있음을 알려줌 (나중에 다른 board 만들수도 있으니 key를 제한하지 않음)
  [key: string]: ITodo[]; // ITodo 객체들의 배열로 구성됨
}

export const todosState = atom<ITodoState>({
  key: "todos",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
})

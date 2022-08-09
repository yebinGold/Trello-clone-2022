import { atom, selector } from "recoil";

//type categories = "TO_DO" | "DOING" | "DONE"; // type = 반복 가능
export enum Categories {
	"TO_DO" = "TO_DO",
	"DOING" = "DOING",
	"DONE" = "DONE",
}

export interface ITodo {
  id: number;
  text: string;
  category: Categories; // 할 일(todo), 하고 있는 일(doing), 한 일(done)
}

export const todoState = atom<ITodo[]>({
  // TODO들의 배열임을 알려줌
  key: "todo",
  default: [],
});

export const categoryState = atom<Categories>({
  key: "category", 
  default: Categories.TO_DO,
})

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    // atom을 받을 get 함수
    // todoSelector가 반환할 값
    const todos = get(todoState); // todoState atom을 받아옴
    const category = get(categoryState);

    return todos.filter((todo) => todo.category === category);
  },
});

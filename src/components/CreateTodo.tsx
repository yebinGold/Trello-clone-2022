import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { todoState, categoryState } from "../atoms";

interface IForm {
  todo: string;
}

const CreateTodo = () => {
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, formState: {errors} , setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: data.todo, category },
    ]);
    setValue("todo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("todo", { required: "Please write your To Do" })}
        placeholder="Write a to do"
      />
      <button>Add</button>
      <span>{errors?.todo?.message}</span>
    </form>
  );
};

export default CreateTodo;

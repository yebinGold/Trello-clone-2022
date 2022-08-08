// react-hook-form 연습용 - 회원가입 form

import { useForm } from "react-hook-form";

interface IFormData {
  email: string;
  firstName: string;
  lastName?: string; // not required
  username: string;
  password1: string;
  password2: string;
  extraErrors?: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  // 데이터 유효성 검사 -> validation을 마치면 호출, 값이 유효하지 않으면 에러
  const onValid = (data: IFormData) => {
    if (data.password1 !== data.password2) {
      setError("password1", { message: "Passwords are not the same!" });
    }
    setError("extraErrors", { message: "Server offline." });
    console.log(data); // form 객체 반환.. 실제 통신 시에는 백엔드로 post
  };
  const inValid = (data: any) => {
    console.log("invalid data");
    console.log(errors);
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid, inValid)}
      >
        <input
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "naver.com ONLY",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", { required: "required!", validate: (value) => value.includes("A") ? "'A' is not allowed" : true })}
          placeholder="First Name"
        />
        {errors?.firstName?.message}
        <input {...register("lastName")} placeholder="Last Name" />
        {errors?.lastName?.message}
        <input
          {...register("username", { required: "required!", minLength: 5 })}
          placeholder="Username"
        />
        {errors?.username?.message}
        <input
          {...register("password1", {
            required: "required!",
            minLength: {
              value: 10,
              message: "Your password is too short!",
            },
          })}
          placeholder="Password"
          type="password"
        />
        {errors?.password1?.message}
        <input
          {...register("password2", {
            required: "required!",
            minLength: {
              value: 10,
              message: "Your password is too short!",
            },
          })}
          placeholder="Password Check"
          type="password"
        />
        {errors?.password2?.message}
        <button>Add</button>
        {errors?.extraErrors?.message}
      </form>
    </div>
  );
};

// const SignUp = () => {
//   const [todo, setTodo] = useState("");
//   const [todoError, setTodoError] = useState("");
//   const onChange = (e: React.FormEvent<HTMLInputElement>) =>
//     setTodo(e.currentTarget.value);
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (todo.length < 10) {
//       return setTodoError("To do should be longer then 10 character");
//     } else {
//       console.log(todo);
//       setTodo("");
//       setTodoError("");
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           value={todo}
//           onChange={onChange}
//           type="text"
//           placeholder="Write a to do"
//         />
//         <button>Add</button>
//         {todoError !== "" ? todoError : null}
//       </form>
//     </div>
//   );
// };

export default SignUp;

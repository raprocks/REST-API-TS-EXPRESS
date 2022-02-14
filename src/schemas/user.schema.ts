import { object, string, TypeOf } from "zod";

export const createdUserSchema = object({
  body: object({
    name: string({
      required_error: `Name is required`,
    }),
    password: string({
      required_error: `Password is required`,
    }).min(8, "Password is too short - should be atleast 8 character."),

    // .matches(
    //   /^[a-zA-Z0-9_.-]*$/,
    //   "Password can only contain alphabets, digits or '_', '.' or '-'"
    // )
    passwordConfirmation: string(),
    // .oneOf(
    //   [ref("password"), null],
    //   "Passwords do not match"
    // )
    email: string({
      required_error: `Email is required`,
    }).email("Must be a valid email"),
    // .required("Email is required"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password does not match with confirmed password",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createdUserSchema>,
  "comparePassword"
>;

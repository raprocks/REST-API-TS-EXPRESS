import { object, string, TypeOf } from "zod";

export const createdUserSchema = object({
  body: object({
    name: string({
      required_error: `Name is required`,
    }),
    password: string({
      required_error: `Password is required`,
    }).min(8, "Password is too short - should be atleast 8 character."),
    passwordConfirmation: string(),
    email: string({
      required_error: `Email is required`,
    }).email("Must be a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password does not match with confirmed password",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createdUserSchema>,
  "comparePassword"
>;

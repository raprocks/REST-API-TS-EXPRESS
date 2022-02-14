import { object, string } from "zod";

export const createdSessionSchema = object({
  body: object({
    password: string({
      required_error: `Password is required`,
    }).min(8, "Password is too short - should be atleast 8 character."),

    email: string({
      required_error: `Email is required`,
    }).email("Must be a valid email"),
    // .required("Email is required"),
  }),
});

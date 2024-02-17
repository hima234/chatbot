import { JWTPayload } from "jose";
import { createSelectSchema } from "drizzle-zod";
import { users } from "./database/schema";
import * as z from "zod";

export type Session = JWTPayload & {
  id: string;
  username: string;
  mobile: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

const selectUserSchema = createSelectSchema(users);

export type User = z.infer<typeof selectUserSchema>;

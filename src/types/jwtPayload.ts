import { User } from "../types/responses";

export type UserPayload = Omit<User, "password">;
import "next-auth";
import { TUserData } from "./pages/api/v1/auth/[...nextauth]";

declare module "next-auth" {
  interface User extends TUserData {}

  interface Session {
    user: User;
  }
}

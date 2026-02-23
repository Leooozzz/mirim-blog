import { defineAbility } from "@casl/ability";
import { Role, User } from "../generated/prisma/client";


export function defineAbilitiesFor(user: User) {
  return defineAbility((can, cannot) => {
    if (user.role === Role.ADMIN) {
      can("manage", "all");
      return;
    }

    if (user.role === Role.EDITOR) {
      can("create", "Post");
      can("read", "Post");
      can("update", "Post");

      can("read", "User");

      can("read", "Category");
      can("update", "Category");
      can("create", "Category");

      cannot("delete", "Post");
      cannot("create", "User");
      cannot("update", "User");
      cannot("delete", "User");
      cannot("delete", "Category");
    }
  });
}

declare const Parse: any;

import { getTotalUsers } from "../utils/cloud/userController";

Parse.Cloud.define("getUserNameInUsed", async ({ params }: any) => {
  const { username } = params;
  if (!username) return { error: "invalid params" };
  const collection = "User";
  const users = await getTotalUsers();
  let inUsed = users.find(
    (user: any) =>
      user.attributes.username &&
      user.attributes.username.toLowerCase() === username.toLowerCase()
  )
    ? true
    : false;
  // return user ? { check: false, user: user } : { check: true, user: user };
  return inUsed;
});

Parse.Cloud.define("loadUsers", async ({ params }: any) => {
  const allusers = await getTotalUsers();
  return allusers;
});
Parse.Cloud.define("testfinduser", async ({ params }: any) => {
  const collection = "User";
  const query = new Parse.Query(collection);
  query.limit(9000);
  const allusers = await query.find();
  return allusers;
});

Parse.Cloud.define("verifyUser", async ({ params }: any) => {
  let { keywords } = params;
  let chosenUsers;
  let error;
  if (keywords == "")
    return { chosenUsers: chosenUsers, error: '"Input Username"' };
  try {
    let users = await getTotalUsers();
    let selectedUser = users.filter(
      (user: any) =>
        user.attributes.username.toLowerCase() === keywords.toLowerCase()
    );
    chosenUsers = selectedUser;
  } catch (e) {
    error = e;
  }
  return { chosenUsers: chosenUsers, error: error };
});

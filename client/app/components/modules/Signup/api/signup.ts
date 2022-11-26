import Moralis from "moralis-v1";

async function getUserNameInUsed(username: string) {
  const functionName = "testfinduser";
  let fn = await Moralis.Cloud.run(functionName, { username: username });
  console.log("getUserNameInUsed", fn);
  return fn;
}
async function getUser() {
  const tableName = "User";
  let table = Moralis.Object.extend(tableName);
  let query = table && new Moralis.Query(table);
  let result = query && (await query.find());
  return result;
}

export { getUserNameInUsed, getUser };

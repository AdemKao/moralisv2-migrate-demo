declare const Parse: any;

async function getCounts(collection: string) {
  let query = new Parse.Query(collection);
  let counts = await query.count({ useMasterKey: true });
  return counts;
}
async function getTotalUsers() {
  const collection = "User";
  const query = new Parse.Query(collection);
  let counts = await getCounts(collection);
  query.limit(counts);
  const allusers = await query.find({ useMasterKey: true });
  return allusers;
}
export { getCounts, getTotalUsers };

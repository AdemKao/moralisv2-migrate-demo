import axios from "axios";

interface apiOptions {
  params: any;
  endpoint: string;
  route?: string;
}
const apiPost = async (options: apiOptions) => {
  let { params, endpoint, route } = options;
  console.log(params);
  let url = route
    ? `${route}/${endpoint}`
    : `http://localhost:1337/api/${endpoint}`;
  const result = await axios.post(
    url,
    params
    // {
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // }
  );
  console.log("api result", result);
  return result.data;
};
const apiPut = async (options: apiOptions) => {
  let { params, endpoint, route } = options;
  console.log(params);
  let url = route
    ? `${route}/${endpoint}`
    : `http://localhost:1337/api/${endpoint}`;
  const result = await axios.put(
    url,
    params
    // {
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // }
  );
  console.log("api result", result);
  return result.data;
};

export { apiPost, apiPut };

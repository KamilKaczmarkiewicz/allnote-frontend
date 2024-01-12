import axios from "axios";

export async function getWithCredentials(url) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  try {
    return await axios.get(url, config);
  } catch (err) {
    console.log(err);
    return err;
  }
}

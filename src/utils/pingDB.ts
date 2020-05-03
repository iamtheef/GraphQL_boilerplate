import { client } from "@config/pg_client";

export const pingDB = async () => {
  try {
    const res = await client.raw("select 1+1 as result");
    if (res) return true;

    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

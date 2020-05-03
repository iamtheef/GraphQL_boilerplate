import { client } from "@config/pg_client";

export const pingDB = async () => {
  try {
    const res = await client.raw("select 1+1 as result");
    return {
      isConnected: !!res,
      message: res && "CONNECTED",
    };
  } catch (err) {
    return { isConnected: false, message: err.stack };
  }
};

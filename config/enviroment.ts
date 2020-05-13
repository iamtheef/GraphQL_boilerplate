require("dotenv").config();

const enviroments = ["DEV", "PROD", "TEST"];

export const setEnv = () => {
  if (!enviroments.includes(process.env.ENV)) {
    console.error(
      `Your enviroment '${process.env.ENV}' is no available. Please set your enviroment to one of these values : \n`,
      enviroments.map((x, i) => `${i + 1}) ${x}`).join("\n")
    );
    return false;
  }
  console.log("CURRENT ENVIROMENT : ", process.env.ENV);
  return true;
};

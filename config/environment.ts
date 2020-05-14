require("dotenv").config();

const environments = ["DEV", "PROD", "TEST"];

export const setEnv = () => {
  if (!environments.includes(process.env.ENV)) {
    console.error(
      `Your enviroment '${process.env.ENV}' is no available. Please set your enviroment to one of these values : \n`,
      environments.map((x, i) => `${i + 1}) ${x}`).join("\n")
    );
    return false;
  }
  console.log("CURRENT ENVIRONMENT : ", process.env.ENV);
  return true;
};

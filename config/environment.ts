require("dotenv").config();

const environments = ["DEV", "PROD", "TEST"];

export const isEnv = () => {
  const currentEnv = process.env.ENV.toLocaleUpperCase();
  const formattedEnvs = environments.map((x, i) => `${i + 1}) ${x}`).join("\n");
  if (!environments.includes(currentEnv)) {
    console.info(`${"=".repeat(40)}`);
    console.error(
      `Your environment '${currentEnv}' is no available. Please set your environment to one of these values:\n${formattedEnvs}`
    );
    console.info(`${"=".repeat(40)}`);
    return false;
  }
  console.info(`${"=".repeat(40)}`);
  console.log("CURRENT ENVIRONMENT: ", currentEnv);
  console.info(`${"=".repeat(40)}`);
  return true;
};

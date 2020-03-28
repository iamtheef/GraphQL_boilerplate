// import { codegen } from "@graphql-codegen/core";
// import { resolvers } from "../resolvers/index";
// import { typeDefs } from "../types/index";
// import { buildSchema } from "graphql";
// import * as fs from "fs";
// import path from "path";
// import * as typescriptPlugin from "@graphql-codegen/typescript";
// import { printSchema, parse, GraphQLSchema } from "graphql";
// import { makeExecutableSchema } from "graphql-tools";
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// });

// const finalSchema: GraphQLSchema = buildSchema(`${schema}`);
// const outputFile = "./schema.ts";

// const config = {
//   filename: outputFile,
//   schema: parse(printSchema(finalSchema)),
//   plugins: [
//     {
//       typescript: {}
//     }
//   ],
//   pluginMap: {
//     typescript: typescriptPlugin
//   },
//   documents: {},
//   config: {
//     skipDocumentsValidation: true,
//     pluginMap: typescriptPlugin
//     // ["typescipt"]: typescriptPlugin
//   }
// };

// export const generateSchema = async () => {
//   const generatedShema = await codegen(config);
//   fs.writeFile(path.join(__dirname, outputFile), generatedShema, () => {
//     console.log("Outputs generated!");
//   });
// };

import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./User";
import { Article } from "./Article";

export const Users = getModelForClass(User);
export const Articles = getModelForClass(Article);

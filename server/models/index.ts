import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./User";
import { Article } from "./Article";

export const UserCollection = getModelForClass(User);
export const ArticleCollection = getModelForClass(Article);

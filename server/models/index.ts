import { getModelForClass } from "@typegoose/typegoose";
import { UserModel } from "./User";
import { ArticleModel } from "./Article";

export const User = getModelForClass(UserModel);
export const Article = getModelForClass(ArticleModel);

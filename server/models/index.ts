import { getModelForClass } from "@typegoose/typegoose";
import { ArticleModel } from "./Article";
import { UserModel } from "./User";

export const Article = getModelForClass(ArticleModel);
export const User = getModelForClass(UserModel);

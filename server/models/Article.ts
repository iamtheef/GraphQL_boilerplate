import { prop } from "@typegoose/typegoose";
import validator from "validator";

export class ArticleModel {
  public _id: String;

  @prop()
  authorID: String;

  @prop({ validate: title => validator.isLength(title, { max: 30, min: 3 }) })
  title: String;

  @prop({ validate: title => validator.isLength(title, { min: 10 }) })
  body: String;

  @prop({ default: Date.now() })
  createdAt: Date;

  @prop()
  comments: []; //not implemented reference (articles may have comments or may be a personal blog)
}

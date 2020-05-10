export interface Article {
  id: string;
  title: string;
  body: string;

  authorID: string;

  createdAt: Date;
  updatedAt: Date;
}

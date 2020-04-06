import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type GQL_Article = {
   __typename?: 'Article';
  id?: Maybe<Scalars['ID']>;
  authorID?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type GQL_ArticleQueryInput = {
  title?: Maybe<Scalars['String']>;
  authorID?: Maybe<Scalars['String']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type GQL_AuthResponse = {
   __typename?: 'AuthResponse';
  token?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<GQL_ErrorFormat>>>;
};

export type GQL_Body = {
  authorID: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
};

export type GQL_Changes = {
  reqID: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};


export type GQL_EditArticleResponse = {
   __typename?: 'editArticleResponse';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<GQL_ErrorFormat>>>;
};

export type GQL_ErrorFormat = {
   __typename?: 'ErrorFormat';
  path?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type GQL_LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type GQL_Mutation = {
   __typename?: 'Mutation';
  /** @deprecated Field no longer supported */
  _?: Maybe<Scalars['String']>;
  createArticle?: Maybe<GQL_NewArticleResponse>;
  deleteAcc?: Maybe<Scalars['Boolean']>;
  editArticle?: Maybe<GQL_EditArticleResponse>;
  login?: Maybe<GQL_AuthResponse>;
  register?: Maybe<GQL_AuthResponse>;
  removeArticle?: Maybe<GQL_RemoveArticleResponse>;
  updateAcc?: Maybe<GQL_UpdateAccResponse>;
};


export type GQL_MutationCreateArticleArgs = {
  input?: Maybe<GQL_Body>;
};


export type GQL_MutationDeleteAccArgs = {
  id: Scalars['ID'];
};


export type GQL_MutationEditArticleArgs = {
  id: Scalars['ID'];
  changes: GQL_Changes;
};


export type GQL_MutationLoginArgs = {
  input: GQL_LoginInput;
};


export type GQL_MutationRegisterArgs = {
  input: GQL_RegisterInput;
};


export type GQL_MutationRemoveArticleArgs = {
  id: Scalars['ID'];
  reqID: Scalars['ID'];
};


export type GQL_MutationUpdateAccArgs = {
  input: GQL_UserUpdates;
};

export type GQL_NewArticleResponse = {
   __typename?: 'newArticleResponse';
  success?: Maybe<Scalars['Boolean']>;
  articleID?: Maybe<Scalars['ID']>;
  errors?: Maybe<Array<Maybe<GQL_ErrorFormat>>>;
};

export type GQL_Password = {
  oldPassword: Scalars['String'];
  newPassword?: Maybe<Scalars['String']>;
  confirmPassword?: Maybe<Scalars['String']>;
};

export type GQL_Query = {
   __typename?: 'Query';
  /** @deprecated Field no longer supported */
  _?: Maybe<Scalars['String']>;
  allArticles?: Maybe<Array<Maybe<GQL_Article>>>;
  allUsers?: Maybe<Array<Maybe<GQL_User>>>;
  articleByID?: Maybe<GQL_Article>;
  findArticle?: Maybe<Array<Maybe<GQL_Article>>>;
  findUser?: Maybe<Array<Maybe<GQL_User>>>;
  isUserRegistered?: Maybe<Scalars['Boolean']>;
  userArticles?: Maybe<Array<Maybe<GQL_Article>>>;
  userById?: Maybe<GQL_User>;
};


export type GQL_QueryArticleByIdArgs = {
  id: Scalars['ID'];
};


export type GQL_QueryFindArticleArgs = {
  input?: Maybe<GQL_ArticleQueryInput>;
};


export type GQL_QueryFindUserArgs = {
  input: GQL_UserQueryInput;
};


export type GQL_QueryIsUserRegisteredArgs = {
  email: Scalars['String'];
};


export type GQL_QueryUserByIdArgs = {
  id: Scalars['ID'];
};

export type GQL_RegisterInput = {
  fullName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type GQL_RemoveArticleResponse = {
   __typename?: 'removeArticleResponse';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<GQL_ErrorFormat>>>;
};

export type GQL_UpdateAccResponse = {
   __typename?: 'UpdateAccResponse';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<GQL_ErrorFormat>>>;
};

export type GQL_User = {
   __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  fullName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  isGoogle?: Maybe<Scalars['Boolean']>;
  googleID?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  articles?: Maybe<Array<Maybe<GQL_Article>>>;
};

export type GQL_UserQueryInput = {
  fullName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  googleID?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type GQL_UserUpdates = {
  id: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  password?: Maybe<GQL_Password>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GQL_ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Article: ResolverTypeWrapper<GQL_Article>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  User: ResolverTypeWrapper<GQL_User>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ArticleQueryInput: GQL_ArticleQueryInput,
  UserQueryInput: GQL_UserQueryInput,
  Mutation: ResolverTypeWrapper<{}>,
  Body: GQL_Body,
  newArticleResponse: ResolverTypeWrapper<GQL_NewArticleResponse>,
  ErrorFormat: ResolverTypeWrapper<GQL_ErrorFormat>,
  Changes: GQL_Changes,
  editArticleResponse: ResolverTypeWrapper<GQL_EditArticleResponse>,
  LoginInput: GQL_LoginInput,
  AuthResponse: ResolverTypeWrapper<GQL_AuthResponse>,
  RegisterInput: GQL_RegisterInput,
  removeArticleResponse: ResolverTypeWrapper<GQL_RemoveArticleResponse>,
  UserUpdates: GQL_UserUpdates,
  Password: GQL_Password,
  UpdateAccResponse: ResolverTypeWrapper<GQL_UpdateAccResponse>,
};

/** Mapping between all available schema types and the resolvers parents */
export type GQL_ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  Article: GQL_Article,
  ID: Scalars['ID'],
  Date: Scalars['Date'],
  User: GQL_User,
  Boolean: Scalars['Boolean'],
  ArticleQueryInput: GQL_ArticleQueryInput,
  UserQueryInput: GQL_UserQueryInput,
  Mutation: {},
  Body: GQL_Body,
  newArticleResponse: GQL_NewArticleResponse,
  ErrorFormat: GQL_ErrorFormat,
  Changes: GQL_Changes,
  editArticleResponse: GQL_EditArticleResponse,
  LoginInput: GQL_LoginInput,
  AuthResponse: GQL_AuthResponse,
  RegisterInput: GQL_RegisterInput,
  removeArticleResponse: GQL_RemoveArticleResponse,
  UserUpdates: GQL_UserUpdates,
  Password: GQL_Password,
  UpdateAccResponse: GQL_UpdateAccResponse,
};

export type GQL_ArticleResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['Article'] = GQL_ResolversParentTypes['Article']> = {
  id?: Resolver<Maybe<GQL_ResolversTypes['ID']>, ParentType, ContextType>,
  authorID?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  body?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<GQL_ResolversTypes['Date']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_AuthResponseResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['AuthResponse'] = GQL_ResolversParentTypes['AuthResponse']> = {
  token?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  success?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['ErrorFormat']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface GQL_DateScalarConfig extends GraphQLScalarTypeConfig<GQL_ResolversTypes['Date'], any> {
  name: 'Date'
}

export type GQL_EditArticleResponseResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['editArticleResponse'] = GQL_ResolversParentTypes['editArticleResponse']> = {
  success?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['ErrorFormat']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_ErrorFormatResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['ErrorFormat'] = GQL_ResolversParentTypes['ErrorFormat']> = {
  path?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  message?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_MutationResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['Mutation'] = GQL_ResolversParentTypes['Mutation']> = {
  _?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  createArticle?: Resolver<Maybe<GQL_ResolversTypes['newArticleResponse']>, ParentType, ContextType, RequireFields<GQL_MutationCreateArticleArgs, never>>,
  deleteAcc?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<GQL_MutationDeleteAccArgs, 'id'>>,
  editArticle?: Resolver<Maybe<GQL_ResolversTypes['editArticleResponse']>, ParentType, ContextType, RequireFields<GQL_MutationEditArticleArgs, 'id' | 'changes'>>,
  login?: Resolver<Maybe<GQL_ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<GQL_MutationLoginArgs, 'input'>>,
  register?: Resolver<Maybe<GQL_ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<GQL_MutationRegisterArgs, 'input'>>,
  removeArticle?: Resolver<Maybe<GQL_ResolversTypes['removeArticleResponse']>, ParentType, ContextType, RequireFields<GQL_MutationRemoveArticleArgs, 'id' | 'reqID'>>,
  updateAcc?: Resolver<Maybe<GQL_ResolversTypes['UpdateAccResponse']>, ParentType, ContextType, RequireFields<GQL_MutationUpdateAccArgs, 'input'>>,
};

export type GQL_NewArticleResponseResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['newArticleResponse'] = GQL_ResolversParentTypes['newArticleResponse']> = {
  success?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>,
  articleID?: Resolver<Maybe<GQL_ResolversTypes['ID']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['ErrorFormat']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_QueryResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['Query'] = GQL_ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  allArticles?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['Article']>>>, ParentType, ContextType>,
  allUsers?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['User']>>>, ParentType, ContextType>,
  articleByID?: Resolver<Maybe<GQL_ResolversTypes['Article']>, ParentType, ContextType, RequireFields<GQL_QueryArticleByIdArgs, 'id'>>,
  findArticle?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['Article']>>>, ParentType, ContextType, RequireFields<GQL_QueryFindArticleArgs, never>>,
  findUser?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<GQL_QueryFindUserArgs, 'input'>>,
  isUserRegistered?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<GQL_QueryIsUserRegisteredArgs, 'email'>>,
  userArticles?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['Article']>>>, ParentType, ContextType>,
  userById?: Resolver<Maybe<GQL_ResolversTypes['User']>, ParentType, ContextType, RequireFields<GQL_QueryUserByIdArgs, 'id'>>,
};

export type GQL_RemoveArticleResponseResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['removeArticleResponse'] = GQL_ResolversParentTypes['removeArticleResponse']> = {
  success?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['ErrorFormat']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_UpdateAccResponseResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['UpdateAccResponse'] = GQL_ResolversParentTypes['UpdateAccResponse']> = {
  success?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['ErrorFormat']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_UserResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['User'] = GQL_ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<GQL_ResolversTypes['ID']>, ParentType, ContextType>,
  fullName?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  password?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  isGoogle?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>,
  googleID?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<GQL_ResolversTypes['Date']>, ParentType, ContextType>,
  articles?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['Article']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_Resolvers<ContextType = any> = {
  Article?: GQL_ArticleResolvers<ContextType>,
  AuthResponse?: GQL_AuthResponseResolvers<ContextType>,
  Date?: GraphQLScalarType,
  editArticleResponse?: GQL_EditArticleResponseResolvers<ContextType>,
  ErrorFormat?: GQL_ErrorFormatResolvers<ContextType>,
  Mutation?: GQL_MutationResolvers<ContextType>,
  newArticleResponse?: GQL_NewArticleResponseResolvers<ContextType>,
  Query?: GQL_QueryResolvers<ContextType>,
  removeArticleResponse?: GQL_RemoveArticleResponseResolvers<ContextType>,
  UpdateAccResponse?: GQL_UpdateAccResponseResolvers<ContextType>,
  User?: GQL_UserResolvers<ContextType>,
};



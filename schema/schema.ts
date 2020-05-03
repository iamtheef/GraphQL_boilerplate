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
  author?: Maybe<GQL_User>;
};

export type GQL_ArticleQueryInput = {
  keywords?: Maybe<Scalars['String']>;
  authorID?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type GQL_AuthResponse = {
   __typename?: 'AuthResponse';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<GQL_ErrorFormat>>>;
};

export type GQL_Body = {
  title: Scalars['String'];
  body: Scalars['String'];
};

export type GQL_Changes = {
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
  deleteAcc?: Maybe<GQL_UpdateAccResponse>;
  editArticle?: Maybe<GQL_EditArticleResponse>;
  login?: Maybe<GQL_AuthResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  register?: Maybe<GQL_AuthResponse>;
  removeArticle?: Maybe<GQL_RemoveArticleResponse>;
  updateAcc?: Maybe<GQL_UpdateAccResponse>;
};


export type GQL_MutationCreateArticleArgs = {
  input?: Maybe<GQL_Body>;
};


export type GQL_MutationDeleteAccArgs = {
  id?: Maybe<Scalars['String']>;
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

export type GQL_PageInfo = {
   __typename?: 'PageInfo';
  nodes?: Maybe<Array<Maybe<GQL_Article>>>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  totalNodes: Scalars['Int'];
  numberOfPages: Scalars['Int'];
};

export type GQL_PageSpecs = {
  nodesPerPage: Scalars['Int'];
  pageNumber: Scalars['Int'];
  sorting?: Maybe<Scalars['Boolean']>;
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
  allArticles?: Maybe<GQL_PageInfo>;
  allUsers?: Maybe<Array<Maybe<GQL_User>>>;
  articleByID?: Maybe<GQL_Article>;
  findArticle?: Maybe<GQL_PageInfo>;
  findUser?: Maybe<Array<Maybe<GQL_User>>>;
  isUserRegistered?: Maybe<Scalars['Boolean']>;
  me?: Maybe<GQL_User>;
  publicFeed?: Maybe<Array<Maybe<GQL_Article>>>;
  userById?: Maybe<GQL_User>;
  userFeed?: Maybe<Array<Maybe<GQL_Article>>>;
};


export type GQL_QueryAllArticlesArgs = {
  pageSpecs: GQL_PageSpecs;
};


export type GQL_QueryArticleByIdArgs = {
  id: Scalars['ID'];
};


export type GQL_QueryFindArticleArgs = {
  input?: Maybe<GQL_ArticleQueryInput>;
  pageSpecs: GQL_PageSpecs;
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
  email?: Maybe<Scalars['String']>;
  isGoogle?: Maybe<Scalars['Boolean']>;
  googleID?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  articles?: Maybe<Array<Maybe<GQL_Article>>>;
  isAdmin?: Maybe<Scalars['Boolean']>;
};

export type GQL_UserQueryInput = {
  fullName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  googleID?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type GQL_UserUpdates = {
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
  pageSpecs: GQL_PageSpecs,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  PageInfo: ResolverTypeWrapper<GQL_PageInfo>,
  Article: ResolverTypeWrapper<GQL_Article>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  User: ResolverTypeWrapper<GQL_User>,
  ArticleQueryInput: GQL_ArticleQueryInput,
  UserQueryInput: GQL_UserQueryInput,
  Mutation: ResolverTypeWrapper<{}>,
  Body: GQL_Body,
  newArticleResponse: ResolverTypeWrapper<GQL_NewArticleResponse>,
  ErrorFormat: ResolverTypeWrapper<GQL_ErrorFormat>,
  UpdateAccResponse: ResolverTypeWrapper<GQL_UpdateAccResponse>,
  Changes: GQL_Changes,
  editArticleResponse: ResolverTypeWrapper<GQL_EditArticleResponse>,
  LoginInput: GQL_LoginInput,
  AuthResponse: ResolverTypeWrapper<GQL_AuthResponse>,
  RegisterInput: GQL_RegisterInput,
  removeArticleResponse: ResolverTypeWrapper<GQL_RemoveArticleResponse>,
  UserUpdates: GQL_UserUpdates,
  Password: GQL_Password,
};

/** Mapping between all available schema types and the resolvers parents */
export type GQL_ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  pageSpecs: GQL_PageSpecs,
  Int: Scalars['Int'],
  Boolean: Scalars['Boolean'],
  PageInfo: GQL_PageInfo,
  Article: GQL_Article,
  ID: Scalars['ID'],
  Date: Scalars['Date'],
  User: GQL_User,
  ArticleQueryInput: GQL_ArticleQueryInput,
  UserQueryInput: GQL_UserQueryInput,
  Mutation: {},
  Body: GQL_Body,
  newArticleResponse: GQL_NewArticleResponse,
  ErrorFormat: GQL_ErrorFormat,
  UpdateAccResponse: GQL_UpdateAccResponse,
  Changes: GQL_Changes,
  editArticleResponse: GQL_EditArticleResponse,
  LoginInput: GQL_LoginInput,
  AuthResponse: GQL_AuthResponse,
  RegisterInput: GQL_RegisterInput,
  removeArticleResponse: GQL_RemoveArticleResponse,
  UserUpdates: GQL_UserUpdates,
  Password: GQL_Password,
};

export type GQL_ArticleResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['Article'] = GQL_ResolversParentTypes['Article']> = {
  id?: Resolver<Maybe<GQL_ResolversTypes['ID']>, ParentType, ContextType>,
  authorID?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  body?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<GQL_ResolversTypes['Date']>, ParentType, ContextType>,
  author?: Resolver<Maybe<GQL_ResolversTypes['User']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_AuthResponseResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['AuthResponse'] = GQL_ResolversParentTypes['AuthResponse']> = {
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
  deleteAcc?: Resolver<Maybe<GQL_ResolversTypes['UpdateAccResponse']>, ParentType, ContextType, RequireFields<GQL_MutationDeleteAccArgs, never>>,
  editArticle?: Resolver<Maybe<GQL_ResolversTypes['editArticleResponse']>, ParentType, ContextType, RequireFields<GQL_MutationEditArticleArgs, 'id' | 'changes'>>,
  login?: Resolver<Maybe<GQL_ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<GQL_MutationLoginArgs, 'input'>>,
  logout?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>,
  register?: Resolver<Maybe<GQL_ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<GQL_MutationRegisterArgs, 'input'>>,
  removeArticle?: Resolver<Maybe<GQL_ResolversTypes['removeArticleResponse']>, ParentType, ContextType, RequireFields<GQL_MutationRemoveArticleArgs, 'id'>>,
  updateAcc?: Resolver<Maybe<GQL_ResolversTypes['UpdateAccResponse']>, ParentType, ContextType, RequireFields<GQL_MutationUpdateAccArgs, 'input'>>,
};

export type GQL_NewArticleResponseResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['newArticleResponse'] = GQL_ResolversParentTypes['newArticleResponse']> = {
  success?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>,
  articleID?: Resolver<Maybe<GQL_ResolversTypes['ID']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['ErrorFormat']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_PageInfoResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['PageInfo'] = GQL_ResolversParentTypes['PageInfo']> = {
  nodes?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['Article']>>>, ParentType, ContextType>,
  hasNextPage?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>,
  hasPreviousPage?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>,
  totalNodes?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>,
  numberOfPages?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_QueryResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['Query'] = GQL_ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  allArticles?: Resolver<Maybe<GQL_ResolversTypes['PageInfo']>, ParentType, ContextType, RequireFields<GQL_QueryAllArticlesArgs, 'pageSpecs'>>,
  allUsers?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['User']>>>, ParentType, ContextType>,
  articleByID?: Resolver<Maybe<GQL_ResolversTypes['Article']>, ParentType, ContextType, RequireFields<GQL_QueryArticleByIdArgs, 'id'>>,
  findArticle?: Resolver<Maybe<GQL_ResolversTypes['PageInfo']>, ParentType, ContextType, RequireFields<GQL_QueryFindArticleArgs, 'pageSpecs'>>,
  findUser?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<GQL_QueryFindUserArgs, 'input'>>,
  isUserRegistered?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<GQL_QueryIsUserRegisteredArgs, 'email'>>,
  me?: Resolver<Maybe<GQL_ResolversTypes['User']>, ParentType, ContextType>,
  publicFeed?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['Article']>>>, ParentType, ContextType>,
  userById?: Resolver<Maybe<GQL_ResolversTypes['User']>, ParentType, ContextType, RequireFields<GQL_QueryUserByIdArgs, 'id'>>,
  userFeed?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['Article']>>>, ParentType, ContextType>,
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
  email?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  isGoogle?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>,
  googleID?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<GQL_ResolversTypes['Date']>, ParentType, ContextType>,
  articles?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['Article']>>>, ParentType, ContextType>,
  isAdmin?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>,
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
  PageInfo?: GQL_PageInfoResolvers<ContextType>,
  Query?: GQL_QueryResolvers<ContextType>,
  removeArticleResponse?: GQL_RemoveArticleResponseResolvers<ContextType>,
  UpdateAccResponse?: GQL_UpdateAccResponseResolvers<ContextType>,
  User?: GQL_UserResolvers<ContextType>,
};



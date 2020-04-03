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

export type GQL_AuthResponse = {
   __typename?: 'AuthResponse';
  token?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<GQL_ErrorFormat>>>;
};

export type GQL_Client = {
   __typename?: 'Client';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
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
  addClient?: Maybe<GQL_Client>;
  deleteAcc?: Maybe<Scalars['Boolean']>;
  login?: Maybe<GQL_AuthResponse>;
  register?: Maybe<GQL_AuthResponse>;
  updateAcc?: Maybe<GQL_UpdateAccResponse>;
};


export type GQL_MutationAddClientArgs = {
  name: Scalars['String'];
  age: Scalars['Int'];
  id: Scalars['ID'];
};


export type GQL_MutationDeleteAccArgs = {
  id?: Maybe<Scalars['String']>;
};


export type GQL_MutationLoginArgs = {
  input: GQL_LoginInput;
};


export type GQL_MutationRegisterArgs = {
  input?: Maybe<GQL_RegisterInput>;
};


export type GQL_MutationUpdateAccArgs = {
  input: GQL_UserUpdates;
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
  client?: Maybe<GQL_Client>;
  clients: Array<GQL_Client>;
  findUser?: Maybe<Array<Maybe<GQL_User>>>;
  isUserRegistered?: Maybe<Scalars['Boolean']>;
  userById?: Maybe<GQL_User>;
  users?: Maybe<Array<Maybe<GQL_User>>>;
};


export type GQL_QueryClientArgs = {
  id: Scalars['ID'];
};


export type GQL_QueryFindUserArgs = {
  input: GQL_UserQueryInput;
};


export type GQL_QueryIsUserRegisteredArgs = {
  email: Scalars['String'];
};


export type GQL_QueryUserByIdArgs = {
  id: Scalars['String'];
};

export type GQL_RegisterInput = {
  fullName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
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
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Client: ResolverTypeWrapper<GQL_Client>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  UserQueryInput: GQL_UserQueryInput,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  User: ResolverTypeWrapper<GQL_User>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Mutation: ResolverTypeWrapper<{}>,
  LoginInput: GQL_LoginInput,
  AuthResponse: ResolverTypeWrapper<GQL_AuthResponse>,
  ErrorFormat: ResolverTypeWrapper<GQL_ErrorFormat>,
  RegisterInput: GQL_RegisterInput,
  UserUpdates: GQL_UserUpdates,
  Password: GQL_Password,
  UpdateAccResponse: ResolverTypeWrapper<GQL_UpdateAccResponse>,
};

/** Mapping between all available schema types and the resolvers parents */
export type GQL_ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  ID: Scalars['ID'],
  Client: GQL_Client,
  Int: Scalars['Int'],
  UserQueryInput: GQL_UserQueryInput,
  Date: Scalars['Date'],
  User: GQL_User,
  Boolean: Scalars['Boolean'],
  Mutation: {},
  LoginInput: GQL_LoginInput,
  AuthResponse: GQL_AuthResponse,
  ErrorFormat: GQL_ErrorFormat,
  RegisterInput: GQL_RegisterInput,
  UserUpdates: GQL_UserUpdates,
  Password: GQL_Password,
  UpdateAccResponse: GQL_UpdateAccResponse,
};

export type GQL_AuthResponseResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['AuthResponse'] = GQL_ResolversParentTypes['AuthResponse']> = {
  token?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  success?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['ErrorFormat']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_ClientResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['Client'] = GQL_ResolversParentTypes['Client']> = {
  id?: Resolver<GQL_ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  age?: Resolver<Maybe<GQL_ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface GQL_DateScalarConfig extends GraphQLScalarTypeConfig<GQL_ResolversTypes['Date'], any> {
  name: 'Date'
}

export type GQL_ErrorFormatResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['ErrorFormat'] = GQL_ResolversParentTypes['ErrorFormat']> = {
  path?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  message?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_MutationResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['Mutation'] = GQL_ResolversParentTypes['Mutation']> = {
  _?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  addClient?: Resolver<Maybe<GQL_ResolversTypes['Client']>, ParentType, ContextType, RequireFields<GQL_MutationAddClientArgs, 'name' | 'age' | 'id'>>,
  deleteAcc?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<GQL_MutationDeleteAccArgs, never>>,
  login?: Resolver<Maybe<GQL_ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<GQL_MutationLoginArgs, 'input'>>,
  register?: Resolver<Maybe<GQL_ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<GQL_MutationRegisterArgs, never>>,
  updateAcc?: Resolver<Maybe<GQL_ResolversTypes['UpdateAccResponse']>, ParentType, ContextType, RequireFields<GQL_MutationUpdateAccArgs, 'input'>>,
};

export type GQL_QueryResolvers<ContextType = any, ParentType extends GQL_ResolversParentTypes['Query'] = GQL_ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>,
  client?: Resolver<Maybe<GQL_ResolversTypes['Client']>, ParentType, ContextType, RequireFields<GQL_QueryClientArgs, 'id'>>,
  clients?: Resolver<Array<GQL_ResolversTypes['Client']>, ParentType, ContextType>,
  findUser?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<GQL_QueryFindUserArgs, 'input'>>,
  isUserRegistered?: Resolver<Maybe<GQL_ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<GQL_QueryIsUserRegisteredArgs, 'email'>>,
  userById?: Resolver<Maybe<GQL_ResolversTypes['User']>, ParentType, ContextType, RequireFields<GQL_QueryUserByIdArgs, 'id'>>,
  users?: Resolver<Maybe<Array<Maybe<GQL_ResolversTypes['User']>>>, ParentType, ContextType>,
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GQL_Resolvers<ContextType = any> = {
  AuthResponse?: GQL_AuthResponseResolvers<ContextType>,
  Client?: GQL_ClientResolvers<ContextType>,
  Date?: GraphQLScalarType,
  ErrorFormat?: GQL_ErrorFormatResolvers<ContextType>,
  Mutation?: GQL_MutationResolvers<ContextType>,
  Query?: GQL_QueryResolvers<ContextType>,
  UpdateAccResponse?: GQL_UpdateAccResponseResolvers<ContextType>,
  User?: GQL_UserResolvers<ContextType>,
};



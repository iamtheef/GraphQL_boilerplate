import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Client = {
   __typename?: 'Client';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
};

export type ErrorFormat = {
   __typename?: 'ErrorFormat';
  path?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  token?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<ErrorFormat>>>;
};

export type Mutation = {
   __typename?: 'Mutation';
  /** @deprecated Field no longer supported */
  _?: Maybe<Scalars['String']>;
  addClient?: Maybe<Client>;
  login?: Maybe<LoginResponse>;
  register?: Maybe<RegistrationResponse>;
};


export type MutationAddClientArgs = {
  name: Scalars['String'];
  age: Scalars['Int'];
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input?: Maybe<RegisterInput>;
};

export type Query = {
   __typename?: 'Query';
  /** @deprecated Field no longer supported */
  _?: Maybe<Scalars['String']>;
  client?: Maybe<Client>;
  clients: Array<Client>;
  isUserRegistered?: Maybe<Scalars['Boolean']>;
  user?: Maybe<Array<Maybe<User>>>;
  users: Array<User>;
};


export type QueryClientArgs = {
  id: Scalars['ID'];
};


export type QueryIsUserRegisteredArgs = {
  email: Scalars['String'];
};


export type QueryUserArgs = {
  input: UserQueryInput;
};

export type RegisterInput = {
  fullName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type RegistrationResponse = {
   __typename?: 'RegistrationResponse';
  token?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<ErrorFormat>>>;
};

export type User = {
   __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  fullName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  isGoogle?: Maybe<Scalars['Boolean']>;
  googleID?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
};

export type UserQueryInput = {
  id?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  googleID?: Maybe<Scalars['String']>;
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
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Client: ResolverTypeWrapper<Client>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  UserQueryInput: UserQueryInput,
  User: ResolverTypeWrapper<User>,
  Mutation: ResolverTypeWrapper<{}>,
  LoginInput: LoginInput,
  LoginResponse: ResolverTypeWrapper<LoginResponse>,
  ErrorFormat: ResolverTypeWrapper<ErrorFormat>,
  RegisterInput: RegisterInput,
  RegistrationResponse: ResolverTypeWrapper<RegistrationResponse>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  ID: Scalars['ID'],
  Client: Client,
  Int: Scalars['Int'],
  Boolean: Scalars['Boolean'],
  UserQueryInput: UserQueryInput,
  User: User,
  Mutation: {},
  LoginInput: LoginInput,
  LoginResponse: LoginResponse,
  ErrorFormat: ErrorFormat,
  RegisterInput: RegisterInput,
  RegistrationResponse: RegistrationResponse,
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ErrorFormatResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorFormat'] = ResolversParentTypes['ErrorFormat']> = {
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ErrorFormat']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  addClient?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<MutationAddClientArgs, 'name' | 'age' | 'id'>>,
  login?: Resolver<Maybe<ResolversTypes['LoginResponse']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>,
  register?: Resolver<Maybe<ResolversTypes['RegistrationResponse']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, never>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<QueryClientArgs, 'id'>>,
  clients?: Resolver<Array<ResolversTypes['Client']>, ParentType, ContextType>,
  isUserRegistered?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryIsUserRegisteredArgs, 'email'>>,
  user?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryUserArgs, 'input'>>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
};

export type RegistrationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegistrationResponse'] = ResolversParentTypes['RegistrationResponse']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['ErrorFormat']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  isGoogle?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  googleID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Client?: ClientResolvers<ContextType>,
  ErrorFormat?: ErrorFormatResolvers<ContextType>,
  LoginResponse?: LoginResponseResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  RegistrationResponse?: RegistrationResponseResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

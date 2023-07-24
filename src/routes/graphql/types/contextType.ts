import DataLoader from 'dataloader';
import { PrismaClient, Profile } from '@prisma/client';

import { MemberType } from './memberTypeType.js';
import { Post } from './postType.js';
import { User } from './userType.js';

export type Context = {
  prisma: PrismaClient;
  loader: Loader;
};

type Loader = {
  user: DataLoader<string, User | undefined, string>;
  profile: DataLoader<string, Profile | undefined, string>;
  post: DataLoader<string, Post | undefined, string>;
  member: DataLoader<string, MemberType | undefined, string>;
};
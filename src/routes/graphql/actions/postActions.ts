import { Context } from '../types/contextType.js';
import { PostDTO } from '../types/postType.js';

const getPosts = async ({ prisma }: Context) => {
  return await prisma.post.findMany();
};

const getPostsByAuthorId = async (id: string, { loader }: Context) => {
  return await loader.post.load(id);
};

const getPostById = async (id: string, { prisma }: Context) => {
  return await prisma.post.findFirst({ where: { id } });
};

const createPost = async (post: PostDTO, { prisma }: Context) => {
  return await prisma.post.create({ data: post });
};

const updatePost = async (id: string, post: Partial<PostDTO>, { prisma }: Context) => {
  return await prisma.post.update({
    where: {
      id,
    },
    data: post,
  });
};

const deletePost = async (id: string, { prisma }: Context) => {
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
    return true;
  } catch {
    return false;
  }
};

export { createPost, deletePost, getPostById, getPosts, getPostsByAuthorId, updatePost };
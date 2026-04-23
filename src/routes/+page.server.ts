import { readPosts } from '$lib/server/posts-store';

export const load = async () => {
	const postsAll = await readPosts();
	const now = Date.now();
	const posts = postsAll.filter((p) => Date.parse(p.expiresAt) > now);
	return { posts };
};


import axios, { AxiosResponse } from 'axios';
export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
}
export interface PostsResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
}



export const fetchPosts = async (): Promise<PostsResponse | undefined> => {
    try {
        const response: AxiosResponse<PostsResponse> = await axios.get<PostsResponse>('https://dummyjson.com/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return undefined; // or handle error as needed
    }
};

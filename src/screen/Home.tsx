import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Post, fetchPosts } from '../service';
import { Card } from '../component';

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  `;


export const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const postData = async () => {
        let response = await fetchPosts();
        setPosts((response?.posts as Post[])?.slice(0, 10))
    }

    useEffect(() => {
        postData()
    }, []);
    return (
        <PostContainer>
            {(posts as Post[])?.map((item: Post) => (
                <Card post={item} />
            ))}
        </PostContainer>
    )
}
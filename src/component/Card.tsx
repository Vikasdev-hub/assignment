import { useState } from 'react';
import styled from 'styled-components';
import { Popup } from './Popup';
import { Post } from '../service';


const PostCard = styled.div`
  width: 22%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: aliceblue;
  border-radius : 5px;
`;

const StyledButton = styled.button`
    width: 117px;
    height: 28px;
    border: none;
    border-radius: 5px;
    bottom : 5px;
    postion :relative   
`

const CardBody = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom:30px;
  height: 53%;
`;

const CardTitle = styled.h2`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    height:46px

    `;

type UserPost = {
    post: Post
}

export const Card = (props: UserPost) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    return (
        <PostCard key={props?.post?.id}>
            <CardTitle>{props?.post?.title}</CardTitle>
            <CardBody>{props?.post?.body}</CardBody>
            <div> <StyledButton onClick={togglePopup}>User Info</StyledButton></div>

            {isOpen && (
                <Popup onClose={togglePopup} isOpen={isOpen} id={props?.post?.userId} />
            )}
        </PostCard>
    );
};

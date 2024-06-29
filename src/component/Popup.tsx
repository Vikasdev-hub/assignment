// Popup.tsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { User, fetchUser } from '../service';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const PopupCss = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    height: 230px;
    width: 369px;
   `;

const PopupContent = styled.div`
   text-align: center;
   margin-top: 16px;
`;

const Heading = styled.div`
   display: flex;
   justify-content: space-between;
`;

const Ptag = styled.p`
  width: 100%;
  text-align: center;
`;

const PrTag = styled.p`
  text-align: right;
`;


interface Name {
    readonly firstName: string;
    readonly lastName: string;
}
export const Popup: React.FC<PopupProps> = (props) => {
    const [userInfo, setUserInfo] = useState<User | string>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                const user: User = await fetchUser(props.id);

                if (user) {
                    setUserInfo(user);
                } else {
                    setUserInfo('User not found');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUserInfo('Error fetching user');
            } finally {
                setLoading(false);
            }
        };

        if (props.isOpen) {
            fetchUserInfo();
        }
    }, [props.isOpen, props.id]);

    if (!props.isOpen) return null;

    return (
        <PopupOverlay >
            <PopupCss>
                <Heading>
                    <h3>User Info</h3>
                    <PrTag onClick={props.onClose}>x</PrTag>
                </Heading>
                <PopupContent>
                    {loading ? (
                        <Ptag>Loading...</Ptag>
                    ) : (
                        userInfo === null ? (
                            <Ptag>Loading...</Ptag>
                        ) : (
                            <>
                                <Ptag>First Name : {(userInfo as User)?.firstName}</Ptag>
                                <Ptag>Last Name : {(userInfo as User)?.lastName}</Ptag>
                            </>
                        )
                    )}
                </PopupContent>
            </PopupCss>
        </PopupOverlay>
    );
};

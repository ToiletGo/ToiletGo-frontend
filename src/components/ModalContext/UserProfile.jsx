import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../../api/axios.js';
import { useAuth } from '../../hooks/useAuth';
import pointIcon from '../../assets/icon/point.svg';
import dropletHalf from '../../assets/icon/droplet_half.svg';
import defaultProfile from '../../assets/icon/default_profile.svg';

const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    height: 700px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const ProfileImg = styled.img`
    width: 80px;
    height: 80px;
`;

const Name = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    gap: 5px;
    margin-bottom: 10px;
`;

const ChangeBtn = styled.div`
    font-size: 16px;
    padding: 5px 10px;
    border-radius: 8px;
    background-color: #4a95e5;
    color: white;
    cursor: pointer;
`;

const Point = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Trust = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
`;

const UserProfile = () => {
    const { userId } = useAuth();
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        axios.post(`/api/profile`, 
                { userId: userId }, 
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(res => {
                setProfile(res.data);
            })
            .catch(error => {
                console.error('유저 프로필 불러오기 실패:', error);
            });
    }, []);

    return (
        <Wrapper>
            <h2>프로필</h2>
            <Container>
                <ProfileImg src={defaultProfile} />
                <Name>
                    {profile.userName || '성유123'}
                    <ChangeBtn onClick={() => alert('닉네임 변경')}>닉네임 변경</ChangeBtn>
                </Name>
                <Point>
                    <Icon src={pointIcon} alt="gift" />
                    <div>{profile.userPoint || 3000}</div>
                </Point>
                <Trust>
                    <Icon src={dropletHalf} alt="trust" />
                    <div>{profile.userTrust || 5}</div>
                </Trust>
            </Container>
        </Wrapper>
    )
}

export default UserProfile;
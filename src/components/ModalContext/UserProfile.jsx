import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../../api/axios.js';
import { useAuth } from '../../hooks/useAuth';
import pointIcon from '../../assets/icon/point.svg';

const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    height: 700px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Name = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
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

const Icon = styled.img`
    width: 20px;
    height: 20px;
`;

const UserProfile = () => {
    const { user } = useAuth();
    const [nickname, setNickname] = useState('');
    const [point, setPoint] = useState(0);

    useEffect(() => {
        if (!user) return;
        console.log('유저 프로필 불러오기:', user);
        axios.get(`/api/profile/${user.userid}`)
            .then(res => {
                setNickname(res.data.name);
                setPoint(res.data.point);
            })
            .catch(error => {
                console.error('유저 프로필 불러오기 실패:', error);
            });
    }, [user]);

    return (
        <Wrapper>
            <h2>프로필</h2>
            <Container >
                <Name>
                    {nickname}
                    <ChangeBtn onClick={() => alert('닉네임 변경 기능은 아직 구현되지 않았습니다.')}>닉네임 변경</ChangeBtn>
                </Name>
                <Point>
                    <Icon src={pointIcon} alt="gift" />
                    <div>{point}</div>
                </Point>
            </Container>
        </Wrapper>
    )
}

export default UserProfile;
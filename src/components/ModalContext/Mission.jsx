import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth.js';
import axios from '../../api/axios.js';
import pointIcon from '../../assets/icon/point.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 700px;
`;

const Container = styled.div`
  flex: 1;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow-y: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
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

const Description = styled.div`
  font-size: 14px;
`;

const Progress = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`;

const ProgressText = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  line-height: 16px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ progress }) => (progress > 40 ? '#fff' : '#777')};
  pointer-events: none;
`;

const Mission = () => {
    const { userId } = useAuth();
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        const token =
        localStorage.getItem('token') || sessionStorage.getItem('token');

        axios
        .post(
            '/api/missions/get',
            { userId },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
            setMissions(res.data || []);
        })
        .catch((err) => {
            console.error('미션 목록 받아오기 실패', err);
            setMissions([]); // 실패 시 빈 리스트
        });
    }, [userId]);

    return (
        <Wrapper>
        <h2>미션</h2>
        <Container>
            {missions.length === 0 ? (
                <div style={{ padding: 20, textAlign: 'center' }}>
                    현재 진행 중인 미션이 없습니다.
                </div>
            ) : (
            missions.map((m) => {
                const progress = m.mission_progress === 99 ? 100 : m.mission_progress;
                return (
                    <Row key={m.missionNo}>
                        <Header>
                            <Name>{m.missionName}</Name>
                            <Point>
                                <Icon src={pointIcon} alt="point" />
                                <div>{m.point}</div>
                            </Point>
                        </Header>
                        <Description>{m.description}</Description>
                        <Progress>
                            <progress max="100" value=
                                {m.progress==99 ? 100 : m.progress} 
                            />
                            <ProgressText progress={m.progress}>
                                {m.progress==99 ? 100 : m.progress}%
                            </ProgressText>
                        </Progress>
                    </Row>
                );
            })
            )}
        </Container>
        </Wrapper>
    );
};

export default Mission;

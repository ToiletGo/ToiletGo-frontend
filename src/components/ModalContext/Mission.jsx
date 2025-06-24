import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth.js';
import axios from '../../api/axios.js';
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
    margin-bottom: 5px;
`;

const Point = styled.div`
    display: flex;
    justify-content: center;
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
`;

const ProgressText = styled.span`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: ${({progress}) => (progress>40 ? '#fff' : '#777')};
    pointer-events: none;
`;

const Mission = () => {
    const missionList = [
        {
            mission_no: 11,
            mission_id: 1, 
            mission_name: '리뷰 남기기', 
            description: '화장실 이용 리뷰를 5개 남겨주세요.',
            point: 50, 
            user_id: 2,
            mission_progress: 20, 
            isCompleted: false,
            completed_at: null,
        },
        {
            mission_no: 12,
            mission_id: 2, 
            mission_name: '화장실 입문자', 
            description: '최근 이용한 화장실을 하나 등록해주세요.',
            point: 30, 
            user_id: 2,
            mission_progress: 100, 
            isCompleted: true,
            completed_at: '2025-06-06',
        },
        {
            mission_no: 13,
            mission_id: 3, 
            mission_name: '화장실 개척자', 
            description: '화장실을 5개 등록해주세요.',
            point: 50, 
            user_id: 2,
            mission_progress: 20, 
            isCompleted: false,
            completed_at: null,
        },
        {
            mission_no: 14,
            mission_id: 4, 
            mission_name: '나는야 귀한 사람', 
            description: '평점이 3이상인 화장실을 3개 사용하고 리뷰를 남겨주세요.',
            point: 30, 
            user_id: 2,
            mission_progress: 0, 
            isCompleted: false,
            completed_at: null,
        },
        {
            mission_no: 15,
            mission_id: 5, 
            mission_name: '나는 쓸수만 있으면 돼', 
            description: '평점이 3 미만인 화장실을 3개 사용하고 리뷰를 남겨주세요.',
            point: 50, 
            user_id: 2,
            mission_progress: 0, 
            isCompleted: false,
            completed_at: null,
        },
        {
            mission_no: 16,
            mission_id: 6, 
            mission_name: '누구나 화장실은 필요하니까', 
            description: '장애인 화장실이 있는 화장실을 등록해주세요.',
            point: 30, 
            user_id: 2,
            mission_progress: 0, 
            isCompleted: false,
            completed_at: null,
        },
        {
            mission_no: 17,
            mission_id: 7, 
            mission_name: '힘내요 부모님', 
            description: '유아용 의자가 있는 화장실을 등록해주세요.',
            point: 30, 
            user_id: 2,
            mission_progress: 0, 
            isCompleted: false,
            completed_at: null,
        },
        {
            mission_no: 18,
            mission_id: 8, 
            mission_name: '휴지만 쓰면 찝찝하니까...', 
            description: '비데가 있는 화장실을 등록해주세요.',
            point: 30, 
            user_id: 2,
            mission_progress: 0, 
            isCompleted: false,
            completed_at: null,
        },
        {
            mission_no: 19,
            mission_id: 9, 
            mission_name: '난 비데 없으면 안돼~', 
            description: '비데가 있는 화장실에 대한 리뷰 3개를 남겨주세요.',
            point: 60, 
            user_id: 2,
            mission_progress: 0, 
            isCompleted: false,
            completed_at: null,
        },
        {
            mission_no: 20,
            mission_id: 10, 
            mission_name: '공익 제보자', 
            description: '잘못 등록되어있는 화장실을 신고해주세요.',
            point: 100, 
            user_id: 2,
            mission_progress: 0, 
            isCompleted: false,
            completed_at: null,
        },
    ];

    const { userId } = useAuth();
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        axios
            .post(`/api/missions/get`, {
                userId: userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setMissions(missionList);
            })
            .catch((error) => {
                console.log("미션 목록 받아오기 실패: ", error);
                setMissions(missionList);
            })

    }, [])

    return (
        <Wrapper>
            <h2>미션</h2>
            <Container >
                {missions.map((mission) => (
                    <Row key={mission.mission_id}>
                        <Header>
                            <Name>
                                {mission.mission_name}
                            </Name>
                            <Point>
                                <Icon src={pointIcon} alt="gift" />
                                <div>{mission.point}</div>
                            </Point>
                        </Header>
                        <Description>
                            {mission.description}
                        </Description>
                        <Progress>
                            <progress max="100" value=
                                {mission.mission_progress==99 ? 100 : mission.mission_progress} 
                            />
                            <ProgressText progress={mission.mission_progress}>
                                {mission.mission_progress==99 ? 100 : mission.mission_progress}%
                            </ProgressText>
                        </Progress>
                    </Row>
                ))}
            </Container>
        </Wrapper>
    )
}

export default Mission;
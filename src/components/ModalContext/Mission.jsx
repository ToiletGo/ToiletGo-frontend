import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    height: 700px;
    user-select: none;

`;

const MissionWrapper = styled.div`
    display: flex;
    gap: 10px;
    user-select: none;
    margin: 10px 0;
`;


const Mission = () => {
    const tempList = [
        { id: 1, name: '화장실 등록하기', progressCount: 0, goal: 1 },
        { id: 2, name: '리뷰 등록하기', progressCount: 0, goal: 1 },
        { id: 3, name: '화장실 사진 등록하기', progressCount: 0, goal: 1 },
    ];

    const [missionList, setMissionList] = useState(tempList);

    return (
        <Wrapper>
            <h2>미션</h2>
            {missionList.map((mission) => (
                <MissionWrapper key={mission.id}>
                    {mission.name}
                    {mission.progressCount} / {mission.goal}
                </MissionWrapper>
            ))}
        </Wrapper>
    )
}

export default Mission;
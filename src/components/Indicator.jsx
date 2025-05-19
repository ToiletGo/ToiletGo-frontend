import React from 'react'
import styled from 'styled-components';


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 10px;
    gap: 10px;
`;

const BallWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    font-size: 12px;
`;

const Ball = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #4a95e5;
`;

const Indicator = () => {
    return (
        <Wrapper>
            <BallWrapper>
                <Ball style={{backgroundColor:'#e54a4a'}}/>
                나쁨
            </BallWrapper>
            <BallWrapper>
                <Ball style={{backgroundColor:'#f3da1e'}}/>
                평범
            </BallWrapper>
            <BallWrapper>
                <Ball style={{backgroundColor:'#4a95e5'}}/>
                좋음
            </BallWrapper>
        </Wrapper>
    )
}

export default Indicator;
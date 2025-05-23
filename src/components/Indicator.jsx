import styled from 'styled-components';

const Wrapper = styled.div`
    width: 150px;
    height: 50px;
    display: flex;
    position: absolute;
    bottom: 20px;
    right: 20px;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    gap: 10px;
    z-index: 10;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
    user-select: none;
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
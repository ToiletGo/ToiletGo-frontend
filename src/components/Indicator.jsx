import styled from 'styled-components';
import RedPing from '../assets/icon/red_ping.svg';
import YellowPing from '../assets/icon/yellow_ping.svg';
import BluePing from '../assets/icon/blue_ping.svg';

const Wrapper = styled.div`
    display: flex;
    position: absolute;
    bottom: 20px;
    right: 20px;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 50px;
    background-color: white;
    border-radius: 10px;
    padding: 5px;
    gap: 10px;
    z-index: 10;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
`;

const PingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    font-size: 12px;
`;

const Ping = styled.img`
    width: 20px;
    height: 30px;
`;

const Indicator = () => {
    return (
        <Wrapper>
            <PingWrapper>
                <Ping src={RedPing} alt="bad" />
                나쁨
            </PingWrapper>
            <PingWrapper>
                <Ping src={YellowPing} alt="normal" />
                평범
            </PingWrapper>
            <PingWrapper>
                <Ping src={BluePing} alt="good" />
                좋음
            </PingWrapper>
        </Wrapper>
    )
}

export default Indicator;
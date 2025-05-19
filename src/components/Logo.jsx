import styled from 'styled-components';
import wc from '../assets/icon/wc.svg';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 30px;
`;

const Icon = styled.img`
    width: 25px;
    height: 25px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-left: 5px;
    color: #4a95e5;
`;

const Logo = () => {
    return (
        <Wrapper>
            <Icon src={wc} alt="Logo" />
            <Title>ToiletGo</Title>
        </Wrapper>
    )
}

export default Logo;
import styled from 'styled-components';
import wc from '../assets/icon/wc.svg';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
    z-index: 10;
    height: 40px;
    border-radius: 10px;
    background-color: white;
`;

const LogoWrapper = styled.div`
    margin: 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
    background-color: white;
    border-right: 1px solid #4a95e5; 
`;

const Icon = styled.img`
    width: 25px;
    height: 25px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-left: 5px;
    margin-right: 10px;
    color: #4a95e5;
`;

const Search = styled.input`
    width: 200px;
    font-size: 16px;
    border: none;
    background-color: white;
    margin-right: 10px;
`;

const SearchBar = () => {

    return (
        <Wrapper>
            <LogoWrapper>
                <Icon src={wc} alt="Logo" />
                <Title>ToiletGo</Title>
            </LogoWrapper>
            <Search type="text" placeholder="Search..." />
        </Wrapper>
    )
}

export default SearchBar;
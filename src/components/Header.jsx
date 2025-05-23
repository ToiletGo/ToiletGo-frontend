import styled from "styled-components";
import Logo from './Logo';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 1470px;
    top: 20px;
`;

const LeftSide = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
`;

const RightSide = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
`;

const Filter = styled.div`
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
    z-index: 10;
    font-size: 16px;
    background-color: white;
    color: #1779e2;
    user-select: none;
    cursor: pointer;
    :hover {
        background-color: #0f5bb5;
    }
`;

const MyPosition = styled.div`
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #1779e2;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
    z-index: 10;
    font-size: 16px;
    user-select: none;
    cursor: pointer;
    :hover {
        background-color: #0f5bb5;
    }
`;

const Header = () => {
    return (
        <Wrapper>
            <LeftSide>
                <Logo />
                <Filter>필터</Filter>
            </LeftSide>
            <RightSide>
                <MyPosition>현위치</MyPosition>
            </RightSide>
        </Wrapper>
    )
}

export default Header;
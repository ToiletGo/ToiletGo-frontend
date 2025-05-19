import styled from "styled-components";
import Logo from './Logo';
import login from '../assets/icon/login.ico';

const Wrapper = styled.div`
    width: 100%;
`;

const Outer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0px 20px;
    border-bottom: 1px solid #d9d9d9;
`;

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #4a95e5;
    gap: 5px;
    cursor: pointer;
`;

const LoginIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const Header = () => {
    return (
        <Wrapper>
            <Outer>
                <Logo />
                <LoginWrapper>
                    <LoginIcon src={login} alt="Login" onClick={() => alert('로그인 클릭!')} />
                    로그인
                </LoginWrapper>
            </Outer>
        </Wrapper>
    )
}

export default Header;
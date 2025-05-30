import styled from 'styled-components';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import wc from '../assets/icon/wc.svg';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    margin: auto;
`;

const LogoWrapper = styled(NavLink)`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const Icon = styled.img`
    width: 48px;
    height: 48px;
`;

const LogoTitle = styled.div`
    font-size: 48px;
    font-weight: bold;
    margin-left: 5px;
    margin-right: 10px;
    color: #4a95e5;
`;

const LoginWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    border-radius: 15px;
    padding: 20px 50px;
    background-color: #fafafa;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
`;

const Title = styled.h2`
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
`;

const Input = styled.input`
    width: 100%;
    padding: 14px 16px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    box-sizing: border-box;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        border-color: #4a95e5;
        outline: none; 
    }
`;

const StayLogin = styled.label`
    font-size: 14px;
    color: #555;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    cursor: pointer;

    input[type='checkbox'] {
        appearance: none;
        margin: 0;
        width: 16px;
        height: 16px;
        border: 1.5px solid #999;
        border-radius: 50%;
        position: relative;
    }

    input[type='checkbox']::after {
        content: '✔';
        color: white;
        font-size: 12px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -55%);
        display: none;
    }

    input[type='checkbox']:checked {
        background-color: #4a95e5;
        border-color: #4a95e5;
    }

    input[type='checkbox']:checked::after {
        display: block;
    }
`;

const LoginBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #4a95e5;
    color: white;
    border: none;
    border-radius: 8px;
    margin-top: 5px;
    margin-bottom: 20px;
    padding: 10px 0;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
`;

const Links = styled.div`
    font-size: 16px;
    display: flex;
    justify-content: center;
    width: 100%;
    color: #555;
    gap: 10px;
    flex-wrap: wrap;

    a {
        text-decoration: none;
        color: #555;
        padding: 0 6px;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const LoginForm = ({ setIsLoggedIn }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!id || !password) {
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const response = await axios.post('/api/users/login', {
                id,
                password,
            });

            if (response.status === 200) {

                const { userNo, id, nick } = response.data;

                const userData = { userNo, id, nick };

                if (stayLoggedIn) {
                    localStorage.setItem('user', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('user', JSON.stringify(userData));
                }

                setIsLoggedIn(true);
            
                navigate('/');
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <Wrapper>
            <LogoWrapper to="/">
                <Icon src={wc} alt="Logo" />
                <LogoTitle>ToiletGo</LogoTitle>
            </LogoWrapper>
            <LoginWrapper onSubmit={handleSubmit}>
                <Title>로그인</Title>
                <Input
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <Input
                    placeholder="PW"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <StayLogin>
                    <input
                        type="checkbox"
                        checked={stayLoggedIn}
                        onChange={(e) => setStayLoggedIn(e.target.checked)}
                    />
                    로그인 상태 유지
                </StayLogin>
                <LoginBtn type="submit">로그인</LoginBtn>
                <Links>
                    <NavLink to="/findID">아이디 찾기</NavLink>
                    <NavLink to="/findPW">비밀번호 찾기</NavLink>
                    <NavLink to="/signup">회원가입</NavLink>
                </Links>
            </LoginWrapper>
        </Wrapper>
    )
}

export default LoginForm;
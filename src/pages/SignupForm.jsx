import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
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

const SignupWrapper = styled.form`
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

// 입력창 + 버튼 같이 쓰는 경우 wrapper
const InputWithBtn = styled.div`
    position: relative;
    width: 100%;
`;

// 중복확인, 인증하기, 확인 버튼 공통 스타일
const CheckBtn = styled.button`
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    padding: 7px 12px;
    height: auto;
    line-height: 1;
    border: 1px solid #aaa;
    border-radius: 8px;
    background-color: white;
    font-size: 14px;
    font-weight: 600;
    color: #555;
    cursor: pointer;
    margin-top: -8px;

    &:hover {
        background-color: #4a95e5;
        color: white;
        border: none;
    }
`;

// 인증번호 입력창 버튼 묶는 박스 (확인 + 다시 보내기)
const CodeBtnGroup = styled.div`
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
`;

// CodeBtnGroup 안에 있는 버튼 스타일 조정
const CodeBtn = styled(CheckBtn)`
    position: static;
    margin-top: -15px;
    transform: none;
    height: 29px;  // 높이 통일
    padding: 0 12px; // 좌우 여백 통일
    font-size: 14px;
    border: 1px solid #aaa;
    background-color: white;
    color: #555;
    &:hover {
        background-color: #FB4A67;
        color: white;
        border: none;
    }
`;

// 다시 보내기 버튼 (CheckBtn과 거의 같지만 약간 넓게)
const ResendBtn = styled.button`
    padding: 7px 16px;   // 살짝 더 넓은 패딩
    height: auto;
    line-height: 1;
    border: 1px solid #aaa;
    border-radius: 8px;
    background-color: white;
    font-size: 14px;
    font-weight: 600;
    color: #555;
    cursor: pointer;
    margin-top: -15px;

    &:hover {
        background-color: #FB4A67;
        color: white;
        border: none;
    }
`;

// 아이디 확인 메세지
const IdMessage = styled.div`
    font-size: 16px;
    color: ${({ valid }) => (valid ? '#2E8B57' : '#FB4A67')};
    margin-top: -10px;
    margin-bottom: 16px;
    padding-left: 4px;
`;

// 비밀번호 확인 메세지
const PasswordMessage = styled.div`
    font-size: 16px;
    color: ${({ match }) => (match ? '#2E8B57' : '#FB4A67')};
    margin-top: -10px;
    margin-bottom: 16px;
    padding-left: 4px;
`;

const SignupBtn = styled.button`
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

const SignupForm = () => {
    // 아이디 상태 정의
    const [id, setId] = useState('');
    const [idValid, setIdValid] = useState(null); // true/false/null

    // 비밀번호 상태 정의
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // 닉네임 상태 정의
    const [nickname, setNickname] = useState('');
    const [nicknameValid, setNicknameValid] = useState(null);

    const navigate = useNavigate();
    
    // 아이디 중복확인
    const handleCheckId = async () => {
        if (id.trim() === '') return;
    
        try {
        // 서버로 POST 요청 보내서 아이디 중복 확인
        const response = await axios.post('/api/users/check-id', { id: id.trim() });
        
        if (response.data.available) {
            setIdValid(true); // 사용 가능
        } else {
            setIdValid(false); // 사용 불가능
        }
        } catch (error) {
            console.error('아이디 중복확인 오류:', error);
            alert('아이디 중복확인 중 오류가 발생했습니다.');
        }
    };

    // 닉네임 중복확인
    const handleCheckNickname = async () => {
        if (nickname.trim() === '') return;

        try {
            const response = await axios.post('/api/users/check-nick', { nick: nickname });
            setNicknameValid(response.data.available);
        } catch (error) {
            console.error('닉네임 중복확인 에러:', error);
            setNicknameValid(false);
        }
    };

    // 회원가입 유효성 검사 및 제출
    const handleSubmit = async () => {
        // 1. 아이디 중복확인 안했으면 막기
        if (!id || idValid !== true) return alert('아이디 중복확인을 완료해주세요.');

        // 2. 비밀번호 조건
        if (!password || password !== confirmPassword) return alert('비밀번호가 일치하지 않습니다.');

        // 3. 닉네임 중복확인 안했으면 막기
        if (!nickname || nicknameValid !== true) return alert('닉네임 중복확인을 완료해주세요.');

        try {
            const response = await axios.post('/api/users/join', {
                id,
                password,
                nick,
            });
        
            if (response.status === 200) {
                alert('회원가입 완료!');
                navigate('/login');
            }
        } catch (error) {
            console.error('회원가입 에러:', error);
            alert('회원가입이 실패하였습니다.');
        }
    };

    return (
        <Wrapper>
            <LogoWrapper to="/">
                <Icon src={wc} alt="Logo" />
                <LogoTitle>ToiletGo</LogoTitle>
            </LogoWrapper>
            <SignupWrapper>
                <Title>회원가입</Title>

                {/* ✅ 아이디 입력 + 버튼 */}
                <InputWithBtn>
                    <Input
                        placeholder="아이디"
                        value={id}
                        onChange={(e) => {
                            setId(e.target.value);
                            setIdValid(null); // 입력 중엔 메시지 초기화
                        }}
                    />
                    <CheckBtn onClick={handleCheckId}>중복확인</CheckBtn>
                </InputWithBtn>

                {/* ✅ 아이디 중복 확인 메시지 출력 */}
                {id && idValid !== null && (
                    <IdMessage valid={idValid}>
                        {idValid ? '사용 가능한 아이디입니다' : '이미 사용 중인 아이디입니다'}
                    </IdMessage>
                )}

                {/* 비밀번호 */}
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="비밀번호 재입력"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {/* 비밀번호 확인 메시지 출력 */}
                {confirmPassword && (
                    <PasswordMessage match={password === confirmPassword}>
                        {password === confirmPassword
                        ? '사용 가능한 비밀번호입니다'
                        : '입력한 비밀번호와 다릅니다'}
                    </PasswordMessage>
                )}

                {/* 닉네임 */}
                <InputWithBtn>
                    <Input
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(e) => {
                        setNickname(e.target.value);
                        setNicknameValid(null); // 입력 중이면 메시지 초기화
                        }}
                    />
                    <CheckBtn onClick={handleCheckNickname}>중복확인</CheckBtn>
                </InputWithBtn>

                {/* 닉네임 중복 체크 메시지 출력 */}
                {nickname && nicknameValid !== null && (
                <IdMessage valid={nicknameValid}>
                    {nicknameValid ? '사용 가능한 닉네임입니다' : '이미 사용 중인 닉네임입니다'}
                </IdMessage>
                )}

                <SignupBtn>회원가입</SignupBtn>
            </SignupWrapper>
        </Wrapper>
    )
}

export default SignupForm;
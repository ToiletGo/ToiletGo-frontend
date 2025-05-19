import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100%;
`;

const Outer = styled.div`
    display: flex;
    flex-direction: column;
    height: 735px;
    //box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
`;

const BarElement = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 65px;
    height: 65px;
    font-size: 14px;
    font-weight: bold;
    background-color: ${({ selected }) => (selected ? '#4a95e5' : 'white')};
    color: ${({ selected }) => (selected ? 'white' : '#4a95e5')};
    border-bottom: 2px solid #d9d9d9;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
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

const SideBar = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const handleSelect = (index) => {
        setSelectedIndex(index);
    };

    return (
        <Wrapper>
            <Outer>
                <BarElement>
                    <LoginWrapper>
                        <LoginIcon src={login} alt="Login" onClick={() => alert('로그인 클릭!')} />
                        로그인
                    </LoginWrapper>
                </BarElement>
                <BarElement selected={selectedIndex === 1} onClick={() => handleSelect(1)}>
                    <span>화장실</span>
                    <span>찾기</span>
                </BarElement>
                <BarElement selected={selectedIndex === 2} onClick={() => handleSelect(2)}>
                    <span>화장실</span>
                    <span>등록</span>
                </BarElement>
                <BarElement selected={selectedIndex === 3} onClick={() => handleSelect(3)}>
                    미션
                </BarElement>
                <BarElement selected={selectedIndex === 4} onClick={() => handleSelect(4)}>
                    프로필
                </BarElement>
            </Outer>
        </Wrapper>
    )
}

export default SideBar;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MenuModal from './MenuModal';
import axios from '../api/axios';
import { useAuth } from '../hooks/useAuth';

const Wrapper = styled.div`
    position: relative;
    height: 100vh;
    z-index: 20;
    background-color: white;
    box-shadow: 4px 0px 5px -2px rgba(0,0,0,0.16);
`;

const Outer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 735px;
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

const SideBar = () => {
    const { userId, isLoggedIn, logout } = useAuth();
    const [selectedMenu, setSelectedMenu] = useState(0);
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        if (isLoggedIn) {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            try {
                await axios.post(`/logout`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (err) {
                console.warn('서버 로그아웃 실패 (무시):', err);
            } finally {
                logout();
                alert('로그아웃되었습니다.');
            }
        } else {
            navigate('/login');
        }
    };

    const openMenu = (index) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        setSelectedMenu(index);
    };

    const closeMenu = () => {
        setSelectedMenu(0);
    };

    return (
        <>
            <Wrapper>
                <Outer>
                    <BarElement selected={false} onClick={handleLogin}>
                        {isLoggedIn ? '로그아웃' : '로그인'}
                    </BarElement>
                    <BarElement selected={selectedMenu === 1} onClick={() => openMenu(1)}>
                        <span>화장실</span>
                        <span>등록</span>
                    </BarElement>
                    <BarElement selected={selectedMenu === 2} onClick={() => openMenu(2)}>
                        미션
                    </BarElement>
                    <BarElement selected={selectedMenu === 3} onClick={() => openMenu(3)}>
                        <span>선물</span>
                        <span>상점</span>
                    </BarElement>
                    <BarElement selected={selectedMenu === 4} onClick={() => openMenu(4)}>
                        프로필
                    </BarElement>
                    <BarElement selected={selectedMenu === 5} onClick={() => openMenu(5)}>
                        내 선물
                    </BarElement>
                    {userId === "admin" && ( 
                        <BarElement selected={false} onClick={handleReport}>
                            신고 처리
                        </BarElement>
                    )}
                </Outer>
            </Wrapper>
            {selectedMenu !== 0 && (
                <MenuModal selectedMenu={selectedMenu} onClose={closeMenu} />
            )}
        </>
    )
}

export default SideBar;
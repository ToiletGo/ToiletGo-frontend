import styled, { keyframes } from 'styled-components';
import FindToilet from './ModalContext/FindToilet';
import MyReview from './ModalContext/MyReview';
import MyToilet from './ModalContext/MyToilet';
import UserProfile from './ModalContext/UserProfile';
import GiftStore from './ModalContext/GiftStore';
import Mission from './ModalContext/Mission';
import RegisterToilet from './ModalContext/RegisterToilet';
import MyGift from './ModalContext/MyGift';
import leftBtn from '../assets/icon/left_btn.svg';

const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 65px;
    width: 350px;
    height: 100vh;
    background-color: white;
    box-shadow: -2px 0px 5px rgba(0,0,0,0.16);
    z-index: 15;
    animation: ${slideIn} 0.3s ease-out;
`;

const CloseBtn = styled.img`
    position: absolute;
    top: 50%;
    right: -15px;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 20;
`;

const MenuContent = styled.div`
    padding: 0 20px;
`;

const MenuModal = ({ selectedMenu, onClose }) => {
    const renderContent = () => {
        switch (selectedMenu) {
            case 1:
                return <FindToilet />;
            case 2:
                return <RegisterToilet />;
            case 3:
                return <Mission />;
            case 4:
                return <GiftStore />;
            case 5:
                return <UserProfile />;
            case 6:
                return <MyToilet />;
            case 7:
                return <MyReview />;
            case 8:
                return <MyGift />;
            default:
                return null;
        }
    };

    return (
        <Wrapper>
            <CloseBtn onClick={onClose} src={leftBtn} alt="leftBtn" />
            <MenuContent>{renderContent()}</MenuContent>
        </Wrapper>
    );
}

export default MenuModal;
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StarRating from '../components/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from '../api/axios.js';
import wc from '../assets/icon/wc.svg';
import check from '../assets/icon/check.svg';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    top: 0;
    width: 100%;
    height: 55px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    background-color: white;
    box-sizing: border-box;
    z-index: 10;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 24px;
    color: #4a95e5;
    cursor: pointer;
`;

const Icon = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 5px;
`;

const HeaderTitle = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
    pointer-events: none;
`;

const Login = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 11px;
    border: 1px solid #ddd;    
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 1000px;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin-top: 85px;
    padding: 25px;
`;

const Title = styled.div`
    display: inline-block;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

const Rating = styled.span`
    color: #ff5d5d;
    font-size: 16px;
    font-weight: bold;
    margin-right: 4px;
`;

const Count = styled.span`
    color: #888;
    font-size: 14px;
    margin-left: 5px;
`;

const CheckRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin: 10px 0px;
`;

const CheckBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    font-size: 14px;
    gap: 5px;
`;

const CheckBase = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50px;
    background-color: #d9d9d9;
`;

const CheckImg = styled.img`
    width: 30px;
    height: 30px;
`;

const ToiletDetail = () => {
    const { toiletId } = useParams(); // URI 파라미터로부터 toiletId를 가져옴
    const [toilet, setToilet] = useState(null);
    const [showTitle, setShowTitle] = useState(false);
    
    const navigate = useNavigate();

    
    useEffect(() => {
        const id = parseInt(toiletId, 10); // URL param은 string이므로 숫자로 변환
        axios
            .post(`/api/toilet/get`, {
                toiletId: id,
            })
            .then((res) => {
                console.log('화장실 정보:', res.data);
                setToilet(res.data);
            })
            .catch((err) => console.error('화장실 불러오기 실패:', err));
    }, [toiletId]);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // InfoContainer 상단 위치보다 아래로 내려오면 보여줌
            if (scrollY > 85) {
                setShowTitle(true);
            } else {
                setShowTitle(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 테스트용 mock data (API 연결 시 삭제)
    const toilets = [
        {
            toiletId: 1,
            latitude: 37.537375,
            longitude: 127.082,
            buildingName: '중곡 공중화장실',
            rating: 4.2,
            reviewCount: 10,
            toiletStatus: "여 1, 남 1",
            hasDiaperTable: false,
            hasHandicapAccess: true,
            hasBidet: true,
            hasTissue: true,
            note: '중곡역 출구 앞에 위치한 화장실입니다.',
        },
        {
            toiletId: 2,
            latitude: 37.539,
            longitude: 127.085,
            buildingName: '자양 화장실',
            rating: 2.3,
            reviewCount: 20,
            toiletStatus: "여 3, 남 3",
            hasDiaperTable: true,
            hasHandicapAccess: false,
            hasBidet: false,
            hasTissue: false,
            note: '자양동 공원 내 위치',
        },
        {
            toiletId: 3,
            latitude: 37.535,
            longitude: 127.078,
            buildingName: '능동 화장실',
            rating: 1.4,
            reviewCount: 15,
            toiletStatus: "여 4, 남 4",
            hasDiaperTable: true,
            hasHandicapAccess: true,
            hasBidet: true,
            hasTissue: true,
            note: '능동로 도로변에 위치한 넓은 화장실',
        },
    ];
    // setToilet(toilets.filter((toilet) => toilet.toiletId === 1)[0]);

    // 만약 toilet이 아직 로딩 중이라면 로딩 화면을 보여줌
    if (!toilet) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <Wrapper>
            <Header>
                <Logo onClick={() => navigate("/")}>
                    <Icon src={wc} alt="Logo" />
                    ToiletGo
                </Logo>
                <HeaderTitle>
                    {showTitle && (toilet.buildingName || `화장실 ${toilet.toiletId}`)}
                </HeaderTitle>
                <Login onClick={() => navigate("/login")}>로그인</Login>
            </Header>
            <InfoContainer>
                <Title>{toilet.buildingName || `화장실 ${toilet.toiletId}`}</Title>
                <InfoRow>
                    <Rating>{toilet.rating}</Rating>
                    <StarRating rating={toilet.rating} size="16px" />
                    <Count>({toilet.reviewCount || 0}건)</Count>
                </InfoRow>
                <div>{toilet.toiletStatus}</div>
                <CheckRow>
                    <CheckBox>
                        <span>유아용 의자</span>
                        <CheckBase>
                            {toilet.hasDiaperTable && <CheckImg src={check} alt='check' />}
                        </CheckBase>
                    </CheckBox>
                    <CheckBox>
                        <span>장애인 전용</span>
                        <CheckBase>
                            {toilet.hasHandicapAccess && <CheckImg src={check} alt='check' />}
                        </CheckBase>
                    </CheckBox>
                    <CheckBox>
                        <span>비데</span>
                        <CheckBase>
                            {toilet.hasBidet && <CheckImg src={check} alt='check' />}
                        </CheckBase>
                    </CheckBox>
                    <CheckBox>
                        <span>휴지</span>
                        <CheckBase>
                            {toilet.hasTissue && <CheckImg src={check} alt='check' />}
                        </CheckBase>
                    </CheckBox>
                </CheckRow>
                <div>{toilet.note}</div>
            </InfoContainer>
        </Wrapper>
    )
}

export default ToiletDetail;
import styled from 'styled-components';
import StarRating from '../components/StarRating';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #ddd;
    margin-bottom: 30px;
    padding: 18px;
    font-size: 18px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 1000px;
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: 20px;
`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
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
    gap: 10px;
    height: 50px;
    margin: 10px 0px;
`;

const CheckBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
    font-size: 14px;
    gap: 5px;
`;

const CheckBase = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background-color: #d9d9d9;
`;

const CheckImg = styled.img`
    width: 20px;
    height: 20px;
`;

const ToiletDetail = () => {
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

    const toilet = toilets.filter((toilet) => toilet.toiletId === 1)[0];
    console.log(toilet);

    return (
        <Wrapper>
            <Header>
                <span>ToiletGo</span>
                <span>로그인</span>
            </Header>
            <InfoContainer>
                <Title>{toilet.buildingName}</Title>
                <InfoRow>
                    <Rating>{toilet.rating}</Rating>
                    <StarRating rating={toilet.rating} size="16px" />
                    <Count>({toilet.reviewCount}건)</Count>
                    <div></div>
                </InfoRow>
            </InfoContainer>
        </Wrapper>
    )
}

export default ToiletDetail;
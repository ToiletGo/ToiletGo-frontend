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
    //const { buildingName, rating, reviewCount, toiletStatus, hasDiaperTable, hasHandicapAccess, hasBidet, hasTissue, note } = data;
    const buildingName = "건국대학교병원 화장실";
    const rating = 2.5;
    const reviewCount = 20;
    const toiletStatus = "여 1, 남 1";
    const hasDiaperTable = false;
    const hasHandicapAccess = true;
    const hasBidet = true;
    const hastissue = false;
    const note = "화장실 설명입니다. 아무거나 적었어요.";

    return (
        <Wrapper>
            <Header>
                <span>ToiletGo</span>
                <span>로그인</span>
            </Header>
            <InfoContainer>
                <Title>{buildingName}</Title>
                <InfoRow>
                    <Rating>{rating}</Rating>
                    <StarRating rating={rating} size="16px" />
                    <Count>({reviewCount}건)</Count>
                    <div></div>
                </InfoRow>
            </InfoContainer>
        </Wrapper>
    )
}

export default ToiletDetail;
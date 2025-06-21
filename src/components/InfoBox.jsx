import styled from 'styled-components';
import StarRating from './StarRating';
import close from '../assets/icon/close.svg';
import check from '../assets/icon/check.svg';
import rightBtn from '../assets/icon/right_btn.svg';

const Wrapper = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    width: 350px;
    height: 180px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    z-index: 100;
    pointer-events: auto; // CustomOverlay 상에서의 이벤트 활성화
    cursor: default;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const ShowDetailBtn = styled.img`
    width: 15px;
    height: 15px;
`;

const CloseBtn = styled.img`
    width: 18px;
    height: 18px;
    float: right;
    cursor: pointer;
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

export default function InfoBox({ data, onClose, navigate }) {
    const { 
        toiletId, 
        buildingName, 
        rating, 
        reviewCount, 
        toiletStatus, 
        hasDiaperTable, 
        hasHandicapAccess, 
        hasBidet, 
        hasTissue, 
        note } = data;

    return (
        <Wrapper
            onMouseDown={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            <Header>
                <Title onClick={() => navigate(`/toilet/${toiletId}`)}>
                    {buildingName === null ? `화장실 ${toiletId}` : buildingName}
                    <ShowDetailBtn src={rightBtn} alt='rightBtn' />
                </Title>
                <CloseBtn onClick={onClose} src={close} alt='close' />
            </Header>
            <InfoRow>
                <Rating>{rating}</Rating>
                <StarRating rating={rating} size="16px" />
                <Count>({reviewCount === null ? 0 : reviewCount}건)</Count>
            </InfoRow>
            <>
                {toiletStatus}
            </>
            <CheckRow>
                <CheckBox>
                    <span>유아용 의자</span>
                    <CheckBase>
                        {hasDiaperTable && <CheckImg src={check} alt='check' />}
                    </CheckBase>
                </CheckBox>
                <CheckBox>
                    <span>장애인 전용</span>
                    <CheckBase>
                        {hasHandicapAccess && <CheckImg src={check} alt='check' />}
                    </CheckBase>
                </CheckBox>
                <CheckBox>
                    <span>비데</span>
                    <CheckBase>
                        {hasBidet && <CheckImg src={check} alt='check' />}
                    </CheckBase>
                </CheckBox>
                <CheckBox>
                    <span>휴지</span>
                    <CheckBase>
                        {hasTissue && <CheckImg src={check} alt='check' />}
                    </CheckBase>
                </CheckBox>
            </CheckRow>
            <div>{note}</div>
        </Wrapper>
    )
}

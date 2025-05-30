import { useState } from 'react';
import styled from 'styled-components';
import pointIcon from '../../assets/icon/point.svg';
import coffee from '../../assets/images/gift/CoffeeGift.png';
import cake from '../../assets/images/gift/CakeGift.png';
import cu5000 from '../../assets/images/gift/CU5000.png';
import burger from '../../assets/images/gift/BurgerGift.png';
import pizza from '../../assets/images/gift/PizzaGift.png';
import cu10000 from '../../assets/images/gift/CU10000.png';
import cu20000 from '../../assets/images/gift/CU20000.png';

const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    height: 700px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const PointWrapper = styled.div`
    display: flex;
    gap: 5px;
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const GiftWrapper = styled.div`
    display: flex;
    position: relative;
    gap: 20px;
    margin: 10px 0;
`;

const GiftImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: #d9d9d9;
`;

const GiftDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 150px;
    padding: 10px 0;
`;

const DetailRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Point = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
`;

const BuyBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 30px;
    background-color: #4a95e5;
    color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
    cursor: pointer;
    &:disabled {
        background-color: #aaa;
    }
`;


const GiftStore = () => {
    const tempList = [
        { id: 1, name: '스타벅스 아메리카노', image: coffee, cost: 450, isAssigned: false },
        { id: 2, name: '투썸플레이스 조각 치즈 케이크', image: cake, cost: 700, isAssigned: false },
        { id: 3, name: 'CU 5000원 상품권', image: cu5000, cost: 500, isAssigned: false },
        { id: 4, name: '롯데리아 불고기 버거 세트', image: burger, cost: 850, isAssigned: false },
        { id: 5, name: '피자스쿨 콤비네이션 피자', image: pizza, cost: 950, isAssigned: false },
        { id: 6, name: 'CU 10000원 상품권', image: cu10000, cost: 1000, isAssigned: false },
        { id: 7, name: 'CU 20000원 상품권', image: cu20000, cost: 2000, isAssigned: true },
    ];

    const [point, setPoint] = useState(3000);
    const [giftList, setGiftList] = useState(tempList);

    const BuyGift = (gift) => {
        // 포인트가 부족한 경우
        if (point < gift.cost) {
            alert('포인트가 부족합니다.');
            return;
        }

        // 포인트 차감
        setPoint(prev => prev - gift.cost);

        // 해당 상품 제거
        const updatedGiftList = giftList.filter(item => item.id !== gift.id);
        setGiftList(updatedGiftList);

        alert(`${gift.name}을(를) 구매하였습니다.`);
    }

    return (
        <Wrapper>
            <Header>
                <h2>선물 상점</h2>
                <PointWrapper>
                    잔여 포인트:
                    <Icon src={pointIcon} alt="gift" />
                    {point}
                </PointWrapper>
            </Header>
            <ListWrapper>
                {giftList
                    .filter(gift => !gift.isAssigned)
                    .map((gift) => (
                        <GiftWrapper key={gift.id}>
                            <GiftImg src={gift.image} alt={gift.name} />
                            <GiftDetail>
                                {gift.name}
                                <DetailRow>   
                                    <Point>
                                        <Icon src={pointIcon} alt="gift" />
                                        <div>{gift.cost}</div>
                                    </Point>
                                    <BuyBtn disabled={gift.sold} onClick={() => BuyGift(gift)}>
                                        구매
                                    </BuyBtn>
                                </DetailRow>
                            </GiftDetail>
                        </GiftWrapper>
                ))}
            </ListWrapper>
        </Wrapper>
    );
}

export default GiftStore;
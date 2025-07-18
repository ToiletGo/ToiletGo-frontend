import { useEffect, useState } from 'react';
import styled from 'styled-components';
import coffee from '../../assets/images/gift/CoffeeGift.png';
import cake from '../../assets/images/gift/CakeGift.png';
import cu5000 from '../../assets/images/gift/CU5000.png';
import burger from '../../assets/images/gift/BurgerGift.png';
import pizza from '../../assets/images/gift/PizzaGift.png';
import cu10000 from '../../assets/images/gift/CU10000.png';
import cu20000 from '../../assets/images/gift/CU20000.png';
import axios from 'axios';

const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    height: 700px;
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const MyGift = () => {
    const tempList = [
        { id: 1, name: '스타벅스 아메리카노', image: coffee, code: '5132 2240 9874 1470', expiration: '2025-07-24' },
        { id: 2, name: '투썸플레이스 조각 치즈 케이크', image: cake, code: '8112 0027 1671 3347', expiration: '2025-07-24' },
        { id: 3, name: 'CU 5000원 상품권', image: cu5000, cost: 500, code: '2580 6792 9702 5172', expiration: '2025-07-24' },
        { id: 4, name: '롯데리아 불고기 버거 세트', image: burger, cost: 850, code: '3673 7711 8403 0073', expiration: '2025-07-24' },
        { id: 5, name: '피자스쿨 콤비네이션 피자', image: pizza, cost: 950, code: '2498 9874 2194 0004', expiration: '2025-07-24' },
        { id: 6, name: 'CU 10000원 상품권', image: cu10000, cost: 1000, code: '5555 5555 5555 5555', expiration: '2025-07-24' },
        { id: 7, name: 'CU 20000원 상품권', image: cu20000, cost: 2000, code: '6666 6666 6666 6666', expiration: '2025-07-24' },
    ];

    const [giftList, setGiftList] = useState(tempList);

    useEffect(() => {
        axios
            .get(`/api/gifts`)
    }, [])

    return (
        <Wrapper>
            <h2>내 선물</h2>
            <ListWrapper>
                {giftList.map((gift) => (
                    <div key={gift.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                        <img src={gift.image} alt={gift.name} style={{ width: '50px', height: '50px' }} />
                        <div style={{ flexGrow: 1, marginLeft: '10px' }}>
                            <h3>{gift.name}</h3>
                            <p>코드: {gift.code}</p>
                            <p>유효기간: {gift.expiration}</p>
                        </div>
                    </div>
                ))}
            </ListWrapper>
            
        </Wrapper>
    )
}

export default MyGift;
import { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    height: 700px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow-y: auto;
`;

const Row = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
`;

const Name = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const MyToilet = () => {
    useEffect(() => {
        axios.
            axios
            .get(`/api/toilets`)
            .then((res) => {
                renderMarkers(res.data);
            })
            .catch((err) => console.error('화장실 불러오기 실패:', err));
    }, []);

    // 테스트용 데이터
    const toiletList = [
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
    
    return (
        <Wrapper>
            <h2>내 화장실</h2>
            <Container >
                {toiletList.map((toilet) => (
                    <Row key={toilet.toiletId}>
                        <Name>
                            {toilet.buildingName}
                        </Name>
                    </Row>
                ))}
            </Container>
        </Wrapper>
    )
}

export default MyToilet;
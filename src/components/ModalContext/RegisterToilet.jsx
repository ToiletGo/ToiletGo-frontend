import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import axios from '../../api/axios.js';
import { useAuth } from '../../hooks/useAuth.js';
import check from '../../assets/icon/check.svg';
import bluePing from '../../assets/icon/blue_ping.svg';

const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    height: 100vh;
    gap: 10px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 5px 0;
    box-sizing: border-box;
`;

const ShowMapBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    background-color: #4a95e5;
    color: white;
    border: none;
    border-radius: 6px;
    margin-bottom: 10px;
    cursor: pointer;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    height: 50px;
    padding: 0 10px;
    margin: 5px 0 10px;
`;

const ToggleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
    font-size: 14px;
    gap: 5px;
`;

const Toggle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background-color: #d9d9d9;
    cursor: pointer;
`;

const CheckImg = styled.img`
    width: 20px;
    height: 20px;
`;

const DetailInput = styled.textarea`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 93%;
    height: 60px;
    resize: none;
    margin: 5px 0 10px;
`;

const SendBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 60px;
    height: 40px;
    background-color: #4a95e5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const MapOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30;
`;

const MapContainer = styled.div`
    width: 800px;
    height: 600px;
    background-color: white;
    position: relative;
`;

const SearchLocation = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 40;
`;

const Crosshair = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 40px;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 40;
`;

const SelectBtn = styled.div`
    position: absolute;
    right: 20px;
    bottom: 20px;
    color: #4a95e5;
    background-color: white;
    border: none;
    border-radius: 6px;
    padding: 10px 16px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 40;
`;

export default function RegisterToilet() {
    const { userId } = useAuth();

    const [buildingName, setBuildingName] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [showMap, setShowMap] = useState(false);
    const [hasDiaperTable, setHasDiaperTable] = useState(false);
    const [hasHandicapAccess, setHasHandicapAccess] = useState(false);
    const [hasBidet, setHasBidet] = useState(false);
    const [hasTissue, setHasTissue] = useState(false);
    const [note, setNote] = useState('');

    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    // 카카오맵 API 로드
    useEffect(() => {
        if (showMap && window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
            const center = new window.kakao.maps.LatLng(37.537375, 127.082000); // 광진구 중심
            const map = new window.kakao.maps.Map(mapRef.current, {
            center,
            level: 5,
            });
            mapInstance.current = map;
        });
        }
    }, [showMap]);

    // 지도에서 선택 모달에서 위치 선택
    const selectLocation = () => {
        if (!mapInstance.current) return;

        const center = mapInstance.current.getCenter();
        const geocoder = new window.kakao.maps.services.Geocoder();

        setLocation({ lat: center.getLat(), lng: center.getLng() });

        // 주소 변환
        geocoder.coord2Address(center.getLng(), center.getLat(), (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const addr = result[0].address?.address_name || '주소 확인 실패';
                setAddress(addr);
            }
            setShowMap(false);
        });
    };

    // 화장실 등록
    const handleSubmit = () => {
        if (!buildingName || !address || !location.lat || !location.lng) {
            alert('모든 필수 항목을 입력해 주세요.');
            return;
        }

        const token =
        localStorage.getItem('token') || sessionStorage.getItem('token');

        // 등록 api 호출
        axios
            .post(`/api/toilet`, 
            {
                userId: userId,
                latitude: location.lat,
                longitude: location.lng,
                buildingName: buildingName,
                note: note,
                rating: 0.0,
                reviewCount: 0,
                hasDiaperTable: hasDiaperTable,
                hasHandicapAccess: hasHandicapAccess,
                hasBidet: hasBidet,
                hasTissue: hasTissue,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((res) => {
                alert('등록되었습니다!');
                console.log(res.data);

                // 등록 후 페이지 새로고침(SPA 방식에 위배되기에 추후 수정 필요)
                window.location.reload();
            })
            .catch((err) => console.error('화장실 등록 실패:', err));
    };

    return (
        <Wrapper>
            <h2>화장실 등록</h2>
            <span>화장실 이름</span>
            <Input label="화장실 이름" value={buildingName} onChange={e => setBuildingName(e.target.value)} required />
            <span>주소</span>
            <Input label="주소" value={address} placeholder='지도에서 선택해주세요!' onChange={e => setAddress(e.target.value)} required disabled />
            <ShowMapBtn onClick={() => setShowMap(true)}>지도에서 선택</ShowMapBtn>
            <span>존재 유무</span>
            <Row>
                <ToggleWrapper>
                    <span>유아용 의자</span>
                    <Toggle onClick={() => setHasDiaperTable(!hasDiaperTable)}>
                        {hasDiaperTable && <CheckImg src={check} alt="check" />}
                    </Toggle>
                </ToggleWrapper>
                <ToggleWrapper>
                    <span>장애인 전용</span>
                    <Toggle onClick={() => setHasHandicapAccess(!hasHandicapAccess)}>
                        {hasHandicapAccess && <CheckImg src={check} alt="check" />}
                    </Toggle>
                </ToggleWrapper>
                <ToggleWrapper>
                    <span>비데</span>
                    <Toggle onClick={() => setHasBidet(!hasBidet)}>
                        {hasBidet && <CheckImg src={check} alt="check" />}
                    </Toggle>
                </ToggleWrapper>
                <ToggleWrapper>
                    <span>휴지</span>
                    <Toggle onClick={() => setHasTissue(!hasTissue)}>
                        {hasTissue && <CheckImg src={check} alt="check" />}
                    </Toggle>
                </ToggleWrapper>
            </Row>
            <span>세부 설명</span>
            <DetailInput
                placeholder="세부 설명 (최대 50자)"
                value={note}
                onChange={e => setNote(e.target.value)}
                maxLength={50}
            />
            <SendBtn onClick={handleSubmit}>등록</SendBtn>

            {showMap && (
                <MapOverlay>
                    <MapContainer ref={mapRef}>
                        <SearchLocation>
                            <span>위치 검색</span>
                            <Input
                                type="text"
                                placeholder="주소를 입력하세요"
                            />
                        </SearchLocation>
                        <Crosshair src={bluePing} />
                        <SelectBtn onClick={selectLocation}>위치 선택</SelectBtn>
                    </MapContainer>
                </MapOverlay>
            )}
        </Wrapper>
    );
}

import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import InfoBox from '../components/InfoBox.jsx';
import { createRoot } from 'react-dom/client';
import axios from '../api/axios';
import RedPing from '../assets/icon/red_ping.svg';
import YellowPing from '../assets/icon/yellow_ping.svg';
import BluePing from '../assets/icon/blue_ping.svg';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

const MapContainer = styled.div`
    width: 100vw;
    min-height: 735px;
`;

export default function Map() {
    const mapRef = useRef(null);
    const container = useRef(null);
    const overlayRef = useRef(null);
    const overlayContainerRef = useRef(null);
    const overlayReactRootRef = useRef(null);
    
    const [center, setCenter] = useState({ lat: 37.537375, lng: 127.082000 }); // 지도 중심
    const [level, setLevel] = useState(5); // 지도 확대율
    const [markers, setMarkers] = useState([]); // 화장실 정보 객체 목록
    const [selectedToilet, setSelectedToilet] = useState(null); // 선택된 화장실 세부정보 목록
    const [overlayPosition, setOverlayPosition] = useState(null); // 화장실 세부정보 모달창 위치

    const navigate = useNavigate();

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

    // 지도 초기화
    useEffect(() => {
        window.kakao.maps.load(() => {
            const map = new window.kakao.maps.Map(container.current, {
                center: new window.kakao.maps.LatLng(center.lat, center.lng),
                level: level,
            });

            mapRef.current = map;

            // 중심 좌표, 줌 레벨 추적
            window.kakao.maps.event.addListener(map, 'center_changed', () => {
                const center = map.getCenter();
                setCenter({ lat: center.getLat(), lng: center.getLng() });
            });

            window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
                setLevel(map.getLevel());
            });

            // CustomOverlay DOM 컨테이너 초기화
            overlayContainerRef.current = document.createElement('div');

            // CustomOverlay 상에서 지도 클릭 이벤트 발생 방지
            overlayContainerRef.current.style.pointerEvents = 'none';

            overlayRef.current = new window.kakao.maps.CustomOverlay({
                content: overlayContainerRef.current,
                xAnchor: 0.5,
                yAnchor: 1.2,
            });
        });
    }, []);
   
    // 중심 좌표 또는 확대 레벨 변경 시 -> 지도 범위 계산 -> 화장실 목록 호출 API 요청
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const params = {
            minLat: center.lat-0.02,
            minLng: center.lng-0.02,
            maxLat: center.lat+0.02,
            maxLng: center.lng+0.000005,
        }

        // 범위 내 위치한 화장실 목록 요청
        axios.get('http://localhost:8080/api/toilets', { params })
            .then(res => {
                console.log("API 응답:", res.data);
                renderMarkers(res.data);
                
            })
            .catch(err => console.error('화장실 불러오기 실패:', err));

        // 테스트용 mock data 사용(API 연결 시 삭제)
            renderMarkers(toilets);
    }, [level]);

    // 마커 렌더링 함수
    const renderMarkers = (places) => {
        const map = mapRef.current;
        const newMarkers = [];

        // 기존 마커 제거
        markers.forEach(marker => marker.setMap(null));

        places.forEach((place) => { 
            const latitude = Number(place.latitude);
            const longitude = Number(place.longitude);
            const rating = Number(place.rating);

            console.log(place);
            console.log(latitude, longitude, rating);
            
            // 핑 이미지 선택
            let imageSrc = BluePing; // 좋음(파란 핑)
            if (rating < 2.0) imageSrc = RedPing; // 나쁨(빨간 핑)
            else if (rating < 3.5) imageSrc = YellowPing; // 보통(노란 핑)

            const imageSize = new window.kakao.maps.Size(30, 40); // 마커 크기 설정
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 및 크기 설정

            const position = new window.kakao.maps.LatLng(longitude, latitude); // 마커 위치 설정

            // 마커 생성
            const marker = new window.kakao.maps.Marker({
                position,
                image: markerImage,
            });

            // 마커 클릭 이벤트
            marker.addListener('click', () => {
                setSelectedToilet(place);
                setOverlayPosition(position);
            });

            marker.setMap(map);
            newMarkers.push(marker);
        });

        setMarkers(newMarkers);
    };

    // CustomOverlay 렌더링
    useEffect(() => {
        if (!overlayRef.current || !overlayPosition || !selectedToilet) return;

        // 처음 한 번만 createRoot 호출
        if (!overlayReactRootRef.current) {
            overlayReactRootRef.current = createRoot(overlayContainerRef.current);
        }

        overlayReactRootRef.current.render(
            <InfoBox
                data={selectedToilet}
                onClose={() => {
                    setSelectedToilet(null);
                    overlayRef.current.setMap(null);
                }}
                navigate={navigate}
            />
        );

        overlayRef.current.setPosition(overlayPosition);
        overlayRef.current.setMap(mapRef.current);
    }, [overlayPosition, selectedToilet]);

    // InfoBox 외부 클릭 시 닫기
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                overlayContainerRef.current &&
                !overlayContainerRef.current.contains(e.target)
            ) {
                setSelectedToilet(null);
                overlayRef.current.setMap(null);
            }
        }

        if (selectedToilet) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedToilet]);

    return (
        <Wrapper>
            <MapContainer ref={container} />
        </Wrapper>
    );
}
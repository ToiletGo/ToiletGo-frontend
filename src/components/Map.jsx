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
    height: 100vh;
`;



export default function Map() {
    const mapRef = useRef(null);
    const container = useRef(null);
    const clustererRef = useRef(null);
    const overlayRef = useRef(null);
    const overlayContainerRef = useRef(null);
    const overlayReactRootRef = useRef(null);
    
    const [center, setCenter] = useState({ lat: 37.537375, lng: 127.082000 }); // 지도 중심
    const [mapCenter, setMapCenter] = useState({ lat: 37.537375, lng: 127.082000 }); // 🔥 추가: 지도 중심 좌표 상태
    const [level, setLevel] = useState(2); // 지도 확대율
    const [markers, setMarkers] = useState([]); // 화장실 정보 객체 목록
    const [selectedToilet, setSelectedToilet] = useState(null); // 선택된 화장실 세부정보 목록
    const [overlayPosition, setOverlayPosition] = useState(null); // 화장실 세부정보 모달창 위치

    const navigate = useNavigate();

    

    // 지도 확대 함수
    const zoomIn = () => {
    if (mapRef.current) {
        const level = mapRef.current.getLevel();
        mapRef.current.setLevel(level - 1);
    }
    };

    // 지도 축소 함수
    const zoomOut = () => {
    if (mapRef.current) {
        const level = mapRef.current.getLevel();
        mapRef.current.setLevel(level + 1);
    }
    };


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

            // 2) MarkerClusterer 생성 (한 번만)
            clustererRef.current = new window.kakao.maps.MarkerClusterer({
                map: map,
                averageCenter: true,
                minLevel: 5,  // 레벨 10 이하에서는 클러스터 해제
            });
            

            // 중심 좌표, 줌 레벨 추적
            window.kakao.maps.event.addListener(map, 'center_changed', () => {
                const center = map.getCenter();
                const lat = center.getLat();
                const lng = center.getLng();
                setCenter({ lat: center.getLat(), lng: center.getLng() });
                setMapCenter({ lat, lng }); // 🔥 추가!
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
        const clusterer = clustererRef.current;
        if (!map || !clusterer) return;

        // 줌 레벨이 5 미만: → “새로 API 호출 + 마커 생성”
        // 줌 레벨이 5 이상: → “이미 로드된 markers 배열을 클러스터만 다시 계산”
        if (level < 3) {
        // ──────────────── API 요청 구간 ────────────────
        const bounds = map.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const params = {
            minLat: sw.getLat(),
            minLng: sw.getLng(),
            maxLat: ne.getLat(),
            maxLng: ne.getLng(),
        };

        axios
            .get('http://15.164.220.91:8080/api/toilets', { params })
            .then((res) => {
            // API로부터 내려온 JSON 배열을 renderMarkers에 넘김
            renderMarkers(res.data);
            })
            .catch((err) => console.error('화장실 불러오기 실패:', err));

        // (개발/테스트용) mock data 강제로 렌더링
        // renderMarkers(toilets);

        } else {
        // ──────────────── 레벨 ≥ 5일 때 (클러스터 재계산만) ────────────────
        // 기존에 state.markers에 담겨 있는 Marker 객체 목록을
        // 우선 화면에서 모두 지운 뒤, 클러스터러를 클리어하고 다시 묶으면 됨.

        // (1) 화면에서 기존 마커만 제거
        markers.forEach((m) => m.setMap(null));
        // (2) 클러스터러 안에 들어 있는 모든 마커 리스트 비우기
        clusterer.clear();
        // (3) 다시 클러스터러에 담아서 렌더링 (이미 생성된 Marker 객체 재사용)
        clusterer.addMarkers(markers);
        }
    }, [level]);

    

    // 마커 렌더링 함수
    const renderMarkers = (places) => {
        const map = mapRef.current;
        const newMarkers = [];
        const clusterer = clustererRef.current;
        if (!map || !clusterer) return;

        // 기존 마커 제거
        markers.forEach(marker => marker.setMap(null));
        clusterer.clear();

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

        // 3) 클러스터러에 마커 추가
        clusterer.addMarkers(newMarkers);

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
            <div
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: '#fff',
                    padding: '5px',
                    zIndex: -1  ,
                }}
            >
                <div>
                    현재 지도 중심: {mapCenter.lat.toFixed(6)}, {mapCenter.lng.toFixed(6)}
                </div>
                <div>현재 레벨: {level}</div>
                <div style={{ marginTop: '5px' }}>
                <button onClick={zoomIn}>🔍 확대</button>
                <button onClick={zoomOut}>🔎 축소</button>
                </div>
            </div>
        </Wrapper>
    );

    
    
}
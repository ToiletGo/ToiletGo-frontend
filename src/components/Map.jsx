import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Indicator from './Indicator';

const MapWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const Toggle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background-color: ${({ selected }) => (selected ? 'transparent' : '#d9d9d9')};
    margin-right: 10px;
    cursor: pointer;
    border: none;
    position: relative;
`;

const MapContainer = styled.div`
    width: 100%;
    height: 735px;
`;

export default function Map() {
    const container = useRef(null);
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const [searchToggle, setSearchToggle] = useState(false);

    const addressList = [
        "서울특별시 광진구 자양로 100",
        "서울특별시 광진구 자양로 110",
        "서울특별시 광진구 자양로 120",
        "서울특별시 광진구 자양로 130",
        "서울특별시 광진구 자양로 140",
        "서울특별시 광진구 자양로 150",
        "서울특별시 광진구 자양로 160",
        "서울특별시 광진구 자양로 170",
        "서울특별시 광진구 자양로 180",
        "서울특별시 광진구 자양로 190",
        "서울특별시 광진구 능동로 10",
        "서울특별시 광진구 능동로 20",
        "서울특별시 광진구 능동로 30",
        "서울특별시 광진구 능동로 40",
        "서울특별시 광진구 능동로 50",
        "서울특별시 광진구 능동로 60",
        "서울특별시 광진구 능동로 70",
        "서울특별시 광진구 능동로 80",
        "서울특별시 광진구 능동로 90",
        "서울특별시 광진구 능동로 100",
        "서울특별시 광진구 광나루로 10",
        "서울특별시 광진구 광나루로 20",
        "서울특별시 광진구 광나루로 30",
        "서울특별시 광진구 광나루로 40",
        "서울특별시 광진구 광나루로 50",
        "서울특별시 광진구 광나루로 60",
        "서울특별시 광진구 광나루로 70",
        "서울특별시 광진구 광나루로 80",
        "서울특별시 광진구 광나루로 90",
        "서울특별시 광진구 광나루로 100",
    ];

    useEffect(() => {
        window.kakao.maps.load(() => {
        const map = new window.kakao.maps.Map(container.current, {
            center: new window.kakao.maps.LatLng(37.537375, 127.082000), // 광진구 중심
            level: 5,
        });
        mapRef.current = map;

        const geocoder = new window.kakao.maps.services.Geocoder();
        const tempMarkers = [];
        const bounds = new window.kakao.maps.LatLngBounds();

        addressList.forEach((address) => {
            geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                const marker = new window.kakao.maps.Marker({ position: coords });
                marker.setMap(map);
                tempMarkers.push(marker);
                bounds.extend(coords);
                if (tempMarkers.length === addressList.length) {
                map.setBounds(bounds);
                setMarkers(tempMarkers);
                }
            }
            });
        });
        });
    }, []);

    

    useEffect(() => {
        if (!mapRef.current || markers.length === 0) return;

        const map = mapRef.current;

        const updateVisibleMarkers = () => {
        if (!searchToggle) return;
        const bounds = map.getBounds();

        markers.forEach((marker) => {
            const position = marker.getPosition();
            if (bounds.contain(position)) {
            marker.setMap(map);
            } else {
            marker.setMap(null);
            }
        });
        };

        window.kakao.maps.event.addListener(map, 'center_changed', updateVisibleMarkers);
        window.kakao.maps.event.addListener(map, 'zoom_changed', updateVisibleMarkers);

        return () => {
        window.kakao.maps.event.removeListener(map, 'center_changed', updateVisibleMarkers);
        window.kakao.maps.event.removeListener(map, 'zoom_changed', updateVisibleMarkers);
        };
    }, [searchToggle, markers]);

    return (
        <MapWrapper>
            <MapContainer ref={container} />
        </MapWrapper>
    );
}
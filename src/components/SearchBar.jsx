import styled from 'styled-components';
import wc from '../assets/icon/wc.svg';
import { useEffect, useRef, useState } from 'react';

const Wrapper = styled.div`
    position: relative;
    z-index: 10;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
    height: 40px;
    border-radius: 10px;
    background-color: white;
`;

const LogoWrapper = styled.div`
    margin: 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
    background-color: white;
    border-right: 1px solid #4a95e5; 
`;

const Icon = styled.img`
    width: 25px;
    height: 25px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-left: 5px;
    margin-right: 10px;
    color: #4a95e5;
`;

const Search = styled.input`
    width: 200px;
    font-size: 16px;
    border: none;
    background-color: white;
    margin-right: 10px;
`;

const Dropdown = styled.ul`
    position: absolute;
    background: white;
    color: black;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    width: 200px;
    z-index: 999;
`;

const Item = styled.li`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
`;

const SearchBar = ({ map }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const psRef = useRef(null);

    useEffect(() => {
        if (!psRef.current && window.kakao?.maps?.services) {
            psRef.current = new kakao.maps.services.Places();
        }
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === '' || !psRef.current) {
            setResults([]);
            return;
        }

        psRef.current.keywordSearch(value, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                setResults(data);
            } else {
                setResults([]);
            }
        });
    };

    const handleItemClick = (place) => {
        const { x, y } = place;
        const lat = parseFloat(y);
        const lng = parseFloat(x);

        const newCenter = new kakao.maps.LatLng(lat, lng);
        map.setCenter(newCenter);

        setQuery(place.place_name);
        setResults([]); // 드롭다운 닫기
    };

    return (
        <Wrapper>
            <Container>
                <LogoWrapper>
                    <Icon src={wc} alt="Logo" />
                    <Title>ToiletGo</Title>
                </LogoWrapper>
                <Search
                    type="text"
                    placeholder="건물명, 가게명 입력"
                    value={query}
                    onChange={handleSearch}
                />
            </Container>

            {results.length > 0 && (
                <Dropdown>
                    {results.map((place) => (
                        <Item key={place.id} onClick={() => handleItemClick(place)}>
                            {place.place_name}
                        </Item>
                    ))}
                </Dropdown>
            )}
        </Wrapper>
    );
}

export default SearchBar;
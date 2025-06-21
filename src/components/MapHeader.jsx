import styled from "styled-components";
import { useState } from "react";
import SearchBar from './SearchBar.jsx';
import check from '../assets/icon/check.svg';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    top: 20px;
`;

const LeftSide = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
`;

const RightSide = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 40px;
    margin-left: 20px;
    border-radius: 10px;
    z-index: 10;
    font-size: 16px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
    background-color: ${({ selected }) => (selected ? '#4a95e5' : 'white')};
    color: ${({ selected }) => (selected ? 'white' : '#4a95e5')};
    cursor: pointer;
`;

const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 45px;
    left: 409px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    gap: 5px;
    z-index: 10;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CheckRow = styled.div`
    display: flex;
    align-items: center;
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

const MyPosition = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 40px;
    background-color: white;
    color: #4a95e5;
    border-radius: 10px;
    z-index: 10;
    font-size: 16px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
    cursor: pointer;
`;

const MapHeader = ({ onFilterChange, onLocateMe }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState(false);
    const [filters, setFilters] = useState({
        hasDiaperTable: false,
        hasHandicapAccess: false,
        hasBidet: false,
        hasTissue: false
    });

    const toggleFilter = () => {
        setSelected(prev => !prev)
        setShowDropdown(prev => !prev);
    };

    const handleCheckChange = (name) => {
        const updatedFilters = {
            ...filters,
            [name]: !filters[name]
        };

        setFilters(updatedFilters);
        onFilterChange(updatedFilters); // 상위 컴포넌트로 전달
    };

    return (
        <Wrapper>
            <LeftSide>
                <SearchBar />
                <Filter selected={selected} onClick={toggleFilter}>필터</Filter>
                {showDropdown && (
                    <Dropdown>
                        <CheckRow>
                            <Toggle onClick={() => handleCheckChange('hasDiaperTable')}>
                                {filters.hasDiaperTable && <CheckImg src={check} alt="check" />}
                            </Toggle>
                            유아용 의자
                        </CheckRow>
                        <CheckRow>
                            <Toggle onClick={() => handleCheckChange('hasHandicapAccess')}>
                                {filters.hasHandicapAccess && <CheckImg src={check} alt="check" />}
                            </Toggle>
                            장애인 전용
                        </CheckRow>
                        <CheckRow>
                            <Toggle onClick={() => handleCheckChange('hasBidet')}>
                                {filters.hasBidet && <CheckImg src={check} alt="check" />}
                            </Toggle>
                            비데
                        </CheckRow>
                        <CheckRow>
                            <Toggle onClick={() => handleCheckChange('hasTissue')}>
                                {filters.hasTissue && <CheckImg src={check} alt="check" />}
                            </Toggle>
                            휴지
                        </CheckRow>
                    </Dropdown>
                )}
            </LeftSide>
            <RightSide>
                <MyPosition onClick={onLocateMe}>현위치</MyPosition>
            </RightSide>
        </Wrapper>
    )
}

export default MapHeader;
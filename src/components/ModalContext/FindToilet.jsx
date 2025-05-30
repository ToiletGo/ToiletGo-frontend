import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 10px;
`;

const AddressInput = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
`;

const SearchBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    background-color: #4a95e5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:disabled {
        background-color: #aaa;
    }
`;

const FindToilet = () => {
    const [search, setSearch] = useState('');
    const handleSearch = () => {
        console.log('Searching for:', search);
    };

    return (
        <Wrapper>
            <Title>화장실 찾기</Title>
            <AddressInput
                type="text"
                placeholder="주소를 입력하세요"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <SearchBtn onClick={handleSearch}>검색</SearchBtn>
        </Wrapper>
    )
}

export default FindToilet;
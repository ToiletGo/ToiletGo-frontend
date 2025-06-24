import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    font-size: ${props => props.size || '16px'};
    line-height: 1;
    gap: 5px;
    cursor: pointer;
`;

const Star = styled.span`
  color: ${({active}) => (active ? '#ff5d5d' : '#ccc')};
  transition: color 0.2s;
`;

const StarPicker = ({ size, value, onChange }) => {
    const [rate, setRate] = useState(0);

    const handleClick = (newRate) => {
        setRate(newRate);
        onChange?.(newRate); // 부모에게 전달
    };

    return (
        <Wrapper size={size}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    active={i <= rate}
                    onClick={() => handleClick(i)}
                >
                    ★
                </Star>
            ))}
        </Wrapper>
    );
}

export default StarPicker;
import styled from 'styled-components';

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    font-size: ${props => props.size || '16px'};
    line-height: 1;
`;

const StarBase = styled.div`
    color: #ccc;
`;

const StarFill = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
     color: #ff5d5d;
    width: ${props => props.percent}%;
    pointer-events: none;
`;

const StarRating = ({ rating, size }) => {
     const percent = Math.min((rating / 5) * 100, 100);

    return (
        <Wrapper size={size}>
            <StarBase>★★★★★</StarBase>
            <StarFill percent={percent}>★★★★★</StarFill>
        </Wrapper>
    )
}

export default StarRating;
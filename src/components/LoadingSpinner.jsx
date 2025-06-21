import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const Spinner = styled.div`
    border: 6px solid #f3f3f3;
    border-top: 6px solid #4a95e5;  // 파란색 포인트
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = () => (
    <SpinnerWrapper>
        <Spinner />
    </SpinnerWrapper>
);

export default LoadingSpinner;
import styled from 'styled-components';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Map from '../components/Map';
import SideBar from '../components/SideBar';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Outer = styled.div`
    display: relative;
    flex-direction: column;
    width: 100%;
`;

const Inner = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 auto; // 수평 중앙 정렬
`;

const Floating = styled.div`
    width: 50px;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #1779e2;
    color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
    z-index: 10;
    font-size: 14px;
    cursor: pointer;
    :hover {
        background-color: #0f5bb5;
    }
`;

const MyPosition = styled.div`
    width: 50px;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #1779e2;
    color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);
    z-index: 10;
    font-size: 14px;
    cursor: pointer;
    :hover {
        background-color: #0f5bb5;
    }
`;


const Home = () => {
  return (
    <Wrapper>
        <Outer>
            <MyPosition>내 위치</MyPosition>
            <Inner>
                <SideBar />
                <Map />
            </Inner>
        </Outer>
    </Wrapper>
    
  )
}

export default Home;
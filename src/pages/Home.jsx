import styled from 'styled-components';
import Header from '../components/Header';
import Map from '../components/Map';
import SideBar from '../components/SideBar';
import Indicator from '../components/Indicator';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Outer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;

const Inner = styled.div`
    display: relative;
`;

const Home = () => {
  return (
    <Wrapper>
        <Outer>
            <SideBar />
            <Inner>
                <Header />
                <Map />
                <Indicator />
            </Inner>
        </Outer>
    </Wrapper>
    
  )
}

export default Home;
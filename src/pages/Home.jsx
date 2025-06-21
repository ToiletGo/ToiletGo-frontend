import styled from 'styled-components';
import Map from '../components/Map';
import SideBar from '../components/SideBar';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Outer = styled.div`
    display: flex;
    width: 100%;
`;

const Inner = styled.div`
    position: relative;
    width: 100%;
`;

const Home = () => {
  return (
    <Wrapper>
        <Outer>
            <SideBar />
            <Inner>
                <Map />
            </Inner>
        </Outer>
    </Wrapper>
    
  )
}

export default Home;
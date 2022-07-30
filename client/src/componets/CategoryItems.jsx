import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobil } from '../responsibe';


const Container = styled.div`
    flex: 1;
    margin: 3px;
    position: relative;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobil({ height: "80vh" })}


`;
const Info = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left:0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;

const Banner = styled.div`
  position: absolute;
  height: 15%;
  width: 100%;
  top: 0;
  left: 0;
  margin-top: 150px;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;  

  ${mobil({ height: "50px", marginTop: "125px" })}

`;


const Title = styled.h1`
    margin-top: 20px;
    color: white;
    margin-bottom: 20px;
    font-size: 60px;
    font-weight: 500;
    ${mobil({ fontSize: "40px" })}


`;
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: black;
    font-weight: 600;
    cursor: pointer;
`;



const CategoryItems = ({ item }) => {
    return (
        <Link to={`/products/${item.cat}`}>
            <Container>
                <Image src={item.img} />
                <Info>
                    <Banner>
                        <Title>{item.title}</Title>
                    </Banner>
                    <Button>INGRESAR</Button>
                </Info>
            </Container>
        </Link>
    )
}

export default CategoryItems

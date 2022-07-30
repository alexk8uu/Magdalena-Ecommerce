import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';
import { mobil } from '../responsibe';


const Container = styled.div`
height: 60vh;
background-color: #fcf5f5;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Title = styled.h1`
font-size: 70px;
margin-bottom: 20px;
${mobil({ fontSize: "40px"})}

`
const Description = styled.div`
font-size: 24px;
font-weight: 300;
margin-bottom: 20px;
${mobil({ textAling: "center", fontSize: "18px"})}

`
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobil({ width: "80%"})}

`
const Input = styled.input`
border: none;
flex: 8;
padding-left: 20px;
`
const Button = styled.button`
flex:1;
border: none;
background-color: violet;
color: white;
cursor: pointer;
`


const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Description>Suscribete para recibir las mejores ofertas!</Description>
            <InputContainer>
                <Input placeholder='Your email'/>
                <Button>
                    <SendIcon />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter

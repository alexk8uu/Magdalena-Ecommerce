import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import paymentimg from '../utils/mercadopago-credit-card-logo-bis.png'
import {mobil} from '../responsibe.js';

const Container = styled.div`
  display: flex;
  ${mobil({ flexDirection: 'column'})}
`;


const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;


const Logo = styled.h1`
    font-family: 'Dancing Script', cursive;
    font-weight: bold;
    font-size: 35px;
`;

const Desc = styled.p`
    font-family: 'Amatic SC', cursive;
    font-weight: 800;
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobil({ display: 'none'})}
  

`;

const Title = styled.h3`
margin-bottom: 20px;
padding-top: 15px;
`;

const List = styled.ul`
    margin : 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 8px;
`;




const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobil({ backgroundColor: '#fcf5f5'})}
    
`;

const ContactItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    
`;

const Payment = styled.img`
    width: 40%;
`



const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Magdalena</Logo>
                <Desc>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum dicta et nisi fuga quidem officia, eaque alias modi reprehenderit cupiditate deserunt omnis doloribus illo expedita obcaecati iure in quaerat incidunt.
                </Desc>
                <SocialContainer>
                    <SocialIcon color='385599'>
                        <FacebookIcon />
                    </SocialIcon>
                    <SocialIcon color='E4405F'>
                        <InstagramIcon />
                    </SocialIcon>
                    <SocialIcon color='55ACEE'>
                        <TwitterIcon />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Link Utiles</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Acessorios</ListItem>
                    <ListItem>Seccion de Invierno</ListItem>
                    <ListItem>Descuentos</ListItem>
                    <ListItem>Sigue tu pedido</ListItem>
                    <ListItem>Ver Carro</ListItem>
                    <ListItem>Seccion Verano</ListItem>
                    <ListItem>Mi Cuenta</ListItem>
                    <ListItem>Terminos y Condiciones</ListItem>
                    <ListItem>Contactanos</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <LocationOnIcon style={{marginRight: "10px"}}/>Diario La Nacion 3359, Salta Capital - Argentina
                </ContactItem>
                <ContactItem>
                    <CallIcon style={{marginRight: "10px"}} />+54 9 387 580 771
                </ContactItem>
                <ContactItem>
                    <EmailIcon style={{marginRight: "10px"}} />magdalenacontact@gmail.com
                </ContactItem>
                <Payment src={paymentimg} />
            </Right>
        </Container>
    )
}

export default Footer

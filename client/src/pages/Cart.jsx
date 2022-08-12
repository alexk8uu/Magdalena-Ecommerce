import styled from "styled-components";
import Navbar from "../componets/Navbar.jsx";
import Announcement from "../componets/Announcement.jsx";
import Footer from "../componets/Footer.jsx";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobil } from "../responsibe.js";
import { useDispatch, useSelector } from "react-redux";
import { mercadopagoRequest } from "../requestMethods.js";
import { addCheckout, removeProduct, addQuantity, removeQuantity} from "../redux/cartRedux";





const Container = styled.div``;


const MyAddIcon = styled(AddIcon)`
  cursor: pointer;
`;

const MyRemoveIcon = styled(RemoveIcon)`
  cursor: pointer;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobil({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopBottom = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobil({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  ${mobil({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  ${mobil({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobil({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobil({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const RemoveProduct = styled.div`
  padding: 25px;
  font-size: 20px;
  font-weight: bold;
  color: crimson;
  cursor: pointer;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const TOKEN = currentUser?.accessToken;
  const dispatch = useDispatch();



  const handleCheckout = async () => {
    const req = await mercadopagoRequest.post(
      "/payment/mercadopago",
      { cart: cart, user: currentUser },
      {
        headers: {
          token: `Bearer ${TOKEN}`,
        },
      }
    );
    dispatch(addCheckout([req.data]));
    window.location.replace(req.data.init_point);
  };

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  }

  const handleAddQuantity = (product) => {
    dispatch(addQuantity(product))
  } 
  const handleRemoveQuantity = (product) => {
    dispatch(removeQuantity(product))
  } 

  console.log("USER", user);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>Tu Carrito</Title>
        <Top>
          <TopBottom>Seguir Comprando</TopBottom>
          <TopTexts>
            <TopText>Tu Carrito(2)</TopText>
            <TopText>Tu Lista de deseos (0)</TopText>
          </TopTexts>
          <TopBottom type="filled">Pagar Ahora</TopBottom>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Producto:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <MyAddIcon onClick={() => handleAddQuantity(product)}/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <MyRemoveIcon onClick={() => handleRemoveQuantity(product)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
                <RemoveProduct onClick={() => handleRemoveProduct(product)}>X</RemoveProduct>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Resumen del pedido</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtototal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Envio estimado</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Cupon de descuento</SummaryItemText>
              <SummaryItemPrice>$ -2.09</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleCheckout}>COMPRAR AHORA</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

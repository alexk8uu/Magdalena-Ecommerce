import styled from "styled-components";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { Link } from 'react-router-dom';

const Container = styled.div`
  margin: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Text = styled.h1``;
const Button = styled.button`
  margin-top: 20px;
  padding: 5px;
  width: 100px;
  font-weight: 600;
  font-size: 15px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: violet;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Success = () => {
  const responseMp = Object.fromEntries(
    useLocation()
      .search.slice(1)
      .split("&")
      .map((p) => p.split("="))
  );

  console.log("ESTO ES LOCATION", responseMp.preference_id);
  const checkout = useSelector((state) => state.cart.checkoutProducts)[0];
  const [orderId, setOrderId] = useState(null);


  

    
  useEffect(() => {
    const verifyOrder = async () => {
      try {
        const res = await userRequest.get(
          `/orders/findOrder/${responseMp.preference_id}`
        );
        if (res.data !== null) {
          setOrderId(res.data._id);
        } else {
          const createdOrder = async () => {
            try {
              console.log()
              const res = await userRequest.post("/orders", {
                userId: checkout.additional_info,
                products: checkout.items.map((item) => ({
                  productId: item.id,
                  productName: item.title,
                  quantity: item.quantity,
                })),
                amount: checkout.items
                  .map((item) => item.unit_price)
                  .reduce((prev, curr) => prev + curr, 0),
                address: checkout.shipments.receiver_address,
                paymentId: responseMp.preference_id,
              });
              setOrderId(res.data._id);
            } catch (error) {
              console.log(error);
            }
          };
          createdOrder();
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (responseMp.status === "approved") verifyOrder();
  }, [checkout, responseMp]);

  return (
    <Container>
      <Text>
        {orderId
          ? `El pedido a sido creado exitosamente. Tu numero de orden es ${orderId}`
          : `Perfecto, Tu orden se esta preparando...`}
      </Text>
      <StyledLink to='/'>
        <Button>Go Home</Button>
      </StyledLink>
    </Container>
  );
};

export default Success;

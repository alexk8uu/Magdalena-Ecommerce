import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const VerifyUser = () => {
  const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `;
  const ContainerImg = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: contain;
  `;
  const Image = styled.img`
    width: 200px;
    height: 200px;
  `;
  const TextError = styled.h1`
    font-weight: 600;
    color: crimson;
  `;
  const Text = styled.h3`
    margin-top: 10px;
    font-weight: 600;
  `;
  const Button = styled.button`
    cursor: pointer;
    margin-top: 10px;
    padding: 5px 10px;
    color: white;
    background-color: #c97dc1;
    border-radius: 5px;
    border: 1px solid lightslategray;
  `;

  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/api/users/${params.id}/verify/${params.token}`;
        const res = await axios.get(url);
        console.log("respuesta a la verificacion del correo: ", res.data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [params]);

  return (
    <>
      {validUrl ? (
        <Container>
          <ContainerImg>
            <Image src={require("../../src/utils/registerSuccess.png")} />
          </ContainerImg>
          <Text>Email verificado exitosamente</Text>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </Container>
      ) : (
        <TextError>404 Not Found</TextError>
      )}
    </>
  );
};

export default VerifyUser;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobil } from "../responsibe";
import img from "../utils/imagenloginaccount2.jpg";
import { login } from "../redux/apiCalls.js";
import { reset } from "../redux/userRedux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${img}) center;

  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobil({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: violet;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  font-size: 12px;
  margin: 5px 0px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, errorText } = useSelector((state) => state.user);

  console.log(error);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  useEffect(() => {
    const handlePageLoad = () => {
      dispatch(reset());
    };
    window.addEventListener("load", handlePageLoad);

    return () => {
      window.removeEventListener("load", handlePageLoad);
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <Container>
      <Wrapper>
        <Title>INGRESAR</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error !== false ? <Error>{errorText.msg}</Error> : null}
          <Link>No recuerdas la contraseña?</Link>
          <Link>Crear una cuenta nueva</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

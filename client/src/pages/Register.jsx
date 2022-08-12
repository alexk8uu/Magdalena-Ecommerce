import styled from "styled-components";
import { mobil } from "../responsibe";
import img from "../utils/imagencreateaccount.jpg";
import { useForm } from "react-hook-form";
import { registerUser } from "../redux/apiCalls";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${img}) center;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobil({ width: "75%", height: "85vh" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  ${mobil({ margin: "10px 10px 0px 0px" })}
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: violet;
  color: white;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;
  color: crimson;
`;

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const validatePass = () => {
    return watch('password') === watch('confirmPassword')
  };



  const onSubmit = (data) => {
    registerUser(data);
    navigate('/login');
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREA UNA CUENTA</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Input
              placeholder="name"
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && <b>Nombre requerido</b>}
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="last name"
              type="text"
              {...register("lastName", { required: true })}
            />
            {errors.lastName?.type === "required" && <b>Apellido requerido</b>}
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="username"
              type="text"
              {...register("userName", { required: true, maxLength: 10 })}
            />
            {errors.userName?.type === "required" && (
              <b>Nombre de usuario requerido</b>
            )}
            {errors.userName?.type === "maxLength" && (
              <b>Maximo 10 caracteres</b>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="email"
              type="text"
              {...register("email", {
                required: true,
                pattern:
                  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
              })}
            />
            {errors.email?.type === "required" && <b>Email requerido</b>}
            {errors.email?.type === "pattern" && <b>Email invalido</b>}
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="password"
              type="password"
              {...register("password", { required: true })}
            />
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="confirm password"
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: validatePass,
              })}
            />
            {errors.confirmPassword?.type === 'required' && <b>Ingrese la contraseña nuevamente</b>}
            {errors.confirmPassword?.type === 'validate' && <b>Las contraseñas no coincidir</b>}
          </InputContainer>
          <Agreement>
            By creatin an account to the processing of my personal data in
            accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREAR</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;

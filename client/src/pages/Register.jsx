import styled from "styled-components";
import { mobil } from "../responsibe";
import img from "../utils/imagencreateaccount.jpg";
import { useForm } from "react-hook-form";
import { registerUser } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset } from "../redux/userRedux";

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
  ${mobil({ width: "75%", height: "auto" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  ${mobil({ width: "100%" })}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  ${mobil({ margin: "10px 10px 0px 0px", width: "100%" })}
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

const TextErrorRegister = styled.h4`
  margin-top: 10px;
  font-size: 14px;
  color: crimson;
`;

const TextSuccessRegister = styled.h2`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: green;
`;

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorText, error, registerData } = useSelector((state) => state.user);

  console.log("Estos es RegisterData:", registerData);

  const validatePass = () => {
    return watch("password") === watch("confirmPassword");
  };

  const onSubmit = (data) => {
    registerUser(data, dispatch, navigate);
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
            {errors.confirmPassword?.type === "required" && (
              <b>Ingrese la contraseña nuevamente</b>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <b>Las contraseñas no coincidir</b>
            )}
          </InputContainer>
          <Agreement>
            By creatin an account to the processing of my personal data in
            accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREAR</Button>
        </Form>
        {registerData?.success && (
          <TextSuccessRegister>{registerData.msg}</TextSuccessRegister>
        )}
        {error && <TextErrorRegister>{errorText?.msg}</TextErrorRegister>}
      </Wrapper>
    </Container>
  );
};

export default Register;

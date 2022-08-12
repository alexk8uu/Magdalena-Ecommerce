import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobil } from "../responsibe.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux.js";

const Container = styled.div`
  height: 80px;
  ${mobil({ height: "60px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobil({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 5px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobil({ width: "40px" })}
`;

const Center = styled.div`
  flex: 1;
  margin-bottom: 25px;
`;

const Logo = styled.div`
  /*   font-family: 'Bad Script', cursive;
  font-family: 'Amatic SC', cursive;
  */
  font-family: "Dancing Script", cursive;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  color: black;
  ${mobil({ fontSize: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 25px;
  ${mobil({ justifyContent: "center", flex: 2 })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

  ${mobil({ fontSize: "10px", marginLeft: "4px" })}
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

const Navbar = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="Buscar..." />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <StyledLink to="/">
            <Logo>Madgdalena</Logo>
          </StyledLink>
        </Center>
        <Right>
          {user ? (
            <MenuItem onClick={handleLogout}>SALIR</MenuItem>
          ) : (
            <>
            <StyledLink to='/login'>
              <MenuItem>INGRESAR</MenuItem>
            </StyledLink>
            <StyledLink to='/register'>
              <MenuItem>REGISTRARSE</MenuItem>
            </StyledLink>
            </>
          )}
          <StyledLink to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </MenuItem>
          </StyledLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

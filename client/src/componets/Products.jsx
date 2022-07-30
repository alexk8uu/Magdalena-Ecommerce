import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`

`;



const CardProducts = styled.div`
   padding: 20px;
    display: flex;
    flex-wrap: wrap ;
    justify-content: space-between;

`;

const Products = ({ cat, filters, sort }) => {


  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products/?category=${cat}`
            : `http://localhost:5000/api/products`
        )
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts();
  }, [cat])

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item => Object.entries(filters).every(([key, value]) =>
        item[key].includes(value))
      ))
  }, [products, cat, filters]);


  useEffect(() => {
    if (sort === "desc") {
      setFilteredProducts((prev) =>
      [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
      [...prev].sort((a, b) => b.price - a.price)
      );
    } else {
      setFilteredProducts((prev) =>
      [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    }
  }, [sort])
  

  return (
    <Container>
      <CardProducts>
        {
          cat ? filteredProducts.map((item) => (
            <Product item={item} key={item._id} />
          )) : products.slice(0, 8).map((item) => (
            <Product item={item} key={item._id} />
          ))
        }
      </CardProducts>
    </Container>
  )
}

export default Products

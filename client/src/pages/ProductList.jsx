import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components"
import Announcement from "../componets/Announcement";
import Footer from "../componets/Footer";
import Navbar from "../componets/Navbar";
import Newsletter from "../componets/Newsletter";
import Products from "../componets/Products";
import { mobil } from "../responsibe";




const Container = styled.div`

`;

const Title = styled.h1`
margin: 20px;
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;

`;

const Filter = styled.div`
margin: 20px;
${mobil({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
font-size: 20px;
font-weight: 600;
margin-right: 20px;
${mobil({ marginRight: "0px" })}

`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobil({ margin: "10px 0px" })}
`;

const Option = styled.option`

`;

const ProductList = () => {

    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilter ] = useState({});
    const [sort, setSort ] = useState("asc")

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilter({
            ...filters,
            [e.target.name] : value,
        });
    };

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Title>{cat.toUpperCase()}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filtrar por Producto:</FilterText>
                    <Select  name = 'color' onChange={handleFilters} >
                        <Option disable> Color</Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>yellow</Option>
                        <Option>green</Option>
                        <Option>pink</Option>
                    </Select>
                    <Select name = 'size' onChange={handleFilters} >
                        <Option disable > Size</Option>
                        <Option>XL</Option>
                        <Option>L</Option>
                        <Option>M</Option>
                        <Option>S</Option>
                        <Option>XS</Option>
                    </Select >
                </Filter>
                <Filter><FilterText>Ordenar Productos:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">Lo mas nuevo</Option>
                        <Option value="asc">Precio (Asc)</Option>
                        <Option value="desc">Precio (Desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}




export default ProductList

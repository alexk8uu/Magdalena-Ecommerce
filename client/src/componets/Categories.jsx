import styled from 'styled-components';
import { mobil } from '../responsibe.js';
import { categories } from '../utils/data.js'
import CategoryItems from './CategoryItems.jsx';


const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;


    ${mobil({ padding: "0px", flexDirection:"column"})}
`;



const Categories = () => {
  return (
    <Container>
      {
        categories.map(item => (
            <CategoryItems item={item} key = {item.id} />
        ) )
      }
    </Container>
  )
}

export default Categories

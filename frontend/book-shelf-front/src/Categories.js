
import './App.css';
import CategoryPage from './Category.js';
import ResponsiveAppBar from './Navbar.js';
import Box from '@mui/material/Box';

function Category() {
  return (
    <Box>
      <ResponsiveAppBar />
      <CategoryPage />
    </Box>
  );
}

export default Category;

import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './Navbar.js';
import Box from '@mui/material/Box';
import BookList from './BookList.js';

function App() {
  return (
    <Box>
      <ResponsiveAppBar />
      <BookList />
    </Box>
  );
}

export default App;

import React, { useState } from "react";
import apiClient from "./ApiClient";
import {
  
  TextField,
  Button,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import logo from './bookLogo.png';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  const searchBooks = async () => {
    try {
      const response = await apiClient.get("", { params: { query } });
      setBooks(response.data.items);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  return (
    <Box  style={{ marginTop: "20px", marginLeft:"20px", marginRight:"20px",width: "100%"}}>
      <Grid2 container spacing={2} alignItems="center" item xs={12} sm={6} display="flex" justifyContent="center" marginTop={10}>
        <Grid2 item xs={12} sm={6} display="flex" justifyContent="center" >
          <img
            src={logo}
            alt="Logo"
            style={{ width: '300px', height: '300px' }}
          />
        
          <Typography variant="h3" align="center" gutterBottom marginLeft={10} marginTop={10} >
            Decide what you want to read next?
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} justifyContent="center" marginTop={10} marginBottom={10} style={{ marginBottom: "20px" }}>
        <Grid2 item xs={8}>
          <TextField
            fullWidth
            label="Search for books"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid2>
        <Grid2 item>
          <Button
            variant="contained"
            color="primary"
            onClick={searchBooks}
            style={{ height: "100%" }}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>
      <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={3} margin={3} >
        {books.map((book) => (
          <Grid2 key={book.id}  sx={{ xs: 12, md: 4, sm:6 }}>
            <Card sx={{ width: 345}}>
              {book.volumeInfo.imageLinks?.thumbnail && (
                <CardMedia
                  component="img"
                  height="400"
                  width="345"
                  image={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {book.volumeInfo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      </Box>
    </Box>
  );
};

export default BookList;

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import logo from './bookLogo.png';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const searchBooks = async () => {
    try {
      const response = await apiClient.get("", { params: { query } });
      setBooks(response.data.items);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDialog = () => {
    setSelectedBook(null);
  };

  return (
    <Box style={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px"}}>
      <Grid2 container spacing={2} alignItems="center" item xs={12} sm={6} display="flex" justifyContent="center" marginTop={10}>
        <Grid2 item xs={12} sm={6} display="flex" justifyContent="center">
          <img
            src={logo}
            alt="Logo"
            style={{ width: '300px', height: '300px' }}
          />
          <Typography variant="h3" align="center" gutterBottom marginLeft={10} marginRight={10} marginTop={10}>
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
      <Box sx={{ flexGrow: 1 }} >
        <Grid2 container spacing={3} margin={3}   >
          {books.map((book) => (
            <Grid2   key={book.id} sx={{ xs: 12, md: 4, sm: 6 }}>
              <Card sx={{ width: 345 }} onClick={() => handleCardClick(book)}>
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom >
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

      {/* Dialog for displaying book details */}
      <Dialog open={!!selectedBook} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Book Details
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedBook && (
            <>
              <img
                src={selectedBook.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                alt={selectedBook.volumeInfo.title}
                style={{ width: "100%", marginBottom: "20px" }}
              />
              <Typography variant="h6">{selectedBook.volumeInfo.title}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {selectedBook.volumeInfo.authors?.join(", ") || "Unknown Author"}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedBook.volumeInfo.description || "No description available."}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookList;

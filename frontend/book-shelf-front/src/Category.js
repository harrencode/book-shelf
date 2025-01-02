import React, { useEffect, useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const CategoryPage = () => {
  const [categories, setCategories] = useState([
    { title: "Fiction", books: [], query: "fiction" },
    { title: "Non-Fiction", books: [], query: "non-fiction" },
    { title: "History & Biography", books: [], query: "history biography" },
    { title: "Kids", books: [], query: "kids" },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // State to store the selected book for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const BASE_URL = "http://localhost:8080/api/categories";

  // Fetch books for all categories from the backend
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const updatedCategories = await Promise.all(
        categories.map(async (category) => {
          const response = await fetch(`${BASE_URL}/${category.query}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch books for category: ${category.title}`);
          }
          const data = await response.json();
          const books = (data.items || []).map((item) => ({
            img: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150",
            title: item.volumeInfo.title,
            description: item.volumeInfo.description || "No description available",
            authors: item.volumeInfo.authors || ["Unknown author"],
          }));
          return { ...category, books };
        })
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "16px" }}>
      {categories.map((category, index) => (
        <Box key={index} sx={{ marginBottom: "60px",  marginLeft:"100px"}}>
          <Typography variant="h5" sx={{ marginBottom: "16px" }}>
            {category.title}
          </Typography>
          <ImageList cols={4} gap={16}>
            {category.books.map((book, idx) => (
              <ImageListItem key={idx}>
                <img
                  src={book.img}
                  alt={book.title}
                  style={{ borderRadius: "8px", objectFit: "cover", width: "200px", height: "300px", cursor: "pointer" }}
                  loading="lazy"
                  onClick={() => handleOpenModal(book)} // Open modal on image click
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ))}

      {/* Modal for Book Details */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} sx={{alignItems: "center",justifyContent: "center",textAlign: "justify",}}>
        {selectedBook && (
          <>
            <DialogTitle>{selectedBook.title}</DialogTitle>
            <DialogContent>
              <img
                src={selectedBook.img}
                alt={selectedBook.title}
                style={{ borderRadius: "8px", objectFit: "cover", width: "400px", height: "600px", marginBottom: "16px", alignItems: "center", justifyContent: "center", textAlign: "justify" }}
              />
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Authors:</strong> {selectedBook.authors.join(", ")}
              </Typography>
              <Typography variant="body2">{selectedBook.description}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CategoryPage;

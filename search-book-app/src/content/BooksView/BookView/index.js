import { styled as materialUIStyled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import styled from "styled-components";

import { Grow, Tooltip, Zoom } from "@mui/material";
import BookCover from "../images/default_book_cover.jpg";
import FavoriteBookButton from "../FavouriteBookButton";
import { useEffect, useState } from "react";

const Img = materialUIStyled("img")({
  margin: "0px",
  display: "block",
  maxWidth: "150px",
  maxHeight: "200px",
});
const MainStyles = styled.div`
  display: flex;
`;
const BooksContainer = styled(MainStyles)`
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 50px;
`;

const BookContainer = styled(MainStyles)`
  gap: 5px;
  padding: 15px;
  flex-wrap: wrap;
  justify-content: center;
`;
const BookInfoContainer = styled(MainStyles)`
  gap: 30px;
  width: 100%;
  margin: 10px;
`;

const BookInfoParagraph = styled.span`
  font-size: 16px;
`;
const BookTitleName = styled.h2`
  margin: 2px;
  font-size: 20px;
  font-weight: bold;
`;
const ErrorContainer = styled(BooksContainer)`
  font-size: 50px;
  align-items: center;
  height: 100vh;
  text-align: center;
`;
const ButtonsContainer = styled(MainStyles)`
  gap: 20px;
`;

const BookView = ({ data, error, errorMessage }) => {
  const [favoriteBooksIds, setFavoriteBooksIds] = useState([]);
  const storage = JSON.parse(localStorage.getItem("favorites"));

  useEffect(() => {
    if (storage !== []) {
      setFavoriteBooksIds(storage);
    }
  }, []);

  useEffect(() => {
    if (storage === null) {
      setFavoriteBooksIds([]);
    }
    if (storage !== []) {
      localStorage.setItem("favorites", JSON.stringify(favoriteBooksIds));
    }
    if (storage === []) {
      localStorage.setItem("favorites", JSON.stringify(favoriteBooksIds));
    }
  }, [favoriteBooksIds]);
  if (error) {
    return (
      <ErrorContainer>
        <p>
          Error
          <br></br>
          {errorMessage}
        </p>
      </ErrorContainer>
    );
  }

  const handleAddBookToFav = id => {
    let array = [...favoriteBooksIds, id];

    setFavoriteBooksIds(array);
  };
  const handleRemoveBookFromFav = id => {
    const newFavBooksId = favoriteBooksIds.filter(favBookId => {
      return favBookId !== id;
    });
    setFavoriteBooksIds(newFavBooksId);
  };

  return (
    <BooksContainer>
      {Array.isArray(data) &&
        data.map(
          book =>
            book.type === "Text" && (
              <Grow key={book.id} in timeout={500}>
                <Paper
                  sx={{
                    p: 2,
                    width: "450px",
                  }}>
                  <BookContainer>
                    <BookInfoContainer>
                      {book.resources.map(
                        item =>
                          item.type === "image/jpeg" &&
                          item.uri.includes("medium") && (
                            <Tooltip
                              key={item.id}
                              title="Information about book"
                              placement="left"
                              TransitionComponent={Zoom}>
                              <Link
                                target="blank"
                                href={`https://www.gutenberg.org/ebooks/${book.id}`}>
                                <Img alt="book-cover" src={item.uri} />
                              </Link>
                            </Tooltip>
                          )
                      )}
                      {book.resources.length < 11 && (
                        <Img alt="book-cover" src={BookCover} />
                      )}
                      <div>
                        <BookInfoParagraph>Book title:</BookInfoParagraph>
                        <BookTitleName>{book.title}</BookTitleName>
                        <BookInfoParagraph>Author:</BookInfoParagraph>

                        {book.agents.map(
                          item =>
                            item.type === "Author" && (
                              <BookTitleName key={item.id}>
                                {item.person}
                              </BookTitleName>
                            )
                        )}
                      </div>
                    </BookInfoContainer>
                    <Zoom in timeout={500}>
                      <ButtonsContainer>
                        {book.resources.map(
                          item =>
                            item.type.includes("text/html") &&
                            item.uri.includes(".htm") && (
                              <Button key={item.id} variant="outlined">
                                <Link
                                  underline="none"
                                  target="blank"
                                  href={item.uri}>
                                  READ BOOK
                                </Link>
                              </Button>
                            )
                        )}

                        {favoriteBooksIds.includes(book.id) ? (
                          <FavoriteBookButton
                            handleClick={() => handleRemoveBookFromFav(book.id)}
                            favBook={true}
                          />
                        ) : (
                          <FavoriteBookButton
                            handleClick={() => handleAddBookToFav(book.id)}
                            favBook={false}
                          />
                        )}
                      </ButtonsContainer>
                    </Zoom>
                  </BookContainer>
                </Paper>
              </Grow>
            )
        )}
    </BooksContainer>
  );
};

export default BookView;

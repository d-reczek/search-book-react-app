import { styled as materialUIStyled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import styled from "styled-components";

import { Grow } from "@mui/material";
import BookCover from "../images/default_book_cover.jpg";
import FavouriteBook from "../favourite-book";
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
  //   height: 100vh;
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

const BookView = ({ data, setData, error, errorMessage }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(data);
  }, [data]);

  useEffect(() => {
    console.log(favorites);
    console.log(data);
  }, [favorites]);

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

  function handleFavorite(id) {
    const newFavorites = favorites.map(item => {
      return item.id === id ? { ...item, favorite: !item.favorite } : item;
    });

    setFavorites(newFavorites);
  }
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
                            <Link
                              target="blank"
                              href={`https://www.gutenberg.org/ebooks/${book.id}`}>
                              <Img
                                key={item.id}
                                alt="book-cover"
                                src={item.uri}
                              />
                            </Link>
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
                                QUICK READ BOOK
                              </Link>
                            </Button>
                          )
                      )}
                      {favorites.map(
                        (item, i) =>
                          book.id === item.id && (
                            <FavouriteBook
                              key={item.id}
                              add={item.favorite}
                              handleClick={() => {
                                handleFavorite(item.id);
                              }}
                            />
                          )
                      )}
                    </ButtonsContainer>
                  </BookContainer>
                </Paper>
              </Grow>
            )
        )}
    </BooksContainer>
  );
};

export default BookView;

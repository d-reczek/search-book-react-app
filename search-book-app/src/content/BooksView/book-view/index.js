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

const BookView = ({ data, error, errorMessage }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const storage = JSON.parse(localStorage.getItem("favorites"));

  useEffect(() => {
    setFavorites(data);
  }, [data]);
  useEffect(() => {
    if (storage !== []) {
      setFavoritesList(storage);
    }
    console.log(storage);
  }, []);

  useEffect(() => {
    if (storage !== []) {
      localStorage.setItem("favorites", JSON.stringify(favoritesList));
    }
    if (storage === []) {
      localStorage.setItem("favorites", JSON.stringify(favoritesList));
    }
    console.log(storage);
  }, [favoritesList]);
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
    let array = [];
    let object = { id: id, favorite: true };
    array = [...favoritesList, object];
    setFavoritesList(array);

    setFavorites(newFavorites);
  }

  function handleDelete(id) {
    const newFavorites = favorites.map(item => {
      return item.id === id ? { ...item, favorite: !item.favorite } : item;
    });
    let array = favoritesList.filter(item => {
      return item.id !== id;
    });

    setFavorites(newFavorites);
    setFavoritesList(array);
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
                              disable={item.favorite}
                              key={item.id}
                              add={false}
                              handleClick={() => {
                                handleFavorite(item.id);
                              }}
                            />
                          )
                      )}
                      {favoritesList.map(
                        (item2, i) =>
                          book.id === item2.id &&
                          item2.favorite && (
                            <FavouriteBook
                              key={item2.id}
                              add={item2.favorite}
                              handleClick={() => {
                                handleDelete(item2.id);
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

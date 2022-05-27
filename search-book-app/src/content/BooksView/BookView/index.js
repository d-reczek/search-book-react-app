import { styled as materialUIStyled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import styled from "styled-components";

import { Grow, Tooltip, Zoom } from "@mui/material";
import BookCover from "../images/default_book_cover.jpg";
import FavoriteBookButton from "../FavouriteBookButton";
import { useEffect, useState } from "react";
import { device } from "../../../common/deviceBreakPoints";

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
  // margin: 0 70px;
  // padding: 0 70px;
  max-width: 1200px;

  @media ${device.laptop} {
    max-width: 1800px;
  }
  @media ${device.tablet} {
    max-width: 370px;
  }
  @media ${device.desktop} {
    max-width: 1700px;
  }
`;

const BookContainer = styled(MainStyles)`
  gap: 5px;
  padding: 15px;
  flex-wrap: wrap;
  justify-content: center;
  @media ${device.mobile} {
    flex-direction: column;
  }
`;
const BookInfoContainer = styled(MainStyles)`
  gap: 30px;
  width: 100%;
  margin: 10px;
  @media ${device.tablet} {
    // width: inherit;
    align-items: center;
  }
  @media ${device.mobile} {
    flex-direction: column;
    align-items: center;
    width: inherit;
  }
`;

const BookWrapper = styled.div`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  padding: 5px;
  width: 380px;
  @media ${device.laptop} {
    width: 600px;
  }
  @media ${device.tablet} {
    width: 480px;
  }
  @media ${device.mobile} {
    width: 290px;
  }
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
  @media ${device.mobile} {
    justify-content: center;
  }
`;

const BookView = ({ data, error, errorMessage, showFavorites }) => {
  const [favoriteBooksIds, setFavoriteBooksIds] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const favoriteBooksIdsStorage = JSON.parse(
    localStorage.getItem("favoritesBooksIds")
  );
  const favoriteBooksStorage = JSON.parse(
    localStorage.getItem("favoritesBooks")
  );
  useEffect(() => {
    showFavorites ? setCurrentData(favoriteBooks) : setCurrentData(data);
  }, [showFavorites, data, favoriteBooks]);
  useEffect(() => {
    if (favoriteBooksIdsStorage !== []) {
      setFavoriteBooksIds(favoriteBooksIdsStorage);
    }
  }, [data]);

  useEffect(() => {
    if (favoriteBooksIdsStorage === null) {
      setFavoriteBooksIds([]);
    }
    if (favoriteBooksIdsStorage !== []) {
      localStorage.setItem(
        "favoritesBooksIds",
        JSON.stringify(favoriteBooksIds)
      );
    }
    if (favoriteBooksIdsStorage === []) {
      localStorage.setItem(
        "favoritesBooksIds",
        JSON.stringify(favoriteBooksIds)
      );
    }
  }, [favoriteBooksIds]);

  useEffect(() => {
    if (favoriteBooksStorage !== []) {
      setFavoriteBooks(favoriteBooksStorage);
    }
  }, [data]);

  useEffect(() => {
    if (favoriteBooksStorage === null) {
      setFavoriteBooks([]);
    }
    if (favoriteBooksStorage !== []) {
      localStorage.setItem("favoritesBooks", JSON.stringify(favoriteBooks));
    }
    if (favoriteBooksStorage === []) {
      localStorage.setItem("favoritesBooks", JSON.stringify(favoriteBooks));
    }
  }, [favoriteBooks]);

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

  const handleAddBookToFav = (id, objBook) => {
    let array = [...favoriteBooksIds, id];
    let array2 = [...favoriteBooks, objBook];

    setFavoriteBooksIds(array);
    setFavoriteBooks(array2);
  };
  const handleRemoveBookFromFav = (id, objBook) => {
    const newFavBooksId = favoriteBooksIds.filter(favBookId => {
      return favBookId !== id;
    });
    const newFavBooks = favoriteBooks.filter(favBook => {
      return favBook.id !== objBook.id;
    });
    setFavoriteBooksIds(newFavBooksId);
    setFavoriteBooks(newFavBooks);
  };
  return (
    <BooksContainer>
      {Array.isArray(data) &&
        currentData.map(
          book =>
            book.type === "Text" && (
              <Grow key={book.id} in timeout={500}>
                <BookWrapper>
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
                            handleClick={() =>
                              handleRemoveBookFromFav(book.id, book)
                            }
                            favBook={true}
                          />
                        ) : (
                          <FavoriteBookButton
                            handleClick={() =>
                              handleAddBookToFav(book.id, book)
                            }
                            favBook={false}
                          />
                        )}
                      </ButtonsContainer>
                    </Zoom>
                  </BookContainer>
                </BookWrapper>
              </Grow>
            )
        )}
    </BooksContainer>
  );
};

export default BookView;

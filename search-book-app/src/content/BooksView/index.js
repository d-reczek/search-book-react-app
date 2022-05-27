import { useEffect, useState } from "react";
import axios from "axios";
import PageWrapper from "../../common/PageWrapper";
import ChangePageButton from "./ChangePageButton";
import BookView from "./BookView";
import ProgressCircle from "./ProgressCircle";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import ShowFavoritesBooksButton from "./ShowFavoritesBooksButton";
import { device } from "../../common/deviceBreakPoints";

const ChangePageButtonContainer = styled.div`
  position: fixed;
  top: 50%;
  left: ${props => props.theme.left};
  right: ${props => props.theme.right};
  display: ${props => (props.inputValue ? "none" : "inherit")};
  @media ${device.tablet} {
    left: ${props => props.theme.leftMobile};
    right: ${props => props.theme.rightMobile};
    top: 90%;
  }
  @media ${device.mobile} {
    left: ${props => props.theme.leftMobile};
    right: ${props => props.theme.rightMobile};
    top: 90%;
  }
`;
const leftPosition = {
  left: "15px",
  leftMobile: "-20px",
};
const rightPosition = {
  right: "0px",
  rightMobile: "-30px",
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin: 20px;
  padding: 20px;
`;
const NoBook = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 20px;
`;
const BooksView = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [forwardPageLoading, setForwardPageLoading] = useState(false);
  const [backPageLoading, setBackPageLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState(undefined);
  const [response, setResponse] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const urlToShowBooks = "https://gnikdroy.pythonanywhere.com/api/book/?page=";
  const urlToSearchBooks = `https://gnikdroy.pythonanywhere.com/api/book/?search=${inputValue}`;

  useEffect(() => {
    fetchData(urlToShowBooks, page);
  }, [page]);

  useEffect(() => {
    if (inputValue === "") {
      fetchData(urlToShowBooks, page);
      setResponse(null);
    }
    const timeoutId = setTimeout(() => {
      if (inputValue) {
        fetchData(urlToSearchBooks);
        setResponse(null);
      }
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [inputValue, page, urlToSearchBooks, urlToShowBooks]);

  const fetchData = (url, page = "") => {
    axios(`${url}${page}`)
      .then(res => {
        setData(res.data.results);
        setIsLoading(false);
        setForwardPageLoading(false);
        setBackPageLoading(false);
        setResponse(res.status);
      })
      .catch(err => {
        setError(true);
        setIsLoading(false);
        setErrorMessage(err.message);
        console.log("Error", err.message);
      });
  };

  let count = page;
  const fetchBooks = arrow => {
    if (arrow === "forward") {
      setForwardPageLoading(true);
      if (page === 6578) {
        setPage(1);
      } else {
        count += 1;
        setPage(count);
      }
    }
    if (arrow === "back") {
      setBackPageLoading(true);
      if (count === 1) {
        setPage(6578);
      } else {
        count -= 1;
        setPage(count);
      }
    }
  };

  const handleShowFavoritesBooks = () => {
    setShowFavorites(!showFavorites);
  };

  if (inputValue && response !== 200) {
    return (
      <>
        <Container>
          <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
          <ShowFavoritesBooksButton
            showFavorites={showFavorites}
            handleClick={handleShowFavoritesBooks}
          />
        </Container>
        <ProgressCircle height="100vh" />
      </>
    );
  }
  if (inputValue === "" && response !== 200) {
    return (
      <>
        <Container>
          <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
          <ShowFavoritesBooksButton
            showFavorites={showFavorites}
            handleClick={handleShowFavoritesBooks}
          />
        </Container>
        <ProgressCircle height="100vh" />
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <ProgressCircle height="100vh" />
      ) : (
        <>
          <Container>
            <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
            <ShowFavoritesBooksButton
              showFavorites={showFavorites}
              handleClick={handleShowFavoritesBooks}
            />
          </Container>
          <PageWrapper>
            <ChangePageButtonContainer
              inputValue={inputValue}
              theme={leftPosition}>
              {backPageLoading ? (
                <ProgressCircle />
              ) : (
                <ChangePageButton
                  handleClick={() => {
                    fetchBooks("back");
                  }}
                  type="back"
                />
              )}
            </ChangePageButtonContainer>
            <section>
              {data.length === 0 ? (
                <NoBook>There is no such thing </NoBook>
              ) : (
                <BookView
                  data={data}
                  error={error}
                  errorMessage={errorMessage}
                  showFavorites={showFavorites}
                />
              )}
            </section>
            <ChangePageButtonContainer
              inputValue={inputValue}
              theme={rightPosition}>
              {forwardPageLoading ? (
                <ProgressCircle />
              ) : (
                <ChangePageButton
                  handleClick={() => {
                    fetchBooks("forward");
                  }}
                  type="forward"
                />
              )}
            </ChangePageButtonContainer>
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default BooksView;

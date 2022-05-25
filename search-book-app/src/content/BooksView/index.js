import { useEffect, useState } from "react";
import axios from "axios";
import PageWrapper from "../../common/page-wrapper";
import ChangePageButton from "./change-page-button";
import BookView from "./book-view";
import ProgressCircle from "./progress-circle";
import styled from "styled-components";

const ChangePageButtonContainer = styled.div`
  position: fixed;
  top: 50%;
  left: ${props => props.theme.left};
  right: ${props => props.theme.right};
`;
const leftPosition = {
  left: "15px",
};
const rightPosition = {
  right: "15px",
};
const BooksView = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [forwardPageLoading, setForwardPageLoading] = useState(false);
  const [backPageLoading, setBackPageLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = page => {
    axios(`https://gnikdroy.pythonanywhere.com/api/book/?page=${page}`)
      .then(res => {
        setData(res.data.results);
        setIsLoading(false);
        setForwardPageLoading(false);
        setBackPageLoading(false);
      })
      .catch(err => {
        setError(true);
        setIsLoading(false);
        setErrorMessage(err.message);
        console.log("Error", err.message);
      });
  };

  let count = page;
  const handleForwardPage = () => {
    setForwardPageLoading(true);
    if (page === 6578) {
      setPage(1);
    } else {
      count += 1;
      setPage(count);
    }
  };
  const handleBackPage = () => {
    setBackPageLoading(true);
    if (count === 1) {
      setPage(6578);
    } else {
      count -= 1;
      setPage(count);
    }
  };
  // console.log("data", data);

  return (
    <>
      {isLoading ? (
        <ProgressCircle height="100vh" />
      ) : (
        <PageWrapper>
          <ChangePageButtonContainer
            theme={leftPosition}
            style={{ display: `${error ? "none" : "inherit"}` }}>
            {backPageLoading ? (
              <ProgressCircle />
            ) : (
              <ChangePageButton handleClick={handleBackPage} type="back" />
            )}
          </ChangePageButtonContainer>

          <section>
            <BookView
              setData={setData}
              data={data}
              error={error}
              errorMessage={errorMessage}
            />
          </section>
          <ChangePageButtonContainer
            style={{ display: `${error ? "none" : "inherit"}` }}
            theme={rightPosition}>
            {forwardPageLoading ? (
              <ProgressCircle />
            ) : (
              <ChangePageButton
                handleClick={handleForwardPage}
                type="forward"
              />
            )}
          </ChangePageButtonContainer>
        </PageWrapper>
      )}
    </>
  );
};

export default BooksView;

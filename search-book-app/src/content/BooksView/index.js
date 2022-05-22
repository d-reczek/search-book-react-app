import { useEffect, useState } from "react";
import axios from "axios";

import { styled as materialUIStyled } from "@mui/material/styles";

import PageWrapper from "../../common/page-wrapper";
import ChangePageButton from "./change-page-button";

import BookView from "./book-view";
import ProgressCircle from "./progress-circle";

const BooksView = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [forwardPageLoading, setForwardPageLoading] = useState(false);
  const [backPageLoading, setBackPageLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = page => {
    axios(`https://gnikdroy.pythonanywhere.com/api/book/?page=${page}`).then(
      res => {
        console.log(res);
        setData(res.data.results);
        setIsLoading(false);
        setForwardPageLoading(false);
        setBackPageLoading(false);
      }
    );
  };

  let count = page;
  const handleForwardPage = () => {
    if (page === 6578) {
      count = page;
    } else {
      count += 1;
      setPage(count);
      setForwardPageLoading(true);
    }
  };
  const handleBackPage = () => {
    if (count === 1) {
      count = page;
    } else {
      count -= 1;
      setPage(count);
      setBackPageLoading(true);
    }
  };
  console.log(data);
  return (
    <>
      {isLoading ? (
        <ProgressCircle />
      ) : (
        <PageWrapper>
          {backPageLoading ? (
            <ProgressCircle />
          ) : (
            <ChangePageButton handleClick={handleBackPage} type="back" />
          )}
          <section>
            <BookView data={data} />
          </section>
          {forwardPageLoading ? (
            <ProgressCircle />
          ) : (
            <ChangePageButton handleClick={handleForwardPage} type="forward" />
            // <ProgressCircle />
          )}
        </PageWrapper>
      )}
    </>
  );
};

export default BooksView;

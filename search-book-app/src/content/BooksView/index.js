import { useEffect, useState } from "react";
import axios from "axios";

import { styled as materialUIStyled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import styled from "styled-components";
import PageWrapper from "../../common";
import ChangePageButton from "./change-page-button";

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
  height: 100vh;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
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
  // justify-content: space-evenly;
`;

const BookInfoParagraph = styled.span`
  font-size: 16px;
`;
const BookTitleName = styled.h2`
  margin: 2px;
  font-size: 20px;
  font-weight: bold;
`;
const BooksView = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchData(page);
  }, [page]);

  console.log(data);
  const fetchData = page => {
    axios(`https://gnikdroy.pythonanywhere.com/api/book/?page=${page}`).then(
      res => {
        setData(res.data.results);
      }
    );
  };

  let count = page;
  const handleClick = () => {
    count += 1;
    setPage(count);
  };
  console.log(data);
  return (
    <PageWrapper>
      <ChangePageButton type="back" />
      <BooksContainer>
        {Array.isArray(data) &&
          data.map(
            book =>
              book.type === "Text" && (
                <>
                  <Paper
                    sx={{
                      p: 2,
                      width: "500px",
                    }}>
                    <BookContainer>
                      <BookInfoContainer>
                        {book.resources.map(
                          item =>
                            item.type === "image/jpeg" &&
                            item.uri.includes("medium") && (
                              <Img alt="book-cover" src={item.uri} />
                            )
                        )}
                        <div>
                          <BookInfoParagraph>Title:</BookInfoParagraph>
                          <BookTitleName>{book.title}</BookTitleName>
                          <BookInfoParagraph>Author:</BookInfoParagraph>

                          {book.agents.map(
                            item =>
                              item.type === "Author" && (
                                <BookTitleName>{item.person}</BookTitleName>
                              )
                          )}
                        </div>
                      </BookInfoContainer>
                      <div>
                        {book.resources.map(
                          item =>
                            item.type.includes("text/html" && "htm") &&
                            item.uri.includes(".htm") && (
                              <Button variant="outlined">
                                <Link
                                  underline="none"
                                  target="blank"
                                  href={item.uri}>
                                  READ BOOK
                                </Link>
                              </Button>
                            )
                        )}
                      </div>
                    </BookContainer>
                  </Paper>
                </>
              )
          )}
      </BooksContainer>
      <ChangePageButton type="forward" />
    </PageWrapper>
  );
};

export default BooksView;

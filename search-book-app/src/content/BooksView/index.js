import { useEffect, useState } from "react";
import axios from "axios";

import { styled as materialUIStyled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import styled from "styled-components";

const Img = materialUIStyled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100px",
  maxHeight: "200px",
});
const Container = styled.div`
  height: 100vh;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;
const BooksView = () => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchData(page);
  }, [page]);

  //   console.log(data);
  const fetchData = page => {
    axios(`https://gnikdroy.pythonanywhere.com/api/book/?search=sherlock`).then(
      res => {
        console.log("zzz");
        console.log(page);
        setData(res.data.results);
        // if (Array.isArray(data) && page === 1) {
        //   setData2(res.data.results);
        //   data2.push(data);
        //   console.log("tak");
        // }
        if (Array.isArray(data)) {
          setData2([...data2, ...res.data.results]);
          console.log("nie");
        }
      }
    );
  };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  //   setResources([...data]);

  let count = page;
  const handleClick = () => {
    // if (Array.isArray(data) && data.length >= 10 && page === 1) {
    //   data2.push(data);
    //   console.log("tak");
    // }
    // if (Array.isArray(data) && test) {
    //   setData2([...data2]);
    //   console.log("nie");
    // }
    count += 1;
    setPage(count);
    // setData2([...data]);
  };
  console.log(data);
  return (
    <Container>
      <button onClick={handleClick}>Klik</button>
      {Array.isArray(data) &&
        data.map(
          book =>
            book.type === "Text" && (
              <>
                <Paper
                  sx={{
                    p: 2,
                    width: "300px",
                    minHeight: "200px",
                  }}>
                  <Grid container spacing={2}>
                    <Grid item>
                      {book.resources.map(
                        item =>
                          item.type === "image/jpeg" &&
                          item.uri.includes("medium") && (
                            <Img alt="complex" src={item.uri} />
                          )
                      )}
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div">
                            {book.title}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {book.resources.map(
                            item =>
                              item.type.includes("text/html" && "htm") &&
                              item.uri.includes(".htm") && (
                                <Button variant="outlined">
                                  <Link
                                    underline="none"
                                    target="blank"
                                    href={item.uri}>
                                    READ
                                  </Link>
                                </Button>
                              )
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </>
            )
        )}
    </Container>
  );
};

export default BooksView;

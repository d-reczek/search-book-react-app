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
  const [resources, setResources] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  //   console.log(data);
  const fetchData = () => {
    axios("https://gnikdroy.pythonanywhere.com/api/book/?page=67").then(res => {
      setData(res.data.results);
      setResources(res.data.results.title);
    });
  };
  const getResources = fetchedData => {
    let result = "";
    if (Array.isArray(data)) {
      data.map(data => {
        data.resources.map(resource => {
          switch (resource.type) {
            case fetchedData:
              //   console.log(resource.uri);
              return (result = resource.uri);
          }
        });
      });
    }
    console.log(result);
    return result;
  };
  getResources("image/jpeg");
  console.log(data);
  return (
    <Container>
      {Array.isArray(data) &&
        data.map(book => (
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
                              <Link underline="none" target="blank" href={item.uri}>
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
        ))}
    </Container>
  );
};

export default BooksView;

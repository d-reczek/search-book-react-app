import { Button, Icon } from "@mui/material";

const FavouriteBook = ({ handleClick, add }) => {
  return (
    <Button onClick={handleClick}>
      <Icon sx={{ color: "red" }}>{add ? "favorite" : "favorite_border"}</Icon>
    </Button>
  );
};

export default FavouriteBook;

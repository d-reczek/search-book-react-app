import { Button, Icon } from "@mui/material";

const FavouriteBook = ({ handleClick, add, disable }) => {
  return (
    <Button disabled={disable} onClick={handleClick}>
      <Icon sx={{ color: "red" }}>{add ? "favorite" : "favorite_border"}</Icon>
    </Button>
  );
};

export default FavouriteBook;

import { Button, Icon, Typography } from "@mui/material";

const AddFavouriteBookButton = ({ handleClick, disable }) => {
  return (
    <Button variant="text" disabled={disable} onClick={handleClick}>
      add to fav
    </Button>
  );
};

export default AddFavouriteBookButton;

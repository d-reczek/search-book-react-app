import { Button, Icon, Tooltip } from "@mui/material";

const FavouriteBookButton = ({ handleClick }) => {
  return (
    <Tooltip title="Remove from fav" placement="top">
      <Button onClick={handleClick}>
        <Icon sx={{ color: "red" }}>favorite</Icon>
      </Button>
    </Tooltip>
  );
};

export default FavouriteBookButton;

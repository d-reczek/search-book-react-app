import { Button, Icon, Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";

const FavouriteBookButton = ({ handleClick }) => {
  return (
    <Tooltip title="Remove from fav" placement="top" TransitionComponent={Zoom}>
      <Button onClick={handleClick}>
        <Icon sx={{ color: "red" }}>favorite</Icon>
      </Button>
    </Tooltip>
  );
};

export default FavouriteBookButton;

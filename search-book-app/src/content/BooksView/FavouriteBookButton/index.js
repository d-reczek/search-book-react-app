import { Button, Icon, Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";

const FavouriteBookButton = ({ handleClick, favBook }) => {
  return (
    <Tooltip title="Remove from fav" placement="top" TransitionComponent={Zoom}>
      <Button onClick={handleClick}>
        <Icon sx={{ color: "red" }}>
          {favBook ? "favorite" : "favorite_border"}
        </Icon>
      </Button>
    </Tooltip>
  );
};

export default FavouriteBookButton;

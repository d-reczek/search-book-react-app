import { Button, Icon, Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";

const FavoriteBookButton = ({ handleClick, favBook }) => {
  return (
    <Tooltip title="Add to favorite" placement="top" TransitionComponent={Zoom}>
      <Button onClick={handleClick}>
        <Icon sx={{ color: "red" }}>
          {favBook ? "favorite" : "favorite_border"}
        </Icon>
      </Button>
    </Tooltip>
  );
};

export default FavoriteBookButton;

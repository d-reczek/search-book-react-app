import { Button } from "@mui/material";

const ShowFavoritesBooksButton = ({ handleClick, showFavorites }) => {
  return (
    <Button onClick={handleClick} sx={{ height: "40px" }} variant="outlined">
      {showFavorites ? "Hide fav" : "Show fav"}
    </Button>
  );
};

export default ShowFavoritesBooksButton;

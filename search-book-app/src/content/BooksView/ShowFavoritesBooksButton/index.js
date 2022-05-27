import { Button } from "@mui/material";

const ShowFavoritesBooksButton = ({ handleClick, showFavorites }) => {
  return (
    <Button onClick={handleClick} sx={{ height: "40px" }} variant="outlined">
      {showFavorites ? "Hide favorites books" : "Show favorites books"}
    </Button>
  );
};

export default ShowFavoritesBooksButton;

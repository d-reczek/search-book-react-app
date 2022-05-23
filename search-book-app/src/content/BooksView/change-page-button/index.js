import { Button, Icon } from "@mui/material";


const ChangePageButton = ({ type, handleClick }) => {
  return (
    <Button
      onClick={handleClick}
      sx={{ width: "100px", margin: "20px" }}
      variant="text">
      <Icon sx={{ fontSize: "60px" }}>arrow_{type}_ios</Icon>
    </Button>
  );
};

export default ChangePageButton;

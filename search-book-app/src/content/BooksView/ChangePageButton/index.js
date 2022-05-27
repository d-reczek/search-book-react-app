import { Button, Icon } from "@mui/material";

const ChangePageButton = ({ type, handleClick }) => {
  return (
    <Button
      onClick={handleClick}
      sx={{ width: "100px",  }}
      variant="text">
      <Icon sx={{ fontSize: "50px" }}>arrow_{type}_ios</Icon>
    </Button>
  );
};

export default ChangePageButton;

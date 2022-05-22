import { Button, Icon } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SvgIcon from "@mui/material/SvgIcon";

const ChangePageButton = ({ type }) => {
  return (
    <Button variant="text">
      {/* <ArrowBackIosIcon></ArrowBackIosIcon> */}
      <Icon sx={{ fontSize: "60px" }}>arrow_{type}_ios</Icon>
    </Button>
  );
};

export default ChangePageButton;

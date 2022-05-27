import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const ProgressCircle = ({ stylesChangePage }) => {
  return (
    <Box
      sx={{
        boxSizing: stylesChangePage ? "border-box" : "inherit",
        width: stylesChangePage ? "100px" : "inherit",
        padding: stylesChangePage ? "6px 8xp" : "inherit",
        display: "flex",
        height: stylesChangePage ? "inherit" : "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CircularProgress />
    </Box>
  );
};

export default ProgressCircle;

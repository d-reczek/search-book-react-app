import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const ProgressCircle = () => {
  return (
    <Box
      sx={{
        padding: "6px 8px",
        margin: "20px",
        marginTop: "0",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CircularProgress />
    </Box>
  );
};

export default ProgressCircle;

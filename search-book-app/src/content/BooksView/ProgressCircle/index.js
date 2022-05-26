import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const ProgressCircle = ({ height }) => {
  return (
    <Box
      sx={{
        margin: "0 50px",
        padding: "24px 8px",
        display: "flex",
        height: `${height}`,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CircularProgress />
    </Box>
  );
};

export default ProgressCircle;

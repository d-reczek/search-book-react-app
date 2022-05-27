import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const ProgressCircle = ({ height }) => {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100px",
        padding: "6px 8px",
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

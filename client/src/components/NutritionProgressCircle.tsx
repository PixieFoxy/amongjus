import { Box, CircularProgress } from "@mui/material";

type Props = {
  current: number | undefined;
  target: number | undefined;
  unit: string;
  color: string;
};

const NutritionProgressCircle = (props: Props) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={Math.min(
          100,
          ((props.current ? props.current : 0) /
            (props.target ? props.target : 0)) *
            100
        )}
        thickness={5}
        size={140}
        sx={{ color: props.color }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p className="font-overpass font-bold text-center">
          {props.current}/{props.target ? props.target : '-'} <br /> {props.unit}
        </p>
      </Box>
    </Box>
  );
};

export default NutritionProgressCircle;

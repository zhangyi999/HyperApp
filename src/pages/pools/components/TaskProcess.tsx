import React, { useState, useCallback, useMemo, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Close from "@mui/icons-material/Close";
import { Box, CardContent, CircularProgress, Stack } from "@mui/material";

export type TaskStatus = "normal" | "loading" | "success" | "fail";

export type Task = {
  name: string;
  status: TaskStatus;
};

type TaskProcessProps = {
  show: boolean;
  name: string;
  status: TaskStatus;
  duration?: number; // 结束后自动关闭时间(ms) 0表示不自动关闭，默认5000
  subTask?: Task[];
  onClose?: VoidFunction;
};
const TaskProcess: React.FC<TaskProcessProps> = ({
  name,
  show,
  status,
  subTask = [],
  onClose,
  duration = 5000,
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (["success", "fail"].includes(status) && onClose && duration !== 0) {
      setTimeout(() => onClose(), duration);
    }
  }, [duration, onClose, status]);

  const handleExpandClick = useCallback(() => {
    setExpanded((oldExpanded) => !oldExpanded);
  }, []);

  const icon = useMemo(() => {
    switch (status) {
      case "success":
        return <CheckCircleIcon color="success" />;
      case "fail":
        return <ErrorOutlineIcon color="error" />;
      case "loading":
        return <CircularProgress size="1rem" />;

      default:
        return null;
    }
  }, [status]);

  return (
    <Snackbar
      open={show}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        width: "100%",
        maxWidth: "320px",
      }}
    >
      <Card sx={{ width: "100%" }}>
        <CardActions>
          <Box
            sx={{
              width: "1.5rem",
              height: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              "& .MuiSvgIcon-root": {
                width: "1rem",
                height: "1rem",
              },
            }}
          >
            {icon}
          </Box>
          <Typography variant="subtitle2" sx={{ flex: 1, mx: 1 }}>
            {name}
          </Typography>
          {subTask.length > 0 && (
            <IconButton
              aria-label="Show more"
              onClick={handleExpandClick}
              sx={{
                transform: `rotate(${expanded ? 180 : 0}deg)`,
                transition: "transform 160ms",
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
          {status !== "loading" && (
            <IconButton
              aria-label="Show more"
              onClick={onClose}
              sx={{ ml: "0 !important" }}
            >
              <Close />
            </IconButton>
          )}
        </CardActions>
        {subTask.length > 0 && (
          <Collapse in={expanded} timeout="auto">
            <CardContent>
              <Typography gutterBottom>Process</Typography>
              {subTask.map((task, index) => (
                <TaskItem key={index} task={task} />
              ))}
            </CardContent>
          </Collapse>
        )}
      </Card>
    </Snackbar>
  );
};

export default TaskProcess;

function TaskItem(props: { task: Task }) {
  const icon = useMemo(() => {
    switch (props.task.status) {
      case "success":
        return <CheckCircleIcon color="success" />;
      case "fail":
        return <ErrorOutlineIcon color="error" />;
      case "loading":
        return <CircularProgress size="1rem" />;

      default:
        return null;
    }
  }, [props.task.status]);

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Box
        sx={{
          width: "1.5rem",
          height: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,

          "& .MuiSvgIcon-root": {
            width: "1rem",
            height: "1rem",
          },
        }}
      >
        {icon}
      </Box>
      <Typography variant="caption">{props.task.name}</Typography>
    </Stack>
  );
}

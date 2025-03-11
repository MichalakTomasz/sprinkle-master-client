import { Stack } from "@mui/material";
import Task from "./Task.jsx";
import { tasks } from "../setup/mock-data.js";

const Tasks = () => {
  return (
    <Stack 
    direction="row" 
    spacing={2}
    sx={{
        flexWrap: "wrap",
        rowGap: 2
    }}>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </Stack>
  );
};

export default Tasks;

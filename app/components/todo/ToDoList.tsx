"use client";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Container,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { ToDo } from "../types/todo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface Props {
  todos: ToDo[];
  onEdit: (todo: ToDo) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

const ToDoList = ({ todos, onEdit, onDelete, onComplete }: Props) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const filteredTodos = todos.filter((todo) => {
    if (tab === 0) return true; // All
    if (tab === 1) return !todo.completed; // Active
    return todo.completed; // Completed
  });

  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            width: "100%",
            borderBottom: 1,
            borderColor: "divider",
            mt: "20px",
          }}
        >
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label={`All (${todos.length})`} />
            <Tab
              label={`Active (${todos.filter((t) => !t.completed).length})`}
            />
            <Tab
              label={`Completed (${todos.filter((t) => t.completed).length})`}
            />
          </Tabs>
        </Box>
        <Grid container spacing={3} sx={{ mt: "50px" }}>
          {filteredTodos.length === 0 ? (
            <Typography  sx={{ width: "100%", mt: 5, textAlign: "center" }}>
              No todos found.
            </Typography>
          ) : (
            filteredTodos.map((todo) => (
              <Grid size={{ xs: 12 }} key={todo.id}>
                <Card
                  sx={{
                    width: "100%",
                    boxShadow: "none",
                    border: "1px solid #c9d6c9",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => onComplete(todo.id)}
                        color="primary"
                      />
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 500,
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {todo.text}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      {!todo.completed && (
                        <IconButton onClick={() => onEdit(todo)}>
                          <EditIcon sx={{ color: "#3a9fc9" }} />
                        </IconButton>
                      )}
                      <IconButton onClick={() => onDelete(todo.id)}>
                        <DeleteIcon sx={{ color: "#c93a41" }} />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ToDoList;

"use client";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ToDo } from "../types/todo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

interface Props {
  todos: ToDo[];
  onEdit: (todo: ToDo) => void
}

const ToDoList = ({ todos, onEdit }: Props) => {

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3} sx={{ mt: "50px" }}>
          {todos.map((todo) => {
            if (todo.completed) return null;
            return (
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
                    <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                      {todo.text}
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <IconButton onClick={() => onEdit(todo)}>
                        <EditIcon sx={{ color: "#3a9fc9" }} />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon sx={{ color: "#c93a41" }} />
                      </IconButton>
                      <IconButton>
                        <CheckCircleIcon sx={{ color: "#369636" }} />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default ToDoList;

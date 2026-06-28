"use client";

import { Box } from "@mui/material";
import ToDoForm from "./components/todo/ToDoForm";
import { useEffect, useState } from "react";
import { ToDo } from "./components/types/todo";

export default function Home() {
  const [todos, setToDos] = useState<ToDo[]>([]);

  useEffect(() => {
    const storedToDos = localStorage.getItem("todos");

    if (storedToDos) {
      setToDos(JSON.parse(storedToDos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addToDo = (text: string) => {
    const newToDo: ToDo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setToDos([...todos, newToDo]);
  };

  return (
    <Box>
      <ToDoForm onAddToDo={addToDo} />
    </Box>
  );
}

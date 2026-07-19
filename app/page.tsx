"use client";

import { Box } from "@mui/material";
import ToDoForm from "./components/todo/ToDoForm";
import { useEffect, useState } from "react";
import { ToDo } from "./components/types/todo";
import ToDoList from "./components/todo/ToDoList";
import EditToDoDialog from "./components/dialogs/EditToDo";

export default function Home() {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState<ToDo | null>(null);

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

  const EditToDo = (todo: ToDo) => {
    setSelectedToDo(todo);
    setOpenEditDialog(true);
  };

  const handleSave = (id: number, text: string) => {
    setToDos(todos.map((todo) => (todo.id == id ? { ...todo, text } : todo)));
  };

  return (
    <>
      <Box>
        <ToDoForm onAddToDo={addToDo} />
        <ToDoList todos={todos} onEdit={EditToDo} />
      </Box>

      {selectedToDo && (
        <EditToDoDialog
          open={openEditDialog}
          todo={selectedToDo}
          onClose={() => setOpenEditDialog(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}

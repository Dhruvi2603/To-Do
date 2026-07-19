import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { ToDo } from "../types/todo";
import { useEffect } from "react";

const schema = yup.object({
  text: yup
    .string()
    .required("ToDo is required")
    .min(3, "Minimum 3 characters required"),
});

interface Props {
    open: boolean,
    onClose: () => void,
    todo: ToDo,
    onSave: (id: number, text: string) => void
}

interface FormValues {
  text: string;
}

const EditToDoDialog = ({ open, onClose, todo, onSave } : Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      text: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if(todo) {
        reset({
            text: todo.text,
        })
    }
  }, [todo, reset])

  const onSubmit = (data: FormValues) => {
    if (!todo) return;

    onSave(todo.id, data.text)
    onClose()
  }

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogTitle>
        <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
          Edit To-Do
        </Typography>
      </DialogTitle>
      <Divider sx={{ border: "1px solid #c9d6c9" }} />
      <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Typography>To-Do</Typography>
        <Controller
          name="text"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              {...field}
              placeholder="Enter To-Do"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </DialogContent>
      
      <Divider sx={{ border: "1px solid #c9d6c9" }} />
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Close</Button>
        <Button type="submit" variant="contained">Update</Button>
      </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditToDoDialog;

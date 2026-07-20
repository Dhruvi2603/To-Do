"use client"

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  text: yup
    .string()
    .required("To-Do is required")
    .min(3, "Minimum 3 characters is required"),
});

interface Props {
  onAddToDo: (text: string) => void
}

interface FormValues {
  text: string;
}

const ToDoForm = ({onAddToDo}: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      text: "",
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    onAddToDo(data.text);
    reset();
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: "50px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 7, sm : 10 }}>
            <Controller
              control={control}
              name="text"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter your to-do"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 5, sm: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ color: "#fff", textTransform: "none", height: "52px" }}
            >
              Add To-Do
            </Button>
          </Grid>
        </Grid>
        </form>
      </Container>
    </>
  );
};

export default ToDoForm;

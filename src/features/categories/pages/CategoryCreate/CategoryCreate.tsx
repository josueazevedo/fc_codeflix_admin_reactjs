import { useEffect, useState } from "react";
import {
  categoryInitialState,
  useCreateCategoyMutation,
} from "../../categorySlice";
import { Box, Paper, Typography } from "@mui/material";
import { CategoryForm } from "../../components/CategoryForm/CategoryForm";
import { useSnackbar } from "notistack";
import { Category } from "../../../../types/Category";

export default function CategoryCreate() {
  const [createCategory, statusCreateCategory] = useCreateCategoyMutation();
  const [category, setCategory] = useState<Category>(categoryInitialState);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategory({ ...category, [name]: checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCategory(category);
  };

  useEffect(() => {
    if (statusCreateCategory.isSuccess) {
      enqueueSnackbar("Category created", { variant: "success" });
    }
    if (statusCreateCategory.isError) {
      enqueueSnackbar("Category not created", { variant: "error" });
    }
  }, [statusCreateCategory, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={category}
          isDisabled={statusCreateCategory.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
}

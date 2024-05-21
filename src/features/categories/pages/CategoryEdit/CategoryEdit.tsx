import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  categoryInitialState,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../categorySlice";
import React, { useEffect, useState } from "react";
import { CategoryForm } from "../../components/CategoryForm/CategoryForm";
import { useSnackbar } from "notistack";
import { Category } from "../../../../types/Category";

export const CategoryEdit = () => {
  const id = useParams().id || "";
  const { data: category, isFetching } = useGetCategoryQuery({ id });
  const [updateCategory, updateCategoryStatus] = useUpdateCategoryMutation();
  const [categoryState, setCategoryState] =
    useState<Category>(categoryInitialState);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateCategory(categoryState);
  };

  useEffect(() => {
    if (category) {
      setCategoryState(category.data);
    }
  }, [category]);

  useEffect(() => {
    if (updateCategoryStatus.isSuccess) {
      enqueueSnackbar("Category updated", { variant: "success" });
    }
    if (updateCategoryStatus.isError) {
      enqueueSnackbar("Category not updated", { variant: "error" });
    }
  }, [updateCategoryStatus, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          isDisabled={updateCategoryStatus.isLoading || isFetching}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};

import { Box, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Category, selectCategoryById, updateCategory } from '../categorySlice';
import React, { useState } from 'react';
import { CategoryForm } from '../components/CategoryForm/CategoryForm';


export const CategoryEdit = () =>  {
  const id = useParams().id || "";
  const category = useAppSelector((state) => selectCategoryById(state, id));
  const [categoryState, setCategoryState] = useState<Category>(category);
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({...categoryState, [name]: value});
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({...categoryState, [name]: checked});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateCategory(categoryState));
  }

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Edit Category</Typography>
          </Box>
        </Box>

        <CategoryForm 
          category={categoryState}
          isDisabled={isDisabled}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  )
}

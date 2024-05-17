import { useState } from 'react'
import { Category, createCategory } from '../categorySlice';
import { Box, Paper, Typography } from '@mui/material';
import { CategoryForm } from '../components/CategoryForm/CategoryForm';
import { useAppDispatch } from '../../../app/hooks';
import { useSnackbar } from 'notistack';

export default function CategoryCreate() {
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    created_at: "",
    deleted_at: "",
    updated_at: ""
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({...category, [name]: value});
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategory({...category, [name]: checked});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory(category));
    enqueueSnackbar("Category created successfully!", { variant: 'success'});
  }

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Create Category</Typography>
          </Box>
        </Box>

        <CategoryForm 
          category={category}
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

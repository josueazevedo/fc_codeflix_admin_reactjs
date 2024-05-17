import { useState } from 'react'
import { Category } from '../categorySlice';
import { Box, Paper, Typography } from '@mui/material';
import { CategoryForm } from '../components/CategoryForm/CategoryForm';

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

  const handleChange = () => {};

  const handleToggle = () => {};

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
          handleSubmit={() => {}}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  )
}

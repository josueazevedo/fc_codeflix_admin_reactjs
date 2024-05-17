import { Box, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks';
import { selectCategoryById } from '../categorySlice';
import { useState } from 'react';
import { CategoryForm } from '../components/CategoryForm/CategoryForm';


export const CategoryEdit = () =>  {
  const id = useParams().id || "";
  const category = useAppSelector((state) => selectCategoryById(state, id));

  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = () => {};

  const handleToggle = () => {};

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Edit Category</Typography>
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

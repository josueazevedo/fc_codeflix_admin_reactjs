import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deleteCategory, selectCategories } from '../categorySlice'
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';

export const CategoryList = () => {

  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const rows: GridRowsProp = categories.map(category => ({
    id: category.id,
    name: category.name,
    is_active: category.is_active,
    created_at: new Date(category.created_at)?.toLocaleDateString("pt-BR")
  }));

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,  
      renderCell: renderNameCell
    },
    { 
      field: 'is_active', 
      headerName: 'Active', 
      flex: 1, 
      type: "boolean",
      renderCell: renderIsActiveCell
    },
    { 
      field: 'created_at', 
      headerName: 'Created At', 
      flex: 1, 
    },
    { 
      field: 'id', 
      headerName: 'Actions', 
      flex: 1, 
      renderCell: renderIsActionCell
    },
  ];

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Box display="flex" alignItems="center" height="100%">
        <Link
        style={{ textDecoration: "none"  }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
      </Box>
    );
  }

  function renderIsActionCell(row: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handlerDeleteCategory(row.value)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  } 

  const handlerDeleteCategory = (id: string) => {
    dispatch(deleteCategory(id));
    enqueueSnackbar("Category deleted successfully!", { variant: 'success'});
  }

  function renderIsActiveCell(row: GridRenderCellParams) {
    return <Typography color={row.value ? "primary" : "secondary"}>
              {row.value ? "Active" : "Inactive"}
              </Typography>;
  }

  return (
   <Box
      maxWidth="lg"
      sx={{mt: 4, mb: 4}}
   >
    <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>

      </Box>
      <Box sx={{ display: "flex", height: 500, }}>
        <DataGrid 
              rows={rows} 
              columns={columns} 
              pageSizeOptions={[5, 10, 30, 50, 100]}
              slots={{ toolbar: GridToolbar }}
              disableColumnSelector={true}
              disableColumnFilter={true}
              disableDensitySelector={true}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: {
                    debounceMs: 500
                  }
                },
              }}
          />
      </Box>
   </Box>
  )
}

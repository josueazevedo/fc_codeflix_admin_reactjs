import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../categorySlice";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CategoryTable } from "../components/CategoryTable/CategoryTable";
import { GridFilterModel } from "@mui/x-data-grid";

export const CategoryList = () => {
  const [perPage, setPerPage] = useState(10);
  const [rowsPerPage] = useState([10, 20, 30]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const options = { page, perPage, rowsPerPage, search };

  const { data: result, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handlerDeleteCategory = async (id: string) => {
    await deleteCategory({ id });
  };

  const handleOnPageChange = (page: number) => {
    setPage(page + 1);
  };

  const handleOnPageSizeChange = (perPage: number) => {
    setPerPage(perPage);
  };

  const handleFilterChange = (filter: GridFilterModel) => {
    if (filter.quickFilterValues?.length) {
      setSearch(filter.quickFilterValues.join(""));
    } else {
      setSearch("");
    }
  };

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted successfully!", { variant: "success" });
    }
    if (deleteCategoryStatus.isError) {
      enqueueSnackbar("Error deleting category!", { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching categories</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4 }}>
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
      <CategoryTable
        data={result}
        isFetching={isFetching}
        perPage={perPage}
        page={page}
        rowsPerPage={rowsPerPage}
        handleDelete={handlerDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};

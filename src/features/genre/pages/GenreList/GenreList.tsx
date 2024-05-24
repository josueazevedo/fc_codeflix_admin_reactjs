import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteGenreMutation, useGetGenresQuery } from "../../genreSlice";
import { GenresTable } from "../../components/GenreTable/GenreTable";

export const GenreList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState({
    page: 1,
    search: "",
    perPage: 10,
    rowsPerPage: [10, 20, 30],
  });

  const { data, isFetching, error } = useGetGenresQuery(options);
  const [deleteGenre, deleteStatus] =
    useDeleteGenreMutation();

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page: page + 1 });
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, search: "" });
    }
    const search = filterModel.quickFilterValues.join("");
    setOptions({ ...options, search });
  }

  async function handleDeleteGenre(id: string) {
    await deleteGenre({ id });
  }

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      enqueueSnackbar(`Genre deleted`, { variant: "success" });
    }
    if (deleteStatus.isError) {
      enqueueSnackbar(`Genre not deleted`, { variant: "error" });
    }
  }, [deleteStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching genres</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/genres/create"
          style={{ marginBottom: "1rem" }}
        >
          New Genre
        </Button>
      </Box>

      <GenresTable
        data={data}
        page={options.page}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteGenre}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
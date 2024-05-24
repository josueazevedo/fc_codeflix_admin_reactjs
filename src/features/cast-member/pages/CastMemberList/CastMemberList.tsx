import { useEffect, useState } from "react";
import {
  useDeleteCastMemberMutation,
  useGetcastMembersQuery,
} from "../../castMemberSlice";
import { useSnackbar } from "notistack";
import { GridFilterModel } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CastMembersTable } from "../../components/CastMemberTable/CastMemberTable";

export const CastMemberList = () => {
  const [perPage, setPerPage] = useState(10);
  const [rowsPerPage] = useState([10, 20, 30]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [type, setType] = useState(0);

  const options = { page, perPage, rowsPerPage, search, type };

  const { data: result, isFetching, error } = useGetcastMembersQuery(options);
  const [deleteCastMember, deleteCastMemberStatus] =
    useDeleteCastMemberMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handlerDeleteCategory = async (id: string) => {
    await deleteCastMember({ id });
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
    if (deleteCastMemberStatus.isSuccess) {
      enqueueSnackbar("Cast Member deleted successfully!", {
        variant: "success",
      });
    }
    if (deleteCastMemberStatus.isError) {
      enqueueSnackbar("Error deleting Cast Member!", { variant: "error" });
    }
  }, [deleteCastMemberStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching Cast Members</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cast-members/create"
          style={{ marginBottom: "1rem" }}
        >
          New Cast Member
        </Button>
      </Box>
      <CastMembersTable
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

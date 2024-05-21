import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Results } from "../../../../types/CastMembers";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

type props = {
  data: Results | undefined;
  perPage: number;
  page: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
};

export const CastMembersTable = ({
  data,
  perPage,
  page,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: props) => {
  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const columns: GridColDef[] = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      renderCell: renderNameCell,
    },
    {
      flex: 1,
      field: "type",
      headerName: "Type",
      renderCell: renderTypeCell,
    },
    {
      flex: 1,
      field: "id",
      headerName: "Actions",
      renderCell: renderActionsCell,
    },
  ];

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(params.value)}
        aria-label="delete"
        data-testid="delete-button"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderTypeCell(rowData: GridRenderCellParams) {
    return (
      <Box display="flex" alignItems="center" height="100%">
        <Typography color="primary">
          {rowData.value === 1 ? "Diretor" : "Actor"}
        </Typography>
      </Box>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Box display="flex" alignItems="center" height="100%">
        <Link
          style={{ textDecoration: "none" }}
          to={`/cast-members/edit/${rowData.id}`}
        >
          <Typography color="primary">{rowData.value}</Typography>
        </Link>
      </Box>
    );
  }

  function mapDataToGridRows(data: Results) {
    const { data: castMembers } = data;
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
    }));
  }

  const rows = data ? mapDataToGridRows(data) : [];

  const rowCount = data?.meta?.total || 0;
  return (
    <Box sx={{ display: "flex", height: 500, pb: 4 }}>
      <DataGrid
        rows={rows}
        pagination={true}
        columns={columns}
        pageSizeOptions={rowsPerPage}
        slots={{ toolbar: GridToolbar }}
        disableColumnSelector={true}
        disableColumnFilter={true}
        disableDensitySelector={true}
        checkboxSelection={false}
        slotProps={componentProps}
        paginationModel={{
          pageSize: perPage,
          page: page - 1,
        }}
        paginationMode="server"
        filterMode="server"
        loading={isFetching}
        rowCount={rowCount}
        onPaginationModelChange={(page) => {
          handleOnPageChange(page.page);
          handleOnPageSizeChange(page.pageSize);
        }}
        onFilterModelChange={(filter) => handleFilterChange(filter)}
      />
    </Box>
  );
};

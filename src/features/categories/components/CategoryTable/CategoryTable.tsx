import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Results } from "../../../../types/Category";
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

export const CategoryTable = ({
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
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: "is_active",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "id",
      headerName: "Actions",
      flex: 1,
      renderCell: renderIsActionCell,
    },
  ];

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Box display="flex" alignItems="center" height="100%">
        <Link
          style={{ textDecoration: "none" }}
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
        onClick={() => handleDelete(row.value)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? "primary" : "secondary"}>
        {row.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      isActive: category.is_active,
      created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
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

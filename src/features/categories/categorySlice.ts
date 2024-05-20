import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  Category,
  CategoryParams,
  Result,
  Results,
} from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }

  if (params.search) {
    query.append("search", params.search);
  }

  if (params.isActive) {
    query.append("is_active", params.isActive.toString());
  }

  return query.toString();
}

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search, isActive: true };

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

function createCategoryMutation(category: Category) {
  return { url: endpointUrl, method: "POST", body: category };
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category,
  };
}

function getCategory({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategory: query<Result, { id: string }>({
      query: getCategory,
      providesTags: ["Categories"],
    }),
    createCategoy: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

const categories: Category[] = [
  {
    id: "any_id",
    name: "any_name",
    description: "any_description",
    is_active: true,
    deleted_at: null,
    created_at: "2023-08-12",
    updated_at: "2023-08-12",
  },
  {
    id: "any_id 2",
    name: "any_name 2",
    description: "any_description",
    is_active: false,
    deleted_at: null,
    created_at: "2023-08-12",
    updated_at: "2023-08-12",
  },
];

export const initialState = [...categories];

const categoriesSlide = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      const index = state.findIndex((c) => c.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      const index = state.findIndex((c) => c.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

//selectors
export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((c) => c.id === id);
  return category || ({} as Category);
};

//actions
export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlide.actions;

//api
export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoyMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} = categoriesApiSlice;

const categoriesReducer = categoriesSlide.reducer;

export default categoriesReducer;

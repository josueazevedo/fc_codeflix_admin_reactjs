import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Category, Results } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/categories";

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query }) => ({
        getCategories: query<Results, void>({
            query: () => `${endpointUrl}`,
            providesTags: ["Categories"]
        })
    }),

});


const categories: Category[] = [
    {
        id: 'any_id',
        name: "any_name",
        description: "any_description",
        is_active: true,
        deleted_at: null,
        created_at: "2023-08-12",
        updated_at: "2023-08-12"
    },
    {
        id: 'any_id 2',
        name: "any_name 2",
        description: "any_description",
        is_active: false,
        deleted_at: null,
        created_at: "2023-08-12",
        updated_at: "2023-08-12"
    }
];

export const initialState = [...categories];

const categoriesSlide = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        createCategory(state, action) {
            state.push(action.payload);
        },
        updateCategory(state, action) {
            const index = state.findIndex(c => c.id === action.payload.id);
            state[index] = action.payload;
        },
        deleteCategory(state, action) {
            const index = state.findIndex(c => c.id === action.payload.id);
            state.splice(index, 1)
        },
    }
});

//selectors
export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
    const category = state.categories.find(c => c.id === id);
    return category || {} as Category;
};

//actions
export const { createCategory, updateCategory, deleteCategory } = categoriesSlide.actions;

//api
export const { useGetCategoriesQuery } = categoriesApiSlice;

const categoriesReducer = categoriesSlide.reducer;

export default categoriesReducer;
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
    id: string,
    name: string,
    description: string | null,
    is_active: boolean,
    deleted_at: string | null,
    created_at: string,
    updated_at: string
}

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
        createCategory(state, action) {},
        updateCategory(state, action) {},
        deleteCategory(state, action) {},
    }
});

//selectors
export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
    const category = state.categories.find(c => c.id === id);
    return category || {} as Category;
};

const categoriesReducer = categoriesSlide.reducer;

export default categoriesReducer;
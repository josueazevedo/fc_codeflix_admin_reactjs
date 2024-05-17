import { createSlice } from "@reduxjs/toolkit";

interface Category {
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

const categoriesReducer = categoriesSlide.reducer;

export default categoriesReducer;
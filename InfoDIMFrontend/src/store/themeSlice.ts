import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  themeColor: string;
}

const initialState: ThemeState = {
  themeColor: 'blue', // Default theme color
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeColor: (state, action: PayloadAction<string>) => {
      state.themeColor = action.payload;
    },
  },
});

export const { setThemeColor } = themeSlice.actions;

export default themeSlice.reducer;
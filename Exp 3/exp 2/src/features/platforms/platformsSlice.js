import { createSlice } from "@reduxjs/toolkit";

const platformsSlice = createSlice({
  name: "platforms",

  initialState: {
    list: [
      {
        id: "facebook",
        name: "Facebook",
        maxCharacters: 63206,
        selected: false,
      },

      {
        id: "instagram",
        name: "Instagram",
        maxCharacters: 2200,
        selected: false,
      },

      {
        id: "twitter",
        name: "Twitter/X",
        maxCharacters: 280,
        selected: false,
      },

      {
        id: "linkedin",
        name: "LinkedIn",
        maxCharacters: 3000,
        selected: false,
      },
    ],
  },

  reducers: {
    selectPlatform: (state, action) => {
      const platform = state.list.find(
        (p) => p.id === action.payload
      );

      if (platform) {
        platform.selected =
          !platform.selected;
      }
    },

    resetPlatforms: (state) => {
      state.list.forEach((platform) => {
        platform.selected = false;
      });
    },
  },
});

export const {
  selectPlatform,
  resetPlatforms,
} = platformsSlice.actions;

export default platformsSlice.reducer;
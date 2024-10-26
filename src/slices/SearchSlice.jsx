import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  profiles: [],
  quizzes: [],
  sortBy: "profiles",
};

const url = "http://localhost:5000";

export const getSearch = createAsyncThunk("getSearch", async (topic) => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(`${url}/api/search?topic=${topic}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const SearchSlice = createSlice({
  initialState,
  name: "Search",
  reducers: {
    changeSort: (state, action) => {
      state.sortBy = action.payload;
    },
    setFollow: (state, action) => {
      const { name, newFollowers } = action.payload;
      const newResults = state.profiles.map((profile) => {
        if (profile.username === name) {
          return { ...profile, followers: newFollowers };
        } else {
          return profile;
        }
      });
      state.profiles = newResults;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getSearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizzes = action.payload.quizzes;
        state.profiles = action.payload.users;
      }),
});

export default SearchSlice.reducer;
export const { changeSort, setFollow } = SearchSlice.actions;

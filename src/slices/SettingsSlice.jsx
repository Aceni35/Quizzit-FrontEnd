import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  followers: [],
  followersLoading: false,
  following: [],
  followingLoading: false,
  usernameLoading: false,
  passwordLoading: false,
};
const url = "http://localhost:5000/api";

export const changePassword = createAsyncThunk(
  "changePassword",
  async ({ pass, confirmPass }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.post(
        `${url}/changePassword`,
        {
          newPassword: confirmPass,
          oldPassword: pass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getFollowers = createAsyncThunk(
  "getFollowers",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(`${url}/getFollowers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const removeFollowing = createAsyncThunk(
  "removeFollowing",
  async (name) => {
    const token = localStorage.getItem("token");
    try {
      const rsp = await axios.post(
        `${url}/removeFollowing`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(rsp.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const removeFollower = createAsyncThunk(
  "removeFollower",
  async (name) => {
    const token = localStorage.getItem("token");
    try {
      const rsp = await axios.post(
        `${url}/removeFollower`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(rsp.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getFollowing = createAsyncThunk(
  "getFollowing",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(`${url}/getFollowing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const SettingsSlice = createSlice({
  name: "Settings",
  initialState,
  reducers: {
    updateFollowers: (state, action) => {
      state.followers = state.followers.filter((x) => x != action.payload);
    },
    updateFollowing: (state, action) => {
      state.following = state.following.filter((x) => x != action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.passwordLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.passwordLoading = false;
        toast.success("Password Changed");
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordLoading = false;
        toast.error(action.payload);
      })
      .addCase(getFollowers.pending, (state) => {
        state.followersLoading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.followers = action.payload.followers;
        state.followersLoading = false;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.followersLoading = false;
        toast.error(action.payload);
      })
      .addCase(getFollowing.pending, (state) => {
        state.followingLoading = true;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.following = action.payload.following;
        state.followingLoading = false;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.followingLoading = false;
        toast.error(action.payload);
      });
  },
});

export default SettingsSlice.reducer;
export const { updateFollowers, updateFollowing } = SettingsSlice.actions;

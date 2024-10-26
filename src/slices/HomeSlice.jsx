import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setFollow } from "./SearchSlice";
import { toast } from "react-toastify";

const initialState = () => {
  const Token = localStorage.getItem("token");
  return {
    isLogged: false,
    login: true,
    username: "",
    token: Token,
    followers: [],
    fyp: [],
    showNav: false,
    fypLoading: true,
    isLoading: false,
    isSendLoading: false,
    userProfile: null,
    count: 0,
    canLoadMore: false,
    canProfileLoadMore: true,
    profileCount: 0,
    profileLoading: true,
    playRecord: {},
    homeLoading: true,
  };
};

const url = "http://localhost:5000";

export const sendData = createAsyncThunk(
  "sendData",
  async (input, thunkAPI) => {
    console.log("run");
    let keyWord = thunkAPI.getState().home.login ? "login" : "register";
    try {
      const resp = await axios.post(`${url}/api/${keyWord}`, {
        username: input.username,
        password: input.password,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getProfile = createAsyncThunk(
  "getProfile",
  async (data, thunkAPI) => {
    const { name, profileCount: number } = data;
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.get(
        `${url}/api/loadProfile?name=${name}&count=${number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
      const oldPosts = thunkAPI.getState().home.fyp;
      return { ...resp.data, oldPosts };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const sendComment = createAsyncThunk(
  "sendComment",
  async ({ comment, postId }) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.post(
        `${url}/api/comment`,
        { comment, postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const sendLike = createAsyncThunk("sendLike", async (id) => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.post(
      `${url}/api/likePost`,
      {
        id,
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
    throw error;
  }
});

export const followUser = createAsyncThunk(
  "followUser",
  async ({ user }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.post(
        `${url}/api/follow`,
        {
          user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(
        setFollow({ newFollowers: resp.data.newFollowers2, name: user })
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getFyp = createAsyncThunk("get/fyp", async (number, thunkAPI) => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(`${url}/api/getFyp?count=${number}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const oldFyp = thunkAPI.getState().home.fyp;
    return { ...resp.data, oldFyp };
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const createTextPost = createAsyncThunk(
  "crateTextPost",
  async (input) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.post(
        `${url}/api/textPost`,
        {
          postType: "text",
          postText: input,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getPlayRecords = createAsyncThunk(
  "getPlayRecords",
  async (req, res) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.get(`${url}/api/recordPlay`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const HomeSlice = createSlice({
  name: "home",
  initialState: initialState(),
  reducers: {
    changeLogin: (state) => {
      state.login = !state.login;
    },
    changeNav: (state) => {
      state.showNav = !state.showNav;
    },
    setCount: (state) => {
      state.count = 0;
    },
    setProfileCount: (state) => {
      state.profileCount = 0;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(sendData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.username = action.payload.username;
        localStorage.setItem("username", action.payload.username);
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(sendData.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(getFyp.pending, (state, action) => {
        const { arg } = action.meta;
        if (arg === 0) {
          state.fyp = [];
          state.fypLoading = true;
        }
      })
      .addCase(getFyp.fulfilled, (state, action) => {
        state.fypLoading = false;
        const fypContent = action.payload.posts.map((post) => {
          return { ...post, isLoading: false };
        });
        state.fyp = [...action.payload.oldFyp, ...fypContent];
        state.count = state.count + 1;
        state.canLoadMore = action.payload.canLoadMore;
      })
      .addCase(getFyp.rejected, (state) => {
        state.fypLoading = false;
      })
      .addCase(sendLike.fulfilled, (state, action) => {
        const { newPost, hasLiked } = action.payload;
        const newPosts = state.fyp.map((post) => {
          if (post._id === newPost._id) {
            return { ...newPost, hasLiked, isLoading: false };
          } else {
            return post;
          }
        });
        state.fyp = newPosts;
      })
      .addCase(sendLike.pending, (state, action) => {
        const id = action.meta.arg;
        const newPosts = state.fyp.map((post) => {
          if (post._id === id) {
            return { ...post, isLoading: true };
          } else {
            return post;
          }
        });
        state.fyp = newPosts;
      })
      .addCase(createTextPost.fulfilled, (state, action) => {
        const { newPost } = action.payload;
        state.fyp = [
          { ...newPost, isLoading: false, hasLiked: false },
          ...state.fyp,
        ];
        state.isSendLoading = false;
      })
      .addCase(createTextPost.pending, (state) => {
        state.isSendLoading = true;
      })
      .addCase(createTextPost.rejected, (state) => {
        state.isSendLoading = false;
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        const { _id: postId } = action.payload.post;
        const newPosts = state.fyp.map((post) => {
          if (post._id === postId) {
            return { ...post, comments: [...action.payload.post.comments] };
          } else {
            return post;
          }
        });
        state.fyp = newPosts;
      })
      .addCase(getProfile.pending, (state, action) => {
        const { arg } = action.meta;
        if (arg.profileCount === 0) {
          state.profileLoading = true;
          state.fyp = [];
        }
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const { arg } = action.meta;
        const fypContent = action.payload.userPosts.map((post) => {
          return { ...post, isLoading: false };
        });
        state.fyp = [...action.payload.oldPosts, ...fypContent];

        state.userProfile = action.payload.userProfile;
        state.username = action.payload.username;
        state.canProfileLoadMore = action.payload.canLoadMore;
        state.profileLoading = false;
        state.profileCount = arg.profileCount + 1;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.userProfile.followers = action.payload.newFollowers2;
      })
      .addCase(getPlayRecords.pending, (state) => {
        state.homeLoading = true;
      })
      .addCase(getPlayRecords.fulfilled, (state, action) => {
        state.playRecord = action.payload;
        state.homeLoading = false;
      })
      .addCase(getPlayRecords.rejected, (state, action) => {
        toast.error("something went wrong");
      }),
});

export default HomeSlice.reducer;
export const { changeLogin, changeNav, setCount } = HomeSlice.actions;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  question: 0,
  questions: [],
  isLoading: true,
  isQuizLoading: true,
  showOverlay: false,
  points: 0,
  picked: 0,
  show: 0,
  quiz: null,
  correct: 0,
  started: false,
  partyLoading: false,
  party: null,
  partyOwner: null,
  partyMembers: [],
  modalLoading: false,
  socket: null,
  rankings: [],
  answers: [],
  roundResults: [],
};

const url = "http://localhost:5000";

export const getSingleQuiz = createAsyncThunk(
  "getSingleQuiz",
  async ({ id }) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.get(`${url}/api/getSingleQuiz?id=${id}`, {
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

export const getParty = createAsyncThunk(
  "getParty",
  async ({ input: code }, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.post(
        `${url}/api/getParty`,
        {
          code,
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

export const createParty = createAsyncThunk("createParty", async ({ id }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `${url}/api/createParty`,
      { gameId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const sendPlayQuiz = createAsyncThunk("sendPlay", async ({ id }) => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.patch(
      `${url}/api/sendPlay`,
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(resp);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const PlaySlice = createSlice({
  initialState,
  name: "Play",
  reducers: {
    setShow: (state, action) => {
      if (
        action.payload === 0 &&
        state.questions.length === state.question + 1
      ) {
        if (state.party != null) {
          state.show = 5;
          return;
        }
        state.show = 2;
      } else {
        state.show = action.payload;
      }
    },
    setQuestion: (state) => {
      if (state.question != state.questions.length - 1) {
        state.question = state.question + 1;
      }
    },
    setScore: (state, action) => {
      let newQuestions = state.questions.map((q, index) => {
        if (index === state.question) {
          return { ...q, ans: action.payload };
        } else {
          return q;
        }
      });
      state.questions = newQuestions;
      if (action.payload) {
        state.points = state.points + 50;
        state.correct += 1;
      }
    },
    resetPlayState: () => {
      return initialState;
    },
    addMember: (state, action) => {
      state.partyMembers = [...state.partyMembers, action.payload.name];
    },
    setSocket: (state, action) => {
      state.socket = action.payload.socket;
    },
    setParty: (state, action) => {
      state.partyOwner = action.payload.name;
      state.partyMembers = action.payload.members;
      action.payload.setIsLoading(false);
    },
    removePlayer: (state, action) => {
      const newPlayers = state.partyMembers.filter((member) => {
        return member != action.payload;
      });
      state.partyMembers = newPlayers;
    },
    startGame: (state) => {
      state.started = true;
      state.show = 0;
      const rankings = state.partyMembers.map((member) => {
        return { name: member, points: 0 };
      });
      state.rankings = rankings;
    },
    resetParty: (state) => {
      state.party = null;
      state.partyOwner = null;
      state.partyMembers = [];
      state.rankings = [];
      state.roundResults = [];
      state.question = 0;
      state.started = false;
      state.points = 0;
    },
    receiveAnswer: (state, action) => {
      state.answers = [
        ...state.answers,
        { player: action.payload.from, answer: action.payload.answer },
      ];
    },
    clearAnswers: (state, action) => {
      state.answers = [];
    },
    setAnswers: (state, action) => {
      state.answers = action.payload.answers;
      const newRankings = state.rankings.map((player) => {
        const record = action.payload.answers.find(
          (pl) => pl.player === player.name
        );
        console.log(record);
        if (!record) return { ...player };
        return { ...player, points: player.points + record.points };
      });
      state.roundResults = action.payload.answers.sort(
        (a, b) => b.points - a.points
      );
      const username = localStorage.getItem("username");
      state.points = newRankings.find(
        (player) => player.name === username
      ).points;
      const finalRankings = newRankings.sort((a, b) => b.points - a.points);
      state.rankings = finalRankings;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getSingleQuiz.pending, (state, action) => {
        if (action.meta.arg.type === 1) {
          state.isQuizLoading = true;
        } else {
          state.isLoading = true;
        }
      })
      .addCase(getSingleQuiz.rejected, (state, action) => {
        if (action.meta.arg.type === 1) {
          state.isQuizLoading = false;
        } else {
          state.isLoading = false;
        }
      })
      .addCase(getSingleQuiz.fulfilled, (state, action) => {
        if (action.meta.arg.type === 1) {
          state.isQuizLoading = false;
        } else {
          state.isLoading = false;
        }
        state.questions = action.payload.quiz.questions;
        state.quiz = action.payload.quiz;
      })
      .addCase(createParty.pending, (state) => {
        state.partyLoading = true;
        state.show = 3;
      })
      .addCase(createParty.rejected, (state) => {
        state.partyLoading = false;
      })
      .addCase(createParty.fulfilled, (state, action) => {
        state.party = action.payload.party;
        const id = action.meta.arg.id;
        state.partyMembers = [localStorage.getItem("username")];
        state.partyLoading = false;
        const { navigate } = action.meta.arg;
        console.log(state.show);
        navigate(`/playQuiz/friends/${action.payload.party.code}`);
      })
      .addCase(getParty.fulfilled, (state, action) => {
        state.party = action.payload.party;
        state.modalLoading = false;
        state.show = 3;
        state.partyMembers = action.payload.party.players;
        action.meta.arg.modalSocket.emit(
          "player-joined",
          action.payload.party.players
        );
        action.meta.arg.setShow(false);
        action.meta.arg.navigate(`/playQuiz/friends/${action.meta.arg.input}`);
      })
      .addCase(getParty.rejected, (state, action) => {
        state.modalLoading = false;
        toast.error(action.payload);
      })
      .addCase(getParty.pending, (state) => {
        state.modalLoading = true;
      }),
});

export default PlaySlice.reducer;
export const {
  setShow,
  setQuestion,
  setScore,
  resetPlayState,
  addMember,
  setSocket,
  setParty,
  removePlayer,
  resetParty,
  startGame,
  receiveAnswer,
  setAnswers,
  clearAnswers,
} = PlaySlice.actions;

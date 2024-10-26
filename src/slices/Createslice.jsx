import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  info: { name: "", desc: "", time: 15, type: "Other" },
  showInfo: false,
  questions: [
    {
      question: "",
      type: 4,
      number: 1,
      correct: 1,
      options: ["", "", "", ""],
      correctText: "",
    },
  ],
  selected: {
    question: "",
    type: 4,
    number: 1,
    correct: 1,
    options: ["", "", "", ""],
    correctText: "",
  },
  count: 1,
  isLoading: false,
  isGetLoading: true,
  userQuizzes: [],
  id: null,
  deleteLoading: false,
  completed: false,
};
const url = "http://localhost:5000";

export const updateQuizz = createAsyncThunk("updateQuiz", async (data) => {
  const token = localStorage.getItem("token");
  const { info, questions, id, completed, setShow } = data;
  try {
    const resp = await axios.patch(
      `${url}/api/updateQuiz`,
      {
        questions,
        info,
        completed,
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(resp.data);
    setShow(false);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const deleteQuiz = createAsyncThunk("deleteQuiz", async ({ id }) => {
  const token = localStorage.getItem("token");
  console.log(id);
  try {
    const resp = await axios.delete(`${url}/api/deleteQuiz`, {
      data: {
        id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(resp);
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const sendQuiz = createAsyncThunk(
  "sendQuiz",
  async ({ questions, info, setShow, navigate, toast, completed }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${url}/api/quizPost`,
        {
          questions,
          info,
          completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return { res, navigate, toast };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getUserQuizzes = createAsyncThunk("getQuizzes", async () => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(`${url}/api/getQuizzes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const CreateSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    changeType: (state, action) => {
      state.selected.type = Number(action.payload);
      state.selected.correct = 1;
    },
    changeSelected: (state, action) => {
      state.showInfo = false;
      const selected = state.questions.find(
        (q) => q.number === action.payload.x
      );
      let savedQuestion;
      savedQuestion = {
        ...state.selected,
        options: [
          action.payload.Options.o1,
          action.payload.Options.o2,
          action.payload.Options.o3,
          action.payload.Options.o4,
        ],
      };
      savedQuestion.question = action.payload.Question;
      const newQuestions = state.questions.map((q) => {
        if (q.number === state.selected.number) {
          return savedQuestion;
        } else {
          return q;
        }
      });

      state.questions = newQuestions;
      state.selected = selected;
    },
    addMore: (state) => {
      state.questions = [
        ...state.questions,
        {
          question: "",
          type: 4,
          number: state.count + 1,
          correct: 1,
          options: ["", "", "", ""],
        },
      ];
      state.count = state.count + 1;
    },
    changeCorrect: (state, action) => {
      console.log(action.payload);
      state.selected.correct = action.payload;
    },
    infoShow: (state, action) => {
      let savedQuestion = {
        ...state.selected,
        options: [
          action.payload.Options.o1,
          action.payload.Options.o2,
          action.payload.Options.o3,
          action.payload.Options.o4,
        ],
      };
      savedQuestion.question = action.payload.Question;
      const newQuestions = state.questions.map((q) => {
        if (q.number === savedQuestion.number) {
          return savedQuestion;
        } else {
          return q;
        }
      });
      state.questions = newQuestions;
      state.showInfo = true;
    },
    removeQuestion: (state, action) => {
      if (state.count != 1) {
        const newStates = state.questions.filter((q) => {
          return q.number != action.payload;
        });
        const newNumbers = newStates.map((q, index) => {
          return { ...q, number: index + 1 };
        });
        state.questions = newNumbers;
        state.count = newNumbers.length;
        if (state.selected.number === action.payload) {
          state.selected = newNumbers[0];
        }
      }
    },
    saveQuestion: (state, action) => {
      const savedQuestion = {
        ...state.selected,
        options: [
          action.payload.Options.o1,
          action.payload.Options.o2,
          action.payload.Options.o3,
          action.payload.Options.o4,
        ],
      };
      savedQuestion.question = action.payload.Question;

      const newQuestions = state.questions.map((q) => {
        return q.number === savedQuestion.number ? savedQuestion : q;
      });

      return {
        ...state,
        selected: savedQuestion,
        questions: newQuestions,
      };
    },

    changeNumber: (state, action) => {
      let savedQuestion = {
        ...state.selected,
        options: [
          action.payload.Options.o1,
          action.payload.Options.o2,
          action.payload.Options.o3,
          action.payload.Options.o4,
        ],
      };
      savedQuestion.question = action.payload.Question;
      const newQuestions = state.questions.map((q) => {
        if (q.number === savedQuestion.number) {
          return savedQuestion;
        } else {
          return q;
        }
      });
      state.questions = newQuestions;
      console.log(action.payload.changing, action.payload.forced);
      const changing = state.questions.find(
        (q) => q.number === action.payload.changing
      );
      const forced = state.questions.find(
        (q) => q.number === action.payload.forced
      );
      const newQuestion = state.questions.map((q) => {
        if (q.number === changing.number) {
          return { ...forced, number: changing.number };
        } else if (q.number === forced.number) {
          return { ...changing, number: forced.number };
        } else {
          return q;
        }
      });
      state.questions = newQuestion;
      state.selected = state.questions[action.payload.forced - 1];
    },
    setEditData: (state, action) => {
      const data = action.payload;
      state.info = data.info;
      state.questions = data.questions;
      state.selected = data.questions[0];
      state.count = data.questions.length;
      state.id = data._id;
      state.completed = data.completed;
    },
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(sendQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendQuiz.fulfilled, (state, action) => {
        action.payload.toast.success("your quiz has been uploaded", {
          position: action.payload.toast.POSITION.TOP_CENTER,
        });
        action.payload.navigate("/create");
        return {
          ...initialState,
          isLoading: false,
        };
      })
      .addCase(sendQuiz.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserQuizzes.pending, (state) => {
        state.isGetLoading = true;
      })
      .addCase(getUserQuizzes.fulfilled, (state, action) => {
        state.isGetLoading = false;
        state.userQuizzes = action.payload.quizzes;
      })
      .addCase(getUserQuizzes.rejected, (state) => {
        state.isGetLoading = false;
      })
      .addCase(updateQuizz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuizz.fulfilled, (state, action) => {
        action.meta.arg.toast.success("your quiz has been updated");
        action.meta.arg.navigate("/create");
        action.meta.arg.setShow(false);
        return {
          ...initialState,
          isLoading: false,
        };
      })
      .addCase(deleteQuiz.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const { navigate, toast } = action.meta.arg;
        toast.info("Quiz removed successfully");
        navigate("/create");
      })
      .addCase(deleteQuiz.rejected, (state) => {
        state.deleteLoading = true;
      }),
});

export default CreateSlice.reducer;
export const {
  changeType,
  addMore,
  changeSelected,
  changeCorrect,
  infoShow,
  removeQuestion,
  changeNumber,
  saveQuestion,
  resetState,
  setEditData,
} = CreateSlice.actions;

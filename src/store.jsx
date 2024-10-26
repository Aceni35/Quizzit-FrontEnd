import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./slices/HomeSlice";
import CreateSlice from "./slices/Createslice";
import PlaySlice from "./slices/PlaySlice";
import SearchSlice from "./slices/SearchSlice";
import SettingsSlice from "./slices/SettingsSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "sendQuiz",
          "Play/setParty",
          "sendQuiz/fulfilled",
          "Play/setSocket",
        ],
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["items.dates", "play.socket"],
      },
    }),
  reducer: {
    home: HomeSlice,
    create: CreateSlice,
    play: PlaySlice,
    search: SearchSlice,
    settings: SettingsSlice,
  },
});

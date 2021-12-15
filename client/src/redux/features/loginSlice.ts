import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types";

interface State {
  data: User | null;
  isLoading: boolean;
  error: any;
}

interface LoginPayload {
  username: string;
  password: string;
}

const initialState: State = {
  data: null,
  isLoading: false,
  error: null,
};

// Async thunk
export const loginUser = createAsyncThunk("user/login", async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/login", payload, { withCredentials: true });

    return data;
  } catch (e: any) {
    return rejectWithValue(e.response.data);
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    logoutUser: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.data = null;
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.data = null;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setCurrentUser } = loginSlice.actions;
export default loginSlice.reducer;

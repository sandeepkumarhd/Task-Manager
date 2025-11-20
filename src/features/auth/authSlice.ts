import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export type UserRole = "user" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isInitialized: false,
};

const DUMMY_USERS: Array<{
  email: string;
  password: string;
  user: AuthUser;
}> = [
  {
    email: "admin@example.com",
    password: "admin",
    user: {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    },
  },
  {
    email: "user@example.com",
    password: "user",
    user: {
      id: "2",
      name: "Regular User",
      email: "user@example.com",
      role: "user",
    },
  },
];

export const loginUser = createAsyncThunk<
  { user: AuthUser; token: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const match = DUMMY_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!match) {
      return rejectWithValue("Invalid email or password");
    }
    const fakeToken = `token-${match.user.role}-${Date.now()}`;
    return {
      user: match.user,
      token: fakeToken,
    };
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

export const initAuthFromStorage = createAsyncThunk<
  { user: AuthUser | null; token: string | null },
  void,
  { rejectValue: string }
>("auth/initAuthFromStorage", async (_, { rejectWithValue }) => {
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return { user: null, token: null };
    const parsed = JSON.parse(raw);
    return {
      user: parsed.user ?? null,
      token: parsed.token ?? null,
    };
  } catch {
    return rejectWithValue("Failed to load saved auth");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      if (state.user && state.token) {
        localStorage.setItem(
          "auth",
          JSON.stringify({ user: state.user, token: state.token })
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initAuthFromStorage.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isInitialized = true;
      })
      .addCase(initAuthFromStorage.rejected, (state) => {
        state.isInitialized = true;
      });

    /* Login */
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.user,
            token: state.token,
          })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;

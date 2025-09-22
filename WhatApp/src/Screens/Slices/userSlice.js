import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../Firebase/Firebase"
import { signInWithEmailAndPassword } from "firebase/auth";


export const signInUser = createAsyncThunk(
    "users/signIn",
    async ({ email, password }) => {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user.email

        return user;
    }
);


const initialState = {
    users: [],
    currentUsers: "",
    isLoading: true,
    error: null
}

const userSlice = createSlice({
    name: "",
    initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder.addCase(signInUser.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(signInUser.fulfilled, (state, action) => {
            const User = action.payload;

            const CurrentUserFind = state.find(person => {
                if (person.email = User) {
                    return person
                }
            })

            state.currentUsers = CurrentUserFind
            state.isLoading = false
        });

        builder.addCase(signInUser.rejected, (state) => {
            alert("user not found !")
            state.isLoading = true
        });
    }
})
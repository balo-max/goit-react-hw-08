import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, updateContact } from "./operations";
import { setCurrentContact } from "./actions";
import { logoutUser } from "../auth/operations";


const handlePending = (state) => {
    state.error = null;
    state.loading = true;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
}

const slice = createSlice({
    name: 'contacts',
    
    initialState: {
        items: [],
        loading: false,
        error: null,
        currentContact: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(addContact.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(contact => contact.id !== action.payload.id)
            })
            .addCase(setCurrentContact, (state, action) => {
                state.currentContact = action.payload;
            })
            .addCase(updateContact.rejected, handleRejected)
            .addCase(updateContact.pending, handlePending)
            .addCase(updateContact.fulfilled, (state, action) => {
                state.loading = false;
                const contact = state.items.find(item => item.id === action.payload.id);
                if (contact) {
                    contact.name = action.payload.name;
                    contact.number = action.payload.number;
                }
            })
            .addCase(logoutUser.rejected, handleRejected)
            .addCase(logoutUser.pending, handlePending)
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.items = [];
            })
    }
});

export default slice.reducer;

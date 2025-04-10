import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";


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
        error: null
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
                state.items.unshift(action.payload);
            })
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(contact => contact.id !== action.payload.id)
        })
    }
});

export default slice.reducer;
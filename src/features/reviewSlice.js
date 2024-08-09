// Di sini kita akan menggunakan slice dari redux toolkit untuk membuat reducernya secara otomatis
import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"

// Di sini kita akan mendeklarasikan state awal yang digunakan oleh reducer
const initialState = {
    review: [],
    loading: false,
    error: ""
};

// Di sini kita akan membuat slicenya
// slice adalah kumpulan data yang digunakan dalam reducer

// Redux menggunakan slice untuk membuat reducer secara otomatis
// dan menyediakan seluruh fungsi / action + action creator yang dibutuhkan

// secara OTOMATIS !
export const reviewSlice = createSlice({
    // Nama ini digunakan untuk keperluan debugging
    name: "review",

    // initialState ini merupakan state awal yang akan dimasukkan ke dalam reducer
    initialState,

    // Reducer ini adalah seluruh fungsi yang digunakan untuk mengubah state di dalam redux
    // Walaupun state seharusnya bersifat immutable di dalam reducer, namun karena di balik
    // layarnya slice ini sudah menggunakan "immer library", maka SEOLAH-OLAH kode dapat dibuat
    // secara mutable (boleh diassign), padahal di balik layarnya tetap immutable !
    reducers: {
        // Di sini karena ingin menggunakan loading dan ada error messagenya
        // dan menggunakan fetcher yang bersifat promise
        // maka di sini kita akan menghandle 3 state promise:
        // - pending, pada saat pertama kali fetch dijalankan
        // - success, pada saat fetch berhasil dan data didapatkan
        // - reject, pada saat fetch gagal dan mendapatkan pesan error
        fetchPending(state) {
            state.loading = true;
            state.review = []
            state.error = ""
        },
        fetchSuccess(state, action) {
            state.loading = false
            state.review = action.payload
            state.error = ""
        },
        fetchReject(state, action) {
            state.loading = false
            state.review = []
            state.error = action.payload
        },
    }
})

// Secara otomatis dari slice yang dibuat akan menyediakan action creatornya.
export const { fetchPending, fetchSuccess, fetchReject } = reviewSlice.actions;

// fungsi di bawah ini disebut thunk dan memungkinkan kita menjalankan action kita secara async.
export const fetchAsync = () => async (dispatch) => {
    try {
        dispatch(fetchPending());

        const { data } = await axios.get("https://server.rinasismita.online/review", {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        });

        dispatch(fetchSuccess(data.reviewed)); // Pastikan hanya array `reviewed` yang disimpan
    } catch (error) {
        dispatch(fetchReject(error.message));
    }
}


// Secara otomatis dari slice yang dibuat juga menyediakan reducernya.
export default reviewSlice.reducer;
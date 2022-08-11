import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

  export const getBooks = createAsyncThunk(
    "book/getBooks",
    async (args, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      try {
        const res = await fetch("http://localhost:3009/books");
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  );

  export const postBooks = createAsyncThunk(
    
    //Name of the action
    "book/postBooks",
    
    async (bookData, thunkAPI) => {
        // console.log(bookData)
      const { rejectWithValue, getState, dispatch } = thunkAPI;

      try {

        //Access the global state and get the auth name from,, can use it with token 
        bookData.userName = getState().auth.name
        
        //Fetching th data   
        const res = await fetch("http://localhost:3009/books", {
            method:"POST",
            body:JSON.stringify(bookData),
            headers:{"Content-type":"application/json; charest=UTF-8"}
        });
        
        //Make sure that the response is a JSON object
        const data = await res.json();
        
        //Dispatch an action in the returning data case
        dispatch(logInsert({name:'postBooks', status:"success"}))

        //I can also dispatch an createAsyncThunk action in the same slice
        // dispatch(deleteBook({id:1}))

        //Return the data to the state
        return data;
      
      } catch (error) {
      
        console.log(error.message);

        //Dispatch an action in the error case      
        dispatch(logInsert({name:'postBooks', status:"failed"}))
      
        //Handling the error
        return rejectWithValue(error.message);
      
      }
    }
  );

  export const deleteBook = createAsyncThunk(
    "book/deleteBook",
    async (book, thunkAPI) => {
        console.log(book)
      const { rejectWithValue, getState } = thunkAPI;
  
      try {
        deleteBook.userName = getState().auth.name
         await fetch(`http://localhost:3009/books/${book.id}`, {
            method:"DELETE",
            headers:{"Content-type":"application/json; charest=UTF-8"}
        });
        // const data = await res.json();
        return book;
      } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  );

  export const readBook = createAsyncThunk(
    "book/readBook",
    async (book, thunkAPI) => {
        console.log(book)
      const { rejectWithValue, getState } = thunkAPI;
  
      try {
        deleteBook.userName = getState().auth.name
         await fetch(`http://localhost:3009/books/${book.id}`, {
            method:"GET",
            headers:{"Content-type":"application/json; charest=UTF-8"}
        });
        // const data = await res.json();
        return book;
      } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  );


const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false ,isError:null, bookInfo:[] },
  reducers: {
    resetBooks:(state)=>{
      state.books = []
      state.isLoading = false
      state.isError = null
      state.bookInfo = []
      console.log('REMOVED')
    }
  },
  extraReducers: {
    
    //Get Books
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = null;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      
      state.isLoading = false; 

      state.isError = action.payload;

    },

    //Post Books
    [postBooks.pending]: (state, action) => {
        state.isLoading = true;
        state.isError = null;
    },
    [postBooks.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.books.push(action.payload);
    },
    [postBooks.rejected]: (state, action) => {
        state.isLoading = false;
        state.isError = action.payload
    },

    //Delete Book
    [deleteBook.pending]: (state, action) => {
        state.isLoading = true;
        state.isError = null;
        },
    [deleteBook.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.books = state.books.filter(el => el.id !== action.payload.id)
    },
    [deleteBook.rejected]: (state, action) => {
        state.isLoading = false;
        state.isError = action.payload
    },

    //Read Book
    [readBook.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
      },
    [readBook.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.bookInfo = action.payload;
    },
    [readBook.rejected]: (state, action) => {
        state.isLoading = false;
        state.isError = action.payload
    },
  
  },
});

export const { resetBooks } = bookSlice.actions;

export default bookSlice.reducer;

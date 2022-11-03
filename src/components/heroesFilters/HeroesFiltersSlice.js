import { createSlice , createAsyncThunk , createEntityAdapter} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter()
const initialState = filtersAdapter.getInitialState({
    filtersLoading : "idle",
    filterActive : "all"
})

export const fetchFilters = createAsyncThunk(
    "filters/fetch",
    () => {
        const {request} = useHttp()
        return request("http://localhost:3001/filters")
    }
)

const filters = createSlice({
    name: "filters",
    initialState,
    reducers: {
        activeFilter : (state , action) => {
            state.filterActive = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending , state => {
                state.filtersLoading = "loading"
            })
            .addCase(fetchFilters.fulfilled , (state , action) => {
                state.filtersLoading = "idle"
                filtersAdapter.setAll(state , action.payload)
            })
            .addDefaultCase((state , action) => {})
    }
})

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)
const {actions , reducer} = filters
export default reducer
export const {
    activeFilter
} = actions
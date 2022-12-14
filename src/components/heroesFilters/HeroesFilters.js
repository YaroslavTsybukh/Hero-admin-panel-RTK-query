import {useDispatch , useSelector} from "react-redux";
import {useEffect} from "react";
import {activeFilter,fetchFilters , selectAll} from "./HeroesFiltersSlice";
import store from "../../store";


const HeroesFilters = () => {
    const dispatch = useDispatch()
    const {filterActive} = useSelector(state => state.filters)

    useEffect(() => {
        dispatch(fetchFilters())
    } , [])

    const renderButtons = () => {
        const filters = selectAll(store.getState())
        return filters.map(({ name , label , className}) => {
            const activeClass = filterActive === name ? "active" : ""
            return <button
                        key={name}
                        className={className + " " + activeClass}
                        onClick={() => dispatch(activeFilter(name))}>
                        {label}
                    </button>
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderButtons()}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
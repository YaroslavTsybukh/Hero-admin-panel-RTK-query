import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useGetHeroesQuery , useDeleteHeroMutation} from "../../api/api";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const filterActive = useSelector(state => state.filters.filterActive)
    const {data: heroes = [] , isLoading , isError} = useGetHeroesQuery()
    const [deleteChar] = useDeleteHeroMutation()

    const filteredHero = useMemo(() => {
        const filteredHeroes = heroes.slice()

        if(filterActive === "all"){
            return filteredHeroes
        }else{
            return filteredHeroes.filter(hero => hero.element === filterActive)
        }
    } , [heroes , filterActive])

    const onDeleteHero = (id) => {
        deleteChar(id).unwrap().then(res => console.log("DELETED"))
    }

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onDeleteHero={() => onDeleteHero(id)}/>
        })
    }

    const elements = renderHeroesList(filteredHero);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
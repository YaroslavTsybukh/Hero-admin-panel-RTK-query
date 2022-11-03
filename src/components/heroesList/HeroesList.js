import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroDeleted , fetchHeroes , filteredHeroSelector } from './HeroSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filteredHero = useSelector(filteredHeroSelector)

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoading);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
        // eslint-disable-next-line
    }, []);

    const onDeleteHero = (id) => {
        request(`http://localhost:3001/heroes/${id}` , "DELETE")
            .then(() => dispatch(heroDeleted(id)))
            .catch(error => console.log(error))
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
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
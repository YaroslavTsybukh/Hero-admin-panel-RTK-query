import {Formik , Form , Field} from "formik"
import * as Yup from "yup"
import {useSelector} from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {selectAll} from "../heroesFilters/HeroesFiltersSlice"
import store from '../../store'
import {useAddHeroMutation} from "../../api/api";

const HeroesAddForm = () => {
    const {filtersLoading} = useSelector(state => state.filters)
    const [createHero] = useAddHeroMutation()
    const filters = selectAll(store.getState())

    const getHeroData = (hero) => {
        createHero(hero).unwrap()
    }

    const renderOptions = (filters , status) => {
        if(status === "loading"){
            return <option>Загрузка...</option>
        }else{
            return filters.map(({name , label}) => {
                if(name === 'all') return

                return <option key={name} value={name}>{label}</option>
            })
        }
    }
    const elements = renderOptions(filters , filtersLoading)
    return (
        <Formik initialValues={{
            id: uuidv4(),
            name: "",
            description: "",
            element: ""
        }}
        validationSchema={
            Yup.object({
                name: Yup.string().min(3 , "Минимальное колчиество символов 3").required("Это поле обязательное"),
                description: Yup.string().required("Это поле обязательное"),
                element: Yup.string().required("Вам нужно выбрать значение из списка")
            })
        }
        onSubmit={(values , {resetForm}) => {
            getHeroData(values)
            resetForm()
        }}
        >
            {({errors}) => (
                <Form className="border p-4 shadow-lg rounded">
                    <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    />
                        <p style={{color: "FF0000"}}>{errors.name}</p>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                    as="textarea"
                    required
                    name="description"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    />
                        <p style={{color: "FF0000"}}>{errors.text}</p>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                    as="select"
                    required
                    className="form-select"
                    id="element"
                    name="element">
                    <option >Я владею элементом...</option>
                    {elements}
                    </Field>
                        <p style={{color: "FF0000"}}>{errors.element}</p>
                    </div>

                    <button type="submit" className="btn btn-primary">Создать</button>
                </Form>
            )}
        </Formik>
    )
}

export default HeroesAddForm;
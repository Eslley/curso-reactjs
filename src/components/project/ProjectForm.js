import Input from '../forms/Input'
import Select from '../forms/Select'
import SubmitButton from '../forms/SubmitButton'
import styles from './ProjectForm.module.css'

import { useEffect, useState } from 'react'

function ProjectForm({ btnText }) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <form className={styles.form}>
            <Input
                type='text'
                text='Nome do Projeto'
                placeholder='Insira o nome do projeto'
                name='name' />
            <Input
                type='number'
                text='Orçamento do projeto'
                placeholder='Insira o orçamento total'
                name='budget' />
            <Select
                name='category_id'
                text='Selecione a categoria'
                options={categories} />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm
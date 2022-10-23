import Input from '../forms/Input'
import Select from '../forms/Select'
import SubmitButton from '../forms/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({btnText}) {
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
            <Select name='category_id' text='Selecione a categoria' />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Project.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjetcForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [showServiceForm, setShowServiceForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setProject(data)
                })
                .catch(err => console.log(err))
        }, 3000)
    }, [id])

    function editPost(project) {
        setMessage('')

        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(data => {
                setProject(data)
                setShowProjetcForm(false)
                setMessage('O projeto foi atualizado!')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjetcForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function createService(project) {
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(data => {
                setShowServiceForm(false)
                setProject(project)
                setMessage('O serviço foi adicionado!')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    function removeService(id, cost) {

        const servicesUpdated = project.services.filter((service) => service.id !== id)

        project.services = servicesUpdated
        project.cost = parseFloat(project.cost) - parseFloat(cost)
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(data => {
                setMessage('O serviço foi removido!')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText='Concluir edição' projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText='Adicionar Serviço'
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {project.services.length > 0 && (
                                project.services.map((service) => (
                                    <ServiceCard 
                                    key={service.id}
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    handleRemove={removeService}
                                    />
                                ))
                            )}
                            { project.services.length === 0 && <p>Não há serviços!</p>}
                        </Container>
                    </Container>
                </div>
            )
                : <Loading />
            }
        </>
    )
}

export default Project
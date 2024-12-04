import { useParams } from "react-router-dom"
import EditActivityForm from "../../components/EditActivityForm/EditActivityForm"

const EditActivityPage = () => {

    const { id: _id } = useParams()

    return (
        <div className="editActivity">

            <h1>este es el formulario para editar una actividad</h1>
            <EditActivityForm />
        </div>

    )
}
export default EditActivityPage

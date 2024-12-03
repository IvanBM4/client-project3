

const ActivityCard = ({ activities }) => {

    return (
        <div className="ActivityCard">
            <h3>Soy la primera actividad que se llama {activities[0].name} </h3>
        </div>
    )

}

export default ActivityCard
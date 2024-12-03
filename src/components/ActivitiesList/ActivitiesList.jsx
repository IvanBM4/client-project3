import ActivityCard from "../ActivityCard/ActivityCard"

const ActivitiesList = ({ activities }) => {


    return (
        <div className="ActivitiesList">
            <h2>Lista de planes y hay ahora {activities.length} planes</h2>
            <ActivityCard activities={activities} />
        </div>
    )
}

export default ActivitiesList
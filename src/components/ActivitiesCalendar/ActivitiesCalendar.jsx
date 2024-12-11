import { ResponsiveCalendar, ResponsiveCalendarCanvas } from "@nivo/calendar"
import { useEffect, useState } from "react"
import activitiesServices from "../../services/activities.services"
import Loader from "../Loader/Loader"
import '../ActivitiesCalendar/ActivitiesCalendar.css'
import { getCalendarChartData } from '../../utils/formatDateForCalendar'
import { Container } from "react-bootstrap"

const ActivitiesCalendar = () => {

    const [activitiesData, setActivitiesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchActivities()
    }, [])

    const fetchActivities = () => {
        activitiesServices
            .fetchActivities()
            .then(({ data }) => {
                setActivitiesData(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <Container className="calendar">
                <ResponsiveCalendar
                    data={getCalendarChartData(activitiesData)}
                    from="2024-11-01"
                    to="2025-12-12"
                    emptyColor="#eeeeee"
                    colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    yearSpacing={40}
                    monthBorderColor="#ffffff"
                    dayBorderWidth={3}
                    dayBorderColor="#ffffff"
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'row',
                            translateY: 36,
                            itemCount: 4,
                            itemWidth: 42,
                            itemHeight: 36,
                            itemsSpacing: 14,
                            itemDirection: 'right-to-left'
                        }
                    ]} />
            </Container>
    )
}

export default ActivitiesCalendar
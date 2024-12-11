import { ResponsiveCalendar } from "@nivo/calendar"
import { useEffect, useState } from "react"
import activitiesServices from "../../services/activities.services"
import Loader from "../Loader/Loader"


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
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="ActivitiesCalendar">
                <h1>calendarioooooooo</h1>
                <ResponsiveCalendar
                    data={activitiesData[2].date}
                    from="2024-01-01"
                    to="2025-05-12"
                    emptyColor="#06020b"
                    align="top"
                    colors={['#35febb', '#6794fe', '#3571fe', '#35febb']}
                    margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
                    yearSpacing={40}
                    yearLegendPosition="after"
                    monthSpacing={4}
                    monthBorderWidth={0}
                    monthBorderColor="#ffffff00"
                    monthLegendPosition="after"
                    monthLegendOffset={16}
                    monthLegendColor="#ffffff"
                    dayBorderWidth={2}
                    dayBorderColor="#ffffff0f"
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'row',
                            translateY: 36,
                            itemCount: 4,
                            itemWidth: 42,
                            itemHeight: 36,
                            itemsSpacing: 14,
                            itemDirection: 'right-to-left',
                            textColor: '#fff'
                        }
                    ]}
                    theme={{
                        "text": {
                            "fill": "#8591ad"
                        },
                        "axis": {
                            "legend": {
                                "text": {
                                    "fill": "#8591ad"
                                }
                            },
                            "ticks": {
                                "text": {
                                    "fill": "#8591ad"
                                }
                            }
                        }
                    }}
                />
            </div>
    )
}

export default ActivitiesCalendar
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'
import ActivitiesMarker from '../ActivitiesMarker/ActivitiesMarker'

const ReactGoogleMap = () => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBZ2QgeOdlau8hshB4nIF47iw2lXyjViJs"
    })

    const [map, setMap] = useState(null)

    const onLoad = (map)
    const onUnmount = () => setMap(null)

    return (
        isLoaded &&
        <div className="text-pop-up-top">

            <GoogleMap
                mapContainerStyle={{ height: '50vh' }}
                zoom={5.5}
                onLoad={onLoad}
                center={{ lat: 40.41769976820468, lng: -3.684093875138128 }}
                onUnmount={onUnmount} >
                <ActivitiesMarker />
            </GoogleMap>

        </div >
    )
}

export default ReactGoogleMap
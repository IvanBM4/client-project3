import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'
import ActivitiesMarker from '../ActivitiesMarker/ActivitiesMarker'
import './ReactGoogleMap.css'

const ReactGoogleMap = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBZ2QgeOdlau8hshB4nIF47iw2lXyjViJs"
    })

    const [map, setMap] = useState(null)

    const onLoad = (map) => setMap(map)
    const onUnmount = () => setMap(null)

    const mapContainerStyle = {
        width: '100%',
        height: '70vh'
    }

    return (
        isLoaded && (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '167%',
                margin: 0,
                padding: 0,
                overflowX: 'hidden'
            }}>
                <div style={{
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={5.5}
                        center={{ lat: 40.41769976820468, lng: -3.684093875138128 }}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        <ActivitiesMarker />
                    </GoogleMap>
                </div>
            </div>
        )
    )
}

export default ReactGoogleMap




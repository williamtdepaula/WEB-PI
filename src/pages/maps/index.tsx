import './style.css';
import BasePage from '../../components/base_page';
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: -23.6707574,
    lng: -47.0727727
}

function MapsPage() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ""
    })

    const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult | null>(null)

    async function getRoute() {
        const directionService = new google.maps.DirectionsService()
        const result = await directionService.route({
            origin: 'Rua José de Anchieta, Jardim Japão, 12',
            destination: 'Rua São Paulo das Missões, 132 - Tijuco Preto',
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirectionResponse(result)
    }

    useEffect(() => {
        if (isLoaded) {
            getRoute()
        }
    }, [isLoaded])

    return (
        <BasePage>
            {isLoaded && 
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {directionResponse && <DirectionsRenderer directions={directionResponse} />}
                </GoogleMap>
            }
        </BasePage>
    );
}

export default MapsPage;

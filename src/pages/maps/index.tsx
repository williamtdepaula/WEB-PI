import './style.css';
import BasePage from '../../components/base_page';
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../resources/contexts/AuthContext';
import { getUBSByPerson } from '../../sevices/requests';
import ErrorPage from '../../components/error_page';
import Loading from '../../components/animations/loading';
require('dotenv').config()

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: -23.6707574,
    lng: -47.0727727
}

function MapsPage() {

    const search = useLocation().search
    const CPF = new URLSearchParams(search).get('CPF')
    const person_address = new URLSearchParams(search).get('user_address')
    const {ubsAddress, isADM} = useAuth()

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.MAPS_KEY ?? 'maps'
    })

    const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult | null>(null)
    const [error, setError] = useState<boolean>(false)
    const [errorLoadMaps, setErrorLoadMaps] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        startConfig()
    }, [isLoaded, CPF, person_address])

    function startConfig(){
        if (isLoaded && CPF && person_address) {
            setupConfigsToMapsWorks()
        }
    }

    async function setupConfigsToMapsWorks(){
        setError(false)
        setErrorLoadMaps(false)
        setLoading(true)
        if (isADM) await configRouteToADM()
        else await configRoute()
        setLoading(false)
    }

    async function getPersonUBSAddress(): Promise<string | undefined> {
        if (CPF){
            const {data, status} = await getUBSByPerson(CPF)
            if (data && status === 200) {
                return data?.address
            } else {
                setError(true)
                return undefined
            }
        } else return undefined
    }

    async function configRoute() {
        if (ubsAddress && person_address){
            await configRouteInGoogleMaps(ubsAddress, person_address)
        } else {
            setError(true)
        }
    }

    async function configRouteToADM() {

        const address = await getPersonUBSAddress()

        if (address && person_address){
            await configRouteInGoogleMaps(address, person_address)
        } else {
            setError(true)
        }
    }

    async function configRouteInGoogleMaps(pointA: string, pointB: string) {
        console.log("aq")
        const directionService = new google.maps.DirectionsService()
        try {
            const result = await directionService.route({
                origin: pointA,
                destination: pointB,
                travelMode: google.maps.TravelMode.DRIVING
            })
            setDirectionResponse(result)
        }catch(e) {
            setErrorLoadMaps(true)
        }
    }

    return (
        <BasePage>
            {error || errorLoadMaps
                ?
                    <ErrorPage onPressTryAgain={startConfig} description={errorLoadMaps ? 'Não possível carregar esse endereço!' : undefined}/> 
                : 
                loading 
                    ?
                        <div className='center'><Loading color='blue' style={{height: 100}}/></div>
                    :
                        isLoaded && 
                            <div style={{zIndex: 1}}>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={10}
                                >
                                    {directionResponse && <DirectionsRenderer directions={directionResponse} />}
                                </GoogleMap>
                            </div>
            }
        </BasePage>
    );
}

export default MapsPage;

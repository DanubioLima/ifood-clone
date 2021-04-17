import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { AiOutlineLeft } from 'react-icons/ai';
import { MdGpsFixed } from 'react-icons/md';
import { Grid, ButtonBase } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { locationService } from '../../services';

import styles from './styles.module.css';

function Maps() {
    const history = useHistory();

    const [address, setAddress] = useState({});
    const [coordinates, setCoordinates] = useState({});
    const [btnText, setBtnText] = useState('')


    useEffect(() => {
        function getAddress() {
            if (localStorage.getItem('@gestor/mountAddress')) {
                const mountAddress = JSON.parse(localStorage.getItem('@gestor/mountAddress'))
                setCoordinates(mountAddress.coords)
                setAddress(mountAddress.address)
                setBtnText('Confirmar localização')
            } else {
                if (localStorage.getItem('@gestor/editAddress')) {
                    const { coords } = JSON.parse(localStorage.getItem('@gestor/editAddress'))
                    setCoordinates(coords)
                    setBtnText('Confirmar localização')
                    locationService.getAddress(coords.lat, coords.lng).then(response => {
                        const splitAddress = response.formatted_address.replace(/((,\s)?\d{5}-\d{3}.*)/g, '').replace(/((,\s)?\d{2,})/g, '').split('-')
                        const formattedAddres = {
                            mainText: splitAddress[0],
                            secondaryText: `${splitAddress[1]}-${splitAddress[2]}`,
                            number: response.address_components[0] ? response.address_components[0].short_name : ''
                        }
                        setAddress(formattedAddres)
                    })
                } else {
                    const coords = JSON.parse(localStorage.getItem('@gestor/coords'))
                    setCoordinates(coords)
                    setBtnText('Continuar')
                    locationService.getAddress(coords.lat, coords.lng).then(response => {
                        const splitAddress = response.formatted_address.replace(/((,\s)?\d{5}-\d{3}.*)/g, '').replace(/((,\s)?\d{2,})/g, '').split('-')
                        const formattedAddres = {
                            mainText: splitAddress[0],
                            secondaryText: `${splitAddress[1]}-${splitAddress[2]}`
                        }
                        setAddress(formattedAddres)
                    })
                }

            }
        }

        getAddress()
    }, [])

    const stylesMap = {
        width: '100%',
        height: '100vh'
    }

    function handleMark(event) {
        const latitude = event.latLng.lat()
        const longitude = event.latLng.lng()

        locationService.getAddress(latitude, longitude).then(response => {
            console.log(response)
            const splitAddress = response.formatted_address.replace(/((,\s)?\d{5}-\d{3}.*)/g, '').replace(/((,\s)?\d{1,})/g, '').split('-')
            if (localStorage.getItem('@gestor/editAddress')) {
                const editAddress = JSON.parse(localStorage.getItem('@gestor/editAddress'))
                const formattedAddress = {
                    address: {
                        mainText: splitAddress[0].trim(),
                        secondaryText: `${splitAddress[1]}-${splitAddress[2]}`,
                        number: response.address_components[0] ? response.address_components[0].short_name : '',
                        complement: editAddress.address.complement,
                        reference: editAddress.address.reference,
                    },
                    coords: {
                        lat: latitude,
                        lng: longitude
                    },
                    id: editAddress.id
                }
                localStorage.setItem('@gestor/editAddress', JSON.stringify(formattedAddress))
                setAddress(formattedAddress.address)
            } else {
                const formattedAddress = {
                    address: {
                        mainText: splitAddress[0].trim(),
                        secondaryText: `${splitAddress[1]}-${splitAddress[2]}`,
                        number: response.address_components[0] ? response.address_components[0].short_name : '',
                    },
                    coords: {
                        lat: latitude,
                        lng: longitude
                    },
                }
                localStorage.setItem('@gestor/mountAddress', JSON.stringify(formattedAddress))
                setAddress(formattedAddress.address)
            }
        })
    }

    function goToCurrentLocation() {
        const coords = JSON.parse(localStorage.getItem('@gestor/coords'))
        locationService.getAddress(coords.lat, coords.lng).then(response => {
            const splitAddress = response.formatted_address.replace(/((,\s)?\d{5}-\d{3}.*)/g, '').replace(/((,\s)?\d{2,})/g, '').split('-')
            const formattedAddres = {
                mainText: splitAddress[0],
                secondaryText: `${splitAddress[1]}-${splitAddress[2]}`
            }
            setAddress(formattedAddres)
        })
        setCoordinates(coords)
    }

    function back() {
        history.goBack()
    }

    function goToFinishAddress() {
        if (localStorage.getItem('@gestor/editAddress')) {
            history.push('/edit-address');
        } else {
            history.push('/save-address');
        }
    }

    return (
        <div className={styles.container}>
            <GoogleMap
                mapContainerStyle={stylesMap}
                center={{
                    lat: +coordinates?.lat,
                    lng: +coordinates?.lng
                }}
                options={
                    {
                        streetViewControl: false,
                        panControl: false,
                        zoomControl: false,
                        fullscreenControl: false,
                        mapTypeControl: false,
                    }
                }
                zoom={19}
            >
                {<Marker position={coordinates} draggable onDragEnd={handleMark} />}
                <ButtonBase className={styles.btnLocation} onClick={goToCurrentLocation}>
                    <MdGpsFixed color="#777373" size={22} />
                </ButtonBase>
                <Grid container className={styles.header}>
                    <Grid container item xs={2} justify="center" alignItems="center" style={{ display: 'flex' }}>
                        <AiOutlineLeft color="#EA1D2C" size={24} onClick={back} />
                    </Grid>
                    <Grid item xs={9}>
                        <div className={styles.infoAddress}>
                            <h5>{address?.mainText}{address.number ? `, ${address.number}` : ''}</h5>
                            <p>{address?.secondaryText}</p>
                        </div>
                    </Grid>
                </Grid>
                <div className={styles.btnMain}>
                    <button onClick={goToFinishAddress}>{btnText}</button>
                </div>
            </GoogleMap>
        </div >
    )
}

export default React.memo(Maps)
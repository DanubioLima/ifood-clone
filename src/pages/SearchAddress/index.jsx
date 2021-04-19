import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';
import { IoMdCloseCircle } from 'react-icons/io';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Grid } from '@material-ui/core';

import PlacesAutocomplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import ModalBottom from './ModalBottom';

import powered from '../../assets/images/poweredgoogle.png';
import styles from './styles.module.css';

export default function SearchAddress() {
    const history = useHistory();

    const [address, setAddress] = useState('')
    const [dataAddress, setDataAddress] = useState({})
    const [showModalBottom, setShowModalBottom] = useState(false);
    const [coordinates, setCoordinates] = useState({ lat: '', lng: '' })

    function goToHome() {
        history.push('/')
    }

    function clearSearch() {
        setAddress('')
    }

    function goToMaps() {
        history.push('/maps')
    }

    async function handleSelectAddress(address, suggestion) {
        const results = await geocodeByAddress(address)
        const latLng = await getLatLng(results[0])
        setDataAddress(suggestion.formattedSuggestion)
        setCoordinates(latLng)
        if (isNaN(suggestion?.terms[1].value)) {
            const mountAddress = {
                coords: latLng,
                address: suggestion.formattedSuggestion
            }
            localStorage.setItem('@gestor/mountAddress', JSON.stringify(mountAddress))
            setShowModalBottom(true)
        } else {
            const addressFormatted = {
                mainText: suggestion.formattedSuggestion.mainText.replace(/((,\s)?\d{1,})/g, ''),
                secondaryText: suggestion.formattedSuggestion.secondaryText
            }
            const mountAddress = {
                coords: latLng,
                address: {
                    ...addressFormatted,
                    number: suggestion.terms[1].value
                }
            }
            localStorage.setItem('@gestor/mountAddress', JSON.stringify(mountAddress))
            history.push('/maps')
        }
    }

    return (
        <>
            <div className={styles.container}>
                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={(address, placeId, suggestion) => handleSelectAddress(address, suggestion)}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <>
                            <div className={styles.boxSearch}>
                                <div className={styles.inputSearch}>
                                    <AiOutlineLeft color="#EA1D2C" size={24} onClick={goToHome} />
                                    <input
                                        type="text"
                                        autoFocus
                                        {...getInputProps({ placeholder: "Endereço e número" })}
                                    />
                                    {address.length > 0 && (<IoMdCloseCircle onClick={clearSearch} size={24} color="#A6A29F" />)}
                                </div>
                            </div>
                            <div className={styles.powered}>
                                <img src={powered} alt="powered by Google" />
                            </div>
                            <div>
                                {suggestions.map(suggestion => {
                                    return (
                                        <Grid
                                            key={suggestion.index}
                                            className={styles.card}
                                            container
                                            {...getSuggestionItemProps(suggestion)}
                                        >
                                            <Grid container item xs={1} justify="center" alignItems="center" style={{ display: 'flex' }}>
                                                <HiOutlineLocationMarker size={24} color="#a6a29f" />
                                            </Grid>
                                            <Grid item xs={11} className={styles.cardInfo}>
                                                <h5>{suggestion.formattedSuggestion.mainText}</h5>
                                                <p>{suggestion.formattedSuggestion.secondaryText}</p>
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                                {address.length > 0 && (
                                    <div className={styles.actionsSearch}>
                                        <h6>Não achou seu endereço?</h6>
                                        <button onClick={goToMaps}>Buscar pelo mapa</button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </PlacesAutocomplete>
            </div>
            {showModalBottom && (
                <ModalBottom
                    formattedAddress={dataAddress}
                    coords={coordinates}
                    open={showModalBottom}
                    close={() => setShowModalBottom(false)}
                />
            )}
        </>
    )
}
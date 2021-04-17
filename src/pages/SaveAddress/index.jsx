import { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Grid, TextField } from '@material-ui/core';
import { AiOutlineLeft } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import { TiCoffee } from 'react-icons/ti';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import styles from './styles.module.css';
import './styles.css';

export default function SaveAddress() {
    const { address, coords } = JSON.parse(localStorage.getItem('@gestor/mountAddress'));

    const history = useHistory();

    const [selectedItem, setSelectedItem] = useState({})
    const [number, setNumber] = useState(address?.number)
    const [reference, setReference] = useState('')
    const [complement, setComplement] = useState('')
    const [errorNumber, setErrorNumber] = useState(false)
    const [errorReference, setErrorReference] = useState(false)

    const items = [
        {
            id: 1,
            title: 'Casa',
            location: 'home'
        },
        {
            id: 2,
            title: 'Trabalho',
            location: 'work'
        },
    ]

    function back() {
        history.goBack();
    }

    function handleSelectedItem(item) {
        setSelectedItem(item)
    }

    function handleNumber(event) {
        setNumber(event.target.value)
    }

    function handleReference(event) {
        setReference(event.target.value)
    }

    function handleComplement(event) {
        setComplement(event.target.value)
    }

    function handleSubmit() {
        if (reference.length > 1 && number.length > 1) {
            setErrorReference(false)
            setErrorNumber(false)
            const data = {
                id: uuidv4(),
                address: {
                    mainText: address?.mainText,
                    secondaryText: address?.secondaryText,
                    number: number,
                    location: selectedItem.location || '',
                    complement,
                    reference
                },
                coords
            }
            const hasList = localStorage.getItem('@gestor/listAddress')
            if (hasList) {
                const listAddress = JSON.parse(localStorage.getItem('@gestor/listAddress'))
                const newListAddress = [...listAddress, data]
                localStorage.setItem('@gestor/listAddress', JSON.stringify(newListAddress))
                localStorage.removeItem('@gestor/mountAddress')
                history.replace('/')
                return
            } else {
                const listAddress = [data]
                localStorage.setItem('@gestor/listAddress', JSON.stringify(listAddress))
                localStorage.removeItem('@gestor/mountAddress')
                history.replace('/')
                return
            }
        } else {
            if (reference.length === 0) setErrorReference(true)
            if (number.length === 0) setErrorNumber(true)
            return
        }


    }

    return (
        <div>
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
            <GoogleMap
                center={coords}
                zoom={20}
                mapContainerStyle={{
                    width: '100%',
                    height: '66px'
                }}
                options={{
                    streetViewControl: false,
                    panControl: false,
                    zoomControl: false,
                    fullscreenControl: false,
                    mapTypeControl: false,
                }}
            >
                {<Marker position={coords} />}
            </GoogleMap>
            <div className={styles.container}>
                <div className={styles.titlePage}>
                    <h4>{address.mainText.trim()}{address?.number ? `, ${number}` : ''}</h4>
                    <p>{address.secondaryText}</p>
                </div>
                <Grid container spacing={4}>
                    <Grid container item xs={4} style={{ display: 'flex' }} direction="column">
                        <TextField fullWidth error={errorNumber} value={number} onChange={handleNumber} label="Número" />
                        {errorNumber && (<span className={styles.labelError}>Campo</span>)}
                    </Grid>
                    <Grid container item xs={8} style={{ display: 'flex' }} direction="column" >
                        <TextField value={complement} onChange={handleComplement} fullWidth label="Complemento" />
                        <span className={styles.subLabel}>Apto / Bloco / Casa</span>
                    </Grid>
                    <Grid container item xs={12} style={{ display: 'flex' }} direction="column">
                        <TextField fullWidth value={reference} error={errorReference} onChange={handleReference} label="Ponto de referência" />
                        {errorReference && (<span className={styles.labelError}>Campo obrigatório</span>)}
                    </Grid>
                </Grid>
                <div className={styles.types}>
                    <span >Favoritar como</span>
                    <Grid container spacing={2} style={{ marginTop: '3px' }}>
                        {items?.map(item => (
                            <Grid key={item.id} item xs={6} onClick={() => handleSelectedItem(item)}>
                                <div className={selectedItem?.id === item.id ? styles.boxTypeSelected : styles.boxType}>
                                    {item.id === 1 && (<BiHome color={selectedItem?.id === item.id ? '#3F3E3E' : '#d6d4d2'} size={20} />)}
                                    {item.id === 2 && (<TiCoffee color={selectedItem?.id === item.id ? '#3F3E3E' : '#d6d4d2'} size={20} />)}
                                    <span>{item.title}</span>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <button className={styles.btnSave} onClick={handleSubmit}>Salvar endereço</button>
            </div>

        </div>
    )
}
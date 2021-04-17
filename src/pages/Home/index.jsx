import { useEffect, useState, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdMyLocation } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { locationService } from '../../services';
import { AddressProvider, AddressContext } from '../../context/AddressContext'
import { BiHome } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GiBackwardTime } from 'react-icons/gi';
import { TiCoffee } from 'react-icons/ti';
import { Grid } from '@material-ui/core';

import ModalBottom from './components/ModalBottom'

import styles from './styles.module.css';

export default function Home() {
    return (
        <AddressProvider>
            <ContentHome />
        </AddressProvider>
    )
}

function ContentHome() {
    const { listAddress } = useContext(AddressContext);
    const history = useHistory();

    const [currentAddress, setCurrentAdress] = useState('')
    const [selectedAddress, setSelectedAddress] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({})

    useEffect(() => {
        function getAddress() {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                const coords = {
                    lat: latitude,
                    lng: longitude
                }
                localStorage.setItem('@gestor/coords', JSON.stringify(coords))
                locationService.getAddress(latitude, longitude).then(response => {
                    const addressFormated = response.formatted_address.replace(/((,\s)?\d{5}-\d{3}.*)/g, '')
                    setCurrentAdress(addressFormated)
                })
            })
        }

        getAddress();
    }, [])

    function getAddress() {
        setSelectedAddress({})
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            locationService.getAddress(latitude, longitude).then(response => {
                const addressFormated = response.formatted_address.replace(/((,\s)?\d{5}-\d{3}.*)/g, '')
                setCurrentAdress(addressFormated)
            })
        })
    }

    function goToSearchAddress() {
        history.push('/search');
    }

    function handleSelectAddress(item) {
        setSelectedAddress(item)
    }

    function openModal(item) {
        setShowModal(true)
        setItemSelected(item)
    }

    return (
        <>
            <div className={`${styles.container} ${styles.boxHeader}`}>
                <h2 className={styles.title}>Endereço de Entrega</h2>
                <div className={styles.boxSearch}>
                    <div className={styles.inputSearch} onClick={goToSearchAddress}>
                        <FiSearch color="#EA1D2C" size={24} />
                        <input type="text" disabled placeholder="Endereço e número" />
                    </div>
                </div>
                <div className={styles.location}>
                    <div className={styles.locationBoxIcon}>
                        <MdMyLocation size={24} color="#a6a29f" />
                    </div>
                    <div className={styles.locationText} onClick={getAddress}>
                        <h4>Usar localização atual</h4>
                        <p>{currentAddress}</p>
                    </div>
                </div>
            </div>
            <div className={`${styles.container} ${styles.boxAddress}`}>
                {listAddress?.map(item => (
                    <Grid
                        key={item.id}
                        container
                        className={selectedAddress.id === item.id ? `${styles.cardSelected} box` : `${styles.card} box`}
                        onClick={() => handleSelectAddress(item)}
                    >
                        <Grid container item xs={1} justify="center" alignItems="center" style={{ display: 'flex' }}>
                            {item.address.location === '' && (<GiBackwardTime size={24} color="#a6a29f" />)}
                            {item.address.location === 'home' && (<BiHome size={24} color="#a6a29f" />)}
                            {item.address.location === 'work' && (<TiCoffee size={24} color="#a6a29f" />)}
                        </Grid>
                        <Grid item xs={9} className={styles.cardInfo}>
                            {item.address.location === '' && (<h5>{item.address.mainText.trim()}{`, ${item.address.number}`}</h5>)}
                            {item.address.location === 'home' && (<h5>Casa</h5>)}
                            {item.address.location === 'work' && (<h5>Trabalho</h5>)}
                            {item.address.location === '' && (<p>{item.address.secondaryText}</p>)}
                            {item.address.location?.length > 0 && (<p>{item.address.mainText.trim()}{`, ${item.address.number}`} - {item.address.secondaryText}</p>)}
                            {item.address.complement === '' && (<small>{item.address.reference}</small>)}
                            {item.address.complement?.length > 0 && (<small>{item.address.complement} - {item.address.reference}</small>)}
                        </Grid>
                        <Grid container item xs={2} justify="flex-end" className={styles.cardActions}>
                            {selectedAddress.id === item.id && (<AiFillCheckCircle color="#EA1D2C" size={20} />)}
                            <BsThreeDotsVertical data-id="icon" onClick={() => openModal(item)} color="#EA1D2C" size={20} />
                        </Grid>
                    </Grid>
                ))}
                {showModal && (
                    <ModalBottom
                        open={showModal}
                        close={() => setShowModal(false)}
                        item={itemSelected}
                    />)}
            </div>
        </>
    )
}
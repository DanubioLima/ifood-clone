import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdMyLocation } from 'react-icons/md';
import { locationService } from '../../services';

import CardAddress from './components/CardAddress';
import styles from './styles.module.css';

export default function Home() {

    const [currentAddress, setCurrentAdress] = useState('')

    useEffect(() => {
        function getAddress() {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                locationService.getAddress(latitude, longitude).then(response => {
                    const addressFormated = response.formatted_address.replace(/((,\s)?\d{5}-\d{3}.*)/g, '')
                    setCurrentAdress(addressFormated)
                })
            })
        }

        getAddress();
    }, [])

    function getAddress() {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            locationService.getAddress(latitude, longitude).then(response => {
                const addressFormated = response.formatted_address.replace(/((,\s)?\d{5}-\d{3}.*)/g, '')
                setCurrentAdress(addressFormated)
            })
        })
    }


    return (
        <>
            <div className={`${styles.container} ${styles.boxHeader}`}>
                <h2 className={styles.title}>Endereço de Entrega</h2>
                <div className={styles.boxSearch}>
                    <div className={styles.inputSearch}>
                        <FiSearch color="#EA1D2C" size={24} />
                        <input type="text" placeholder="Endereço e número" />
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
                <CardAddress />
                <CardAddress />
                <CardAddress />
            </div>
        </>
    )
}
import { useState } from 'react';
import { Drawer } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';
import './styles.css';

export default function ModalBottom({ formattedAddress, open, close, coords }) {
    const history = useHistory()
    const [addressNumber, setAddressNumber] = useState('');

    function handleChange(event) {
        setAddressNumber(event.target.value)
    }

    function goToMapsWithNumber() {
        const newAddressMount = {
            address: {
                mainText: `${formattedAddress?.mainText}`,
                secondaryText: formattedAddress?.secondaryText,
                number: addressNumber
            },
            coords
        }
        localStorage.setItem('@gestor/mountAddress', JSON.stringify(newAddressMount))
        history.push('/maps')
    }

    function goToMapsWithoutNumber() {
        history.push('/maps')
    }

    return (
        <Drawer anchor="bottom" open={open} onClose={close} className={styles.drawer}>
            <div className={styles.container}>
                <h4 className={styles.title}>Preencha o número do endereço</h4>
                <div className={styles.infoAddress}>
                    <h6>{formattedAddress?.mainText}, {addressNumber}</h6>
                    <p>{formattedAddress?.secondaryText}</p>
                </div>
                <div className={styles.input}>
                    <input
                        type="text"
                        value={addressNumber}
                        onChange={handleChange}
                        placeholder="Número"
                    />
                </div>
                <div className={styles.boxButtons}>
                    <button
                        onClick={goToMapsWithNumber}
                        className={addressNumber.length > 0 ? styles.btnEnabled : styles.btnDisabled}
                        disabled={addressNumber.length === 0}
                    >
                        Buscar com número
                    </button>
                    <button onClick={goToMapsWithoutNumber}>Endereço sem número</button>
                </div>
            </div>
        </Drawer>
    )
}
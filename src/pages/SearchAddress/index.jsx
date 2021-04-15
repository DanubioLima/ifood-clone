import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';
import { IoMdCloseCircle } from 'react-icons/io';
import { locationService } from '../../services';

import powered from '../../assets/images/poweredgoogle.png';
import styles from './styles.module.css';

export default function SearchAddress() {
    const history = useHistory();

    const [showIconClose, setShowIconClose] = useState(false);
    const [search, setSearch] = useState('')

    function goToHome() {
        history.push('/')
    }

    function clearSearch() {
        setSearch('')
        setShowIconClose(false)
    }

    function handleSearch(event) {
        const textSearch = event.target.value;
        setSearch(textSearch);
        textSearch.length === 0 ? setShowIconClose(false) : setShowIconClose(true);
        const queryString = textSearch.split(' ').join('+');
        locationService.searchAddress(queryString).then(response => {
            console.log('response', response);
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.boxSearch}>
                <div className={styles.inputSearch}>
                    <AiOutlineLeft color="#EA1D2C" size={24} onClick={goToHome} />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        autoFocus
                        placeholder="Endereço e número"
                    />
                    {showIconClose && (<IoMdCloseCircle onClick={clearSearch} size={24} color="#A6A29F" />)}
                </div>
            </div>
            <div className={styles.powered}>
                <img src={powered} alt="powered by Google" />
            </div>
        </div>
    )
}
import { Grid } from '@material-ui/core';
import { BiHome } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GiBackwardTime } from 'react-icons/gi';
import { TiCoffee } from 'react-icons/ti';
//import { AddressContext } from '../../../../context/AddressContext';

import styles from './styles.module.css';

export default function CardAddress({ address, isSelected }) {
    return (
        <Grid container className={styles.card}>
            <Grid container item xs={1} justify="center" alignItems="center" style={{ display: 'flex' }}>
                {address.location === '' && (<GiBackwardTime size={24} color="#a6a29f" />)}
                {address.location === 'home' && (<BiHome size={24} color="#a6a29f" />)}
                {address.location === 'work' && (<TiCoffee size={24} color="#a6a29f" />)}
            </Grid>
            <Grid item xs={9} className={styles.cardInfo}>
                {address.location === '' && (<h5>{address.mainText}</h5>)}
                {address.location === 'home' && (<h5>Casa</h5>)}
                {address.location === 'work' && (<h5>Trabalho</h5>)}
                {address.location === '' && (<p>{address.secondaryText}</p>)}
                {address.location?.length > 0 && (<p>{address.mainText} - {address.secondaryText}</p>)}
                {address.complement === '' && (<small>{address.reference}</small>)}
                {address.complement?.length > 0 && (<small>{address.complement} - {address.reference}</small>)}
            </Grid>
            <Grid container item xs={2} justify="flex-end" className={styles.cardActions}>
                {isSelected && (<AiFillCheckCircle color="#EA1D2C" size={20} />)}
                <BsThreeDotsVertical color="#EA1D2C" size={20} />
            </Grid>
        </Grid>
    )
}
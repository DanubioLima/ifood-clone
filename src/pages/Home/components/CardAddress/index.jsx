import { Grid } from '@material-ui/core';
import { BiHome } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

import styles from './styles.module.css';

export default function CardAddress() {
    return (
        <Grid container className={styles.card}>
            <Grid container item xs={1} justify="center" alignItems="center" style={{ display: 'flex' }}>
                <BiHome size={24} color="#a6a29f" />
            </Grid>
            <Grid item xs={9} className={styles.cardInfo}>
                <h5>Casa</h5>
                <p>R. Anderson Ferreira dos Réis, 122 - Conj. Hab. Joel Marques, Tauá - CE</p>
                <small>porta vermelha</small>
            </Grid>
            <Grid container item xs={2} justify="flex-end" className={styles.cardActions}>
                <AiFillCheckCircle color="#EA1D2C" size={18} />
                <BsThreeDotsVertical color="#EA1D2C" size={18} />
            </Grid>
        </Grid>
    )
}
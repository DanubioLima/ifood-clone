import { useContext } from 'react';

import { Drawer, Grid } from '@material-ui/core';
import { BiTrash, BiEditAlt } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { AddressContext } from '../../../../context/AddressContext';

import styles from './styles.module.css';

export default function ModalBottom({ open, close, item }) {
    const { deleteAddress } = useContext(AddressContext);
    const history = useHistory();

    function remove() {
        deleteAddress(item)
        close()
    }

    function prepareToEdit() {
        localStorage.setItem('@gestor/editAddress', JSON.stringify(item))
        history.push('/maps')
    }

    return (
        <Drawer anchor="bottom" open={open} onClose={close}>
            <div className={styles.container}>
                {item.address.location === '' && (<h4 className={styles.title}>{item.address.mainText.trim()}{`, ${item.address.number}`}</h4>)}
                {item.address.location === 'home' && (<h4 className={styles.title}>Casa</h4>)}
                {item.address.location === 'work' && (<h4 className={styles.title}>Trabalho</h4>)}
                {item.address.location === '' && (<p className={styles.subTitle}>{item.address.secondaryText}</p>)}
                {item.address.location !== '' && (
                    <p className={styles.subTitle}>
                        {item.address.mainText.trim()}{`, ${item.address.number}`} - {item.address.secondaryText}
                    </p>)}
                <Grid container spacing={2} style={{ marginTop: '16px' }}>
                    <Grid container item xs={6} style={{ display: 'flex' }} justify="center" alignItems="center">
                        <div className={styles.item} onClick={remove}>
                            <BiTrash size={22} />
                            <span>Excluir</span>
                        </div>
                    </Grid>
                    <Grid container item xs={6} style={{ display: 'flex' }} justify="center" alignItems="center">
                        <div className={styles.item} onClick={prepareToEdit}>
                            <BiEditAlt size={22} />
                            <span>Editar</span>
                        </div>
                    </Grid>
                    <Grid container item xs={12}>
                        <button className={styles.btnCancel} onClick={close}>Cancelar</button>
                    </Grid>
                </Grid>
            </div>

        </Drawer>
    )
}


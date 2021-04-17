import { createContext, useState } from 'react';

const AddressContext = createContext();

function AddressProvider({ children }) {
    const addresses = JSON.parse(localStorage.getItem('@gestor/listAddress'))

    const [listAddress, setListAddress] = useState(addresses)

    return (
        <AddressContext.Provider value={{ listAddress }}>
            {children}
        </AddressContext.Provider>
    )
}

export { AddressContext, AddressProvider }
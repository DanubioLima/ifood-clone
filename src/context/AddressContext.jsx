import { createContext, useState } from 'react';

const AddressContext = createContext();

function AddressProvider({ children }) {
    const addresses = JSON.parse(localStorage.getItem('@gestor/listAddress'))

    const [listAddress, setListAddress] = useState(addresses)

    function deleteAddress(item) {
        const newList = listAddress.filter(address => address.id !== item.id)
        setListAddress(newList)
        localStorage.setItem('@gestor/listAddress', JSON.stringify(newList))
    }

    return (
        <AddressContext.Provider value={{ listAddress, deleteAddress }}>
            {children}
        </AddressContext.Provider>
    )
}

export { AddressContext, AddressProvider }
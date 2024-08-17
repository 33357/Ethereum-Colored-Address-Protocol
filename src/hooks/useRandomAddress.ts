import {ethers} from "ethers"
import {useCallback, useEffect, useState} from "react"
import {replaceCharByIndex} from "../lib/utils";

export const useRandomAddress = (props?: { count: number }) => {

    const [addresses, setAddresses] = useState<string[]>([])

    const generate = useCallback((count: number = 5) => {
        let _addresses = []
        let address = ethers.Wallet.createRandom().address;
        _addresses.push(address);
        for (let i = 0; i < count - 1; i++) {
            _addresses.push(replaceCharByIndex(address, 7 + i, address.charAt(7 + i) === 'a' ? 'b' : 'a'));
        }
        setAddresses(_addresses);
    }, [])

    useEffect(() => {
        generate(props?.count)
    }, [generate, props])

    return {addresses, generate}
}
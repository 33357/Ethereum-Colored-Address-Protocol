import { ethers } from "ethers"
import { useCallback, useEffect, useState } from "react"

export const useRandomAddress = (props?: { count: number }) => {

    const [addresses, setAddresses] = useState<string[]>([])

    const generate = useCallback((count: number = 5) => {
        let _addresses = []
        for (let i = 0; i < count; i++) {
            const wallet = ethers.Wallet.createRandom();
            _addresses.push(wallet.address)
        }
        setAddresses(_addresses)
    }, [])

    useEffect(() => {
        generate(props?.count)
    }, [generate, props])

    return { addresses, generate }
}
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isValidAddress(address: string) {
    return address.startsWith("0x") && address.length === 42
}

export function simpleAddress(address: string) {
    return isValidAddress(address) ? `${address.slice(0, 7)}...${address.slice(-5)}` : address
}

export function replaceCharByIndex(str: string, index: number, replacement: string) {
    if (index < 0 || index >= str.length) {
        return str;
    }

    return str.slice(0, index) + replacement + str.slice(index + 1);
}

export function scrollIntoViewById(id: string) {
    const element = document.querySelector(`${id}`);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}
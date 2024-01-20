import { jwtDecode } from "jwt-decode";

export const versions = [
    '1.7','1.6','1.5','1.4','1.3','1.2','1.1','1.0'
]


export const get_credentials = ()=> jwtDecode(typeof window !== "undefined" ? window?.localStorage?.getItem('credential') : null)
import { jwtDecode } from "jwt-decode";

export const get_credentials = () => typeof window !== "undefined" ? window?.localStorage?.getItem('credential') ? jwtDecode(window?.localStorage?.getItem('credential')) : null : null
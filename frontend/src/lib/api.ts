import { cookies } from 'next/headers';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

export default async function api<T>(endpoint: string, options: RequestInit = {}) {

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const config: RequestInit = {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {} ),
            ...options.headers
        },
    }

    let response = await fetch(`${BASE_URL}${endpoint}`, config);

    if(response.status === 401 && endpoint !== 'login'){
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });

        if(refreshRes.ok) {
            response = await fetch(`${BASE_URL}${endpoint}`, config);
        } else {
            if (typeof window !== 'undefined') window.location.href = '/login'
        }
    }

    const text = await response.text()

    if(!response.ok){
        const errorBody = await response.json().catch(() => ({}));
        console.log(response.status);
        throw {
        status: response.status,
        message: errorBody.message || 'Erro inesperado',
        data: errorBody
    };
    }

    if (!text) return {}; // Se vier vazio, retorna objeto vazio em vez de estourar erro

    return JSON.parse(text);    


}
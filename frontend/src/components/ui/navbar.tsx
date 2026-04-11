'use client'

import { usePathname } from 'next/navigation'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from './menubar';
import Link from 'next/link';
import { logoutAction } from '@/actions/auth-actions';


interface NavBarProps {
    isLoggedIn: boolean
}

export function NavBar({ isLoggedIn }: NavBarProps){
    const pathname = usePathname();

    if (pathname === '/login' || pathname === '/register') return null

    return(
        <header className="flex justify-center w-full z-50">
           <Menubar>
              <MenubarMenu>
                <Link href="/">
                    <MenubarTrigger className="cursor-pointer">🚀 TodoApp</MenubarTrigger>
                </Link>
              </MenubarMenu>
              {!isLoggedIn &&
              <MenubarMenu>
                <Link href="/login">
                    <MenubarTrigger className="cursor-pointer">Login</MenubarTrigger>
                </Link>
              </MenubarMenu>
              &&
              <MenubarMenu>
                <Link href="/register">
                    <MenubarTrigger className="cursor-pointer">Register</MenubarTrigger>
                </Link>
              </MenubarMenu>
              }   
              {isLoggedIn &&
              <MenubarMenu>
                <Link href="/tasks">
                    <MenubarTrigger className="cursor-pointer">Tasks</MenubarTrigger>
                </Link>
              </MenubarMenu>
              }
              { isLoggedIn &&
              <MenubarMenu>
                <MenubarTrigger>Minha Conta</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>Perfil</MenubarItem>
                    <MenubarItem>Configurações</MenubarItem>
    
                    <MenubarSeparator />
    
                    {/* O FORM FICA AQUI */}
                    <form action={logoutAction} className="w-full">
                        <button 
                            type="submit" 
                            className="w-full text-left px-2 py-1.5 text-sm text-red-500 hover:bg-red-50 focus:bg-red-50 outline-none transition-colors rounded-sm"
                        >
                            Sair da conta
                        </button>
                    </form>
                </MenubarContent>
            </MenubarMenu>
            }
           </Menubar>
        </header>
    )
}
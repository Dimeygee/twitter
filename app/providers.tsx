'use client'


import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "@/theme"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SessionProvider } from "next-auth/react"



export function Provider({ children }: { children: React.ReactNode }){
    return (
        <SessionProvider>
            <GoogleOAuthProvider clientId="1046171255974-ca2icrtrmulsch2asst25otajf9pbnlf.apps.googleusercontent.com">
                <CacheProvider>
                    <ChakraProvider theme={theme}>
                        { children }
                    </ChakraProvider>
                </CacheProvider>
            </GoogleOAuthProvider>
        </SessionProvider>
    )
}



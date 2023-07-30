'use client'


import Image from "next/image"
import { GridItem, Box, Text, Button, Input } from '@chakra-ui/react'
import { chirpBodlHeavy } from "@/theme/fonts"
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { signIn, getCsrfToken, getProviders, useSession } from 'next-auth/react'



export default function Auth(){

    const providers =  getProviders()
    const csrfToken =  getCsrfToken()
    console.log(providers)

    console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET)



    const handleSuccess = async (response: any) => {
        
        const formData = {
            access_token: response.credential,
            code: "",
            id_token: ""
        }
        const res = await fetch('http://localhost:8000/dj-rest-auth/google/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        const userData = await res.json()

        console.log(userData)
    }


    return (
        <section>
            <Box 
                display={{ base:"flex", md: "grid" }}
                minHeight="100vh"
                gridTemplateColumns={{ sm: "1fr 1fr", md: "1fr 45vw" }}
                gridTemplateRows="1fr auto"
                flexDirection="column"
            >
                <GridItem 
                    position="relative" 
                    bgColor="blue1" 
                    border="1px"
                    minH={{ base: "45vh" }}
                    order={{ base: "2", md: "1" }}
                    >
                        <Image 
                            src="/img/twitterx.png" 
                            alt="twiiterx"
                            fill
                            objectFit="cover"
                        />
                </GridItem>
                <GridItem border="1px" bg="black" display="flex" alignItems="center" padding="16px" order={{ base: "1" }}>
                    <Box padding="20px">
                        <svg viewBox="0 0 24 24" aria-hidden="true" height="3em"><g><path fill="white" d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"></path></g></svg>
                        <Text 
                            fontSize="64" 
                            color="lightGray" 
                            className={chirpBodlHeavy.className} 
                            letterSpacing="-1.2px"
                            my="48px"
                        >
                            Happening now
                        </Text>
                        <Text 
                            fontSize="31" 
                            className={chirpBodlHeavy.className} 
                            color="lightGray" 
                            my="32px"
                        >
                            join Twitter today
                        </Text>
                        <Box
                            display="flex"
                            flexDirection="column"
                        >
                            <Box
                                mb='20px'
                                h="40px"
                                position="relative"
                            >
                                <Button
                                    width="300px"
                                    borderRadius="full"
                                    fontWeight={500}
                                    fontSize="14px"
                                    letterSpacing="0.25px"
                                    leftIcon={<GoogleIcon />}
                                    pos="absolute"
                                >
                                    Sign up with Google
                                </Button>
                                <Box
                                    pos="absolute"
                                >
                                    <GoogleLogin
                                            width="300px"
                                            onSuccess={credentialResponse => {
                                                handleSuccess(credentialResponse)
                                            }}
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                    />
                                </Box>
                                
                            </Box>
                            
                            <Button
                                mb='20px'
                                width="300px"
                                borderRadius="full"
                                fontWeight={700}
                                fontSize="15px"
                                letterSpacing="0.25px"
                                leftIcon={<AppleIcon />}
                                cursor="not-allowed"
                            >
                                Sign up with Apple
                            </Button>
                                <Button
                                        width="300px"
                                        borderRadius="full"
                                        fontWeight={500}
                                        fontSize="14px"
                                        letterSpacing="0.25px"
                                        leftIcon={<GoogleIcon />}
                                        onClick={() => signIn('google')}

                                    >
                                        Sign up with Google
                                </Button>
                        </Box>
                        <Box 
                            display="flex"
                            width="300px"
                            gap={4}
                            alignItems='center'
                            mb={4}
                        >
                            <Box flexGrow={1} bg="darkGray" height="1px"></Box>
                            <Text color="white" fontSize="15px">or</Text>
                            <Box flexGrow={1} color="white" bg="darkGray" height="1px"></Box>
                        </Box>
                        <Button bg="blue2" color="white" width="300px" borderRadius="full" mb='8px' cursor="not-allowed">Create account</Button>
                        <Text color="textGray" width={300} fontSize="11px" mb="20px">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</Text>
                        <Box 
                            mt="40px"
                        >
                            <Text mb="20px" className={chirpBodlHeavy.className} fontSize={17} color="white">Already have an account?</Text>
                            <Button variant="outline" borderRadius="full" borderColor="blue1" width="300px" color="blue2" 
                                fontSize="15px"
                                _hover={{
                                    bg:"rgba(29, 155, 240, 0.1)"
                                }}
                                disabled={true}
                                cursor="not-allowed"
                                >Sign in</Button>
                        </Box>  
                    </Box>
                </GridItem>
                <GridItem colSpan={12} py="12px" px="16px" bg="black" display="flex" gap="16px" justifyContent="center" flexWrap="wrap" order={{ base: "3" }}>
                    { linkList.map(link => {
                        return (
                            <Text fontSize="13px" color="#536471" key={link}>{ link }</Text>
                        )
                    }) }
                </GridItem>
            </Box>
        </section>
    )
}


const GoogleIcon = () => {
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height={18} viewBox="0 0 48 48"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
    )
}


const AppleIcon = () => {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" height={20}><g><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path></g></svg>
    )
}

const linkList : string[] = [
    'About',
    'Help Center',
    'Terms of Service',
    'Privacy Policy',
    'Cookie Policy',
    'Accessibility',
    'Ads info',
    'Blog',
    'Status',
    'Careers',
    'Brand Resources',
    'Advertising',
    'Marketing',
    'Twitter for Business',
    'Developers',
    'Directory',
    'Settings',
    '© 2023 X Corp.',
]




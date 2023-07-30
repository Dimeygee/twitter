import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: "",
            clientSecret:""
        })
    ],
    callbacks: {
        async jwt({ token, account, user }){
            if(account?.provider === "google"){
                //console.log(account)
            }
            return token
        }   
    },
    pages:{
        signIn: "/app/auth/"
    }  
})

export { handler as GET, handler as POST }


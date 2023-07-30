import { extendTheme } from "@chakra-ui/react";
import { twitterTheme } from "./typography/style";



const overrides = {
    
}


export default extendTheme({ 
    ...twitterTheme, 
    overrides
})
import { Button, Container, Flex, HStack, Text, useColorMode} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { BsBrightnessHighFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";

const Navbar = () => {

  const {colorMode, toggleColorMode} = useColorMode();

    return (
        <Container maxW={"1140px"} px={"4"} >
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text bgGradient="linear(to-l, #7928CA, #FF0080)" 
                textAlign={'center'}
                textTransform={'uppercase'}
                bgClip="text" fontSize="3xl" fontWeight="extrabold">
                    <Link to={'/'}>Product St🛒re </Link>
                </Text>
                <HStack spacing={2} alignItems={'center'}>
                <Link to={'/create'}>
                <Button>
                <CiSquarePlus fontSize={30}/>
                </Button>
                </Link>
                <Button onClick={toggleColorMode}
                >
                {colorMode === "light"? <BsBrightnessHighFill/> : <MdDarkMode/>}
                
                </Button>
                
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;

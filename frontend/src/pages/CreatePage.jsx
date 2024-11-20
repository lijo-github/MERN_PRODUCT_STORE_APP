import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import  { useState } from 'react'
import { userProductStore } from '../store/product'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    image:"",
  })
  const toast = useToast();
  const navigate = useNavigate();

  const {createProduct} = userProductStore();

  const handleAddProduct = async() => {
   const {success, message} = await createProduct(newProduct)
   if(!success){
    toast({
      title: 'Error!!',
      description: message,
      status: 'error',
      duration: 1500,
      isClosable: true,
    })

    
   }else{
    toast({
      title: 'Success👍',
      description: message,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })

    setTimeout(() =>{
      navigate('/');
    },1500);
   }
   setNewProduct({name:"", price:"", image:""});
  };

  return (
    <Container maxW={"container.sm"}>
    <VStack
    spacing={8}
    >
    <Heading as={'h1'} size={"xl"} textAlign={"center"} mb={8} bgGradient='linear(to-l, #77618c,#c4b8cf )'
    bgClip='text' fontWeight='extrabold'>
    Create New Product
    </Heading>
    <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
    p={6} rounded={"lg"} shadow={"md"}
    >
    <VStack spacing={4}>
    <Input placeholder='Product Name'
    name='name'
    value={newProduct.name}
    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
    />
    <Input placeholder='Price'
    name='price'
    type='number'
    value={newProduct.price}
    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
    />
    <Input placeholder='Image URL'
    name='image'
    value={newProduct.image}
    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
    />
    <Button colorScheme='blue' onClick={handleAddProduct} w={"full"}>
    Add Product
    </Button>
    </VStack>
    
    </Box>
    </VStack>
    </Container>
  )
}

export default CreatePage

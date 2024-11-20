import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Input
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { userProductStore } from '../store/product';

const ProductCard = ({ product }) => {

  const [updatedProduct, setupdatedProduct] = useState(product || { name: '', price: '', image: '' });

  console.log(updatedProduct);



  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.700");

  const { deleteProduct, updateProduct} = userProductStore();
  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure();
  const cancelRef = useRef();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: 'Error!!',
        description: message,
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success👍',
        description: message,
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
    }
    onDeleteClose();
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    if (!product || !product._id) {
        toast({
            title: 'Error',
            description: 'Invalid product details.',
            status: 'error',
            duration: 2000,
            isClosable: true,
        });
        return;
    }

    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
        toast({
            title: 'Invalid Input',
            description: 'Please fill in all fields.',
            status: 'warning',
            duration: 2000,
            isClosable: true,
        });
        return;
    }

    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
        toast({
            title: 'Update Failed',
            description: message,
            status: 'error',
            duration: 2000,
            isClosable: true,
        });
    } else {
        toast({
            title: 'Product Updated',
            description: message,
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
        onEditClose();
    }
};


  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={250} w='full' objectFit='cover' />
      <Box p={2}>
        <Heading as='h3' size='md' mb='2'>
          {product.name}
        </Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={2}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onEditOpen} colorScheme='blue' />
          <IconButton
            icon={<DeleteIcon />}
            onClick={onDeleteOpen}
            colorScheme='red'
          />
        </HStack>
      </Box>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => handleDeleteProduct(product._id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder='Product Name' name='name' value={updatedProduct.name}
              onChange={(e) => setupdatedProduct({...updatedProduct, name:e.target.value})}
              />
              <Input placeholder='Product Price' name='price' type='number' value={updatedProduct.price} 
              onChange={(e) => setupdatedProduct({...updatedProduct, price:e.target.value})}
              />
              <Input placeholder='Image URL' name='image' value={updatedProduct.image} 
              onChange={(e) => setupdatedProduct({...updatedProduct, image:e.target.value})}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
          <Button colorScheme='blue' mr={3}
          onClick={() => handleUpdateProduct(product._id,updatedProduct)}
          >Update</Button>
            <Button onClick={onEditClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;

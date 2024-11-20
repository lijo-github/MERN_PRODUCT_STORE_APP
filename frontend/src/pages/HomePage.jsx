import { Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { userProductStore } from '../store/product';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    const { fetchProducts, products } = userProductStore();
    const isLoading = !products || products.length === 0; // Loading state

    useEffect(() => {
        fetchProducts();
    }, []); // fetchProducts assumed stable

    console.log('Products fetched:', products);

    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8}>
                <Heading
                    as={'h1'}
                    size={'xl'}
                    textAlign={'center'}
                    mb={8}
                    bgGradient="linear(to-l, #77618c,#c4b8cf )"
                    bgClip="text"
                    fontWeight="extrabold"
                >
                    Current Products 🚀
                </Heading>

                {isLoading ? (
                    <Text>Loading products...</Text>
                ) : (
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3,
                        }}
                        spacing={10}
                        w={'full'}
                    >
                        {products
                            .filter((product) => product && product._id) // Skip invalid products
                            .map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </SimpleGrid>
                )}

                {products && products.length === 0 && !isLoading && (
                    <Text fontSize="x1" textAlign={'center'} fontWeight="bold" color="gray.500">
                        No Products Found 🥺🥺{' '}
                        <Link to={'/create'}>
                            <Text as="span" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                                Create a Product
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;

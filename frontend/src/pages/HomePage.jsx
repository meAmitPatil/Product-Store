import { Container, SimpleGrid, Text, VStack, Input } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ProductCard from "../components/ProductCard";
import { useUser } from '@clerk/clerk-react';

const HomePage = () => {
	const { user } = useUser();
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const fetchProducts = useCallback(async (query = '') => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.get(`/api/products?search=${query}&userId=${user?.id}`);
			setFilteredProducts(response.data.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, [user?.id]);

	useEffect(() => {
		if (user) {
			fetchProducts();
		}
	}, [user, fetchProducts]);

	useEffect(() => {
		if (user) {
			fetchProducts(searchQuery);
		}
	}, [searchQuery, user, fetchProducts]);

	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleEdit = (product) => {
		navigate('/create', { state: { product } });
	};

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products 🚀
				</Text>

				<Input
					placeholder='Search for products...'
					value={searchQuery}
					onChange={handleInputChange}
					w={"full"}
					maxW={"md"}
				/>

				{loading && <Text>Loading...</Text>}
				{error && <Text color='red.500'>Error: {error}</Text>}

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{filteredProducts.map((product) => (
						<ProductCard key={product._id} product={product} onEdit={handleEdit} fetchProducts={fetchProducts} />
					))}
				</SimpleGrid>

				{filteredProducts.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};

export default HomePage;
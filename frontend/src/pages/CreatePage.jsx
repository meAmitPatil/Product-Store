import { Box, Button, Container, FormControl, FormLabel, Heading, Input, useColorModeValue, useToast, VStack, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useUser } from '@clerk/clerk-react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const CreatePage = () => {
	const { user } = useUser();
	const navigate = useNavigate();
	const [preview, setPreview] = useState("");
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
		category: "",
		brand: "",
		userId: user?.id || "",
	});
	const toast = useToast();
	const { createProduct } = useProductStore();
	const bgColor = useColorModeValue("white", "gray.800");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewProduct(prev => ({
			...prev,
			[name]: value
		}));
		if (name === 'image') setPreview(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!newProduct.name || !newProduct.price || !newProduct.image) {
			toast({
				title: "Error",
				description: "Please fill in all required fields",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		const { success, message } = await createProduct(newProduct);
		if (success) {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			navigate('/');
		} else {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Container maxW="container.md" py={12}>
			<VStack spacing={8} as="form" onSubmit={handleSubmit}>
				<Heading 
					as="h1" 
					size="xl" 
					bgGradient="linear(to-r, purple.500, blue.500)"
					bgClip="text"
					textAlign="center"
				>
					Create New Product
				</Heading>

				<MotionBox
					w="full"
					bg={bgColor}
					p={8}
					rounded="xl"
					shadow="lg"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<VStack spacing={6} w="full">
						{preview && (
							<Box w="full" h="200px" rounded="lg" overflow="hidden">
								<Image 
									src={preview} 
									alt="Preview" 
									w="full" 
									h="full" 
									objectFit="cover"
									fallback={<Text textAlign="center" py={8}>Invalid image URL</Text>}
								/>
							</Box>
						)}

						<FormControl isRequired>
							<FormLabel>Product Name</FormLabel>
							<Input
								name="name"
								value={newProduct.name}
								onChange={handleInputChange}
								placeholder="Enter product name"
								focusBorderColor="purple.500"
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Price</FormLabel>
							<Input
								name="price"
								type="number"
								value={newProduct.price}
								onChange={handleInputChange}
								placeholder="Enter price"
								focusBorderColor="purple.500"
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Image URL</FormLabel>
							<Input
								name="image"
								value={newProduct.image}
								onChange={handleInputChange}
								placeholder="Enter image URL"
								focusBorderColor="purple.500"
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Category</FormLabel>
							<Input
								name="category"
								value={newProduct.category}
								onChange={handleInputChange}
								placeholder="Enter category"
								focusBorderColor="purple.500"
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Brand</FormLabel>
							<Input
								name="brand"
								value={newProduct.brand}
								onChange={handleInputChange}
								placeholder="Enter brand"
								focusBorderColor="purple.500"
							/>
						</FormControl>

						<Button
							type="submit"
							colorScheme="purple"
							size="lg"
							w="full"
							mt={4}
							as={motion.button}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							Create Product
						</Button>
					</VStack>
				</MotionBox>
			</VStack>
		</Container>
	);
};

export default CreatePage;
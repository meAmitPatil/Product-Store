import { Box, Image, Text, Badge, Flex, IconButton, useColorModeValue, Tooltip, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Button, VStack, Input, useDisclosure } from "@chakra-ui/react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';

const MotionBox = motion(Box);

const ProductCard = ({ product, fetchProducts }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const toast = useToast();
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.100", "gray.700");
	const textColor = useColorModeValue("gray.600", "gray.300");

	const handleUpdate = async () => {
		try {
			await axios.put(`/api/products/${product._id}`, updatedProduct);
			toast({
				title: "Product updated.",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			onClose();
			fetchProducts();
		} catch (error) {
			toast({
				title: "Error updating product.",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/products/${product._id}`);
			toast({
				title: "Product deleted.",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			fetchProducts(); // Refresh the products list
		} catch (error) {
			toast({
				title: "Error deleting product.",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<>
			<MotionBox
				whileHover={{ y: -5 }}
				transition={{ duration: 0.2 }}
				bg={bgColor}
				borderWidth="1px"
				borderColor={borderColor}
				borderRadius="2xl"
				overflow="hidden"
				boxShadow="lg"
				position="relative"
			>
				<Box position="relative" overflow="hidden">
					<Image
						src={product.image}
						alt={product.name}
						w="full"
						h="250px"
						objectFit="cover"
						transition="transform 0.3s ease"
						_hover={{ transform: 'scale(1.05)' }}
					/>
					<Flex
						position="absolute"
						top={0}
						right={0}
						m={4}
						gap={2}
						opacity={0}
						transition="opacity 0.2s"
						_groupHover={{ opacity: 1 }}
					>
						<Tooltip label="View Details" placement="top">
							<IconButton
								icon={<FiEye />}
								rounded="full"
								colorScheme="blue"
								size="sm"
								onClick={() => {}}
							/>
						</Tooltip>
					</Flex>
				</Box>

				<Box p={6}>
					<Flex justify="space-between" align="start" mb={2}>
						<Box>
							<Badge 
								colorScheme="purple" 
								px={2} 
								py={1} 
								rounded="md"
								textTransform="capitalize"
							>
								{product.category}
							</Badge>
						</Box>
						<Text 
							fontSize="xl" 
							fontWeight="bold" 
							color="purple.500"
						>
							${product.price}
						</Text>
					</Flex>

					<Text 
						fontSize="xl" 
						fontWeight="semibold" 
						mb={2}
						noOfLines={1}
					>
						{product.name}
					</Text>

					<Text 
						color={textColor} 
						fontSize="sm" 
						mb={4}
						noOfLines={2}
					>
						Brand: {product.brand}
					</Text>

					<Flex justify="flex-end" gap={2} mt={4}>
						<Tooltip label="Edit Product" placement="top">
							<IconButton
								icon={<FiEdit2 />}
								variant="ghost"
								colorScheme="blue"
								size="sm"
								rounded="full"
								onClick={onOpen}
							/>
						</Tooltip>
						<Tooltip label="Delete Product" placement="top">
							<IconButton
								icon={<FiTrash2 />}
								variant="ghost"
								colorScheme="red"
								size="sm"
								rounded="full"
								onClick={handleDelete}
							/>
						</Tooltip>
					</Flex>
				</Box>
			</MotionBox>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder="Product Name"
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder="Price"
								type="number"
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: Number(e.target.value) })}
							/>
							<Input
								placeholder="Image URL"
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
							<Input
								placeholder="Category"
								value={updatedProduct.category}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
							/>
							<Input
								placeholder="Brand"
								value={updatedProduct.brand}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, brand: e.target.value })}
							/>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleUpdate}>
							Update
						</Button>
						<Button variant="ghost" onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

ProductCard.propTypes = {
	product: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		brand: PropTypes.string.isRequired
	}).isRequired,
	fetchProducts: PropTypes.func.isRequired
};

export default ProductCard;
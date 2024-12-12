import { Box, Container, Flex, Button, useColorMode, useColorModeValue, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiSun, FiMoon, FiPlus, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/clerk-react";

const MotionBox = motion(Box);

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const bgColor = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(26, 32, 44, 0.8)");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	return (
		<Box 
			as="nav" 
			position="fixed" 
			w="100%" 
			zIndex={999}
			bg={bgColor}
			backdropFilter="blur(10px)"
			borderBottom="1px"
			borderColor={borderColor}
		>
			<Container maxW="container.xl" px={4}>
				<Flex h="16" alignItems="center" justifyContent="space-between">
					<Link to="/">
						<MotionBox
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Flex align="center" gap={2}>
								<FiShoppingCart size={24} color={colorMode === 'light' ? '#805AD5' : '#D6BCFA'} />
								<Text
									fontSize="xl"
									fontWeight="bold"
									bgGradient="linear(to-r, purple.500, blue.500)"
									bgClip="text"
								>
									Product Store
								</Text>
							</Flex>
						</MotionBox>
					</Link>

					<Flex gap={3} align="center">
						<Link to="/create">
							<Button
								as={motion.button}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								leftIcon={<FiPlus />}
								colorScheme="purple"
								variant="ghost"
								size="sm"
							>
								Add Product
							</Button>
						</Link>

						<Button
							as={motion.button}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={toggleColorMode}
							variant="ghost"
							size="sm"
							aria-label="Toggle color mode"
						>
							{colorMode === 'light' ? <FiMoon /> : <FiSun />}
						</Button>

						<UserButton afterSignOutUrl="/sign-in" />
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
};

export default Navbar;
import {
  Box,
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box bg={bg} p={2}>
      <Container maxW="1140px" p={4}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDir={{ base: "column", md: "row" }}
        >
          <Link to="/">
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
            >
              Product Management
            </Text>
          </Link>
          <HStack spacing={6} alignItems="center">
            <Link to="/create-product">
              <PlusSquareIcon fontSize={24} />
            </Link>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <MoonIcon fontSize={24} />
              ) : (
                <SunIcon fontSize={24} />
              )}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;

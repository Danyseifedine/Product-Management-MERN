import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "./components/ProductCard";
import Layout from "./layouts/Main";

const HomePage = () => {
  const { getProducts, products, getProductCheaperThan, empty } = useProductStore();
  const toast = useToast();
  const [filterPrice, setFilterPrice] = useState(0);


  const handleFilter = async (e) => {
    e.preventDefault();
    const res = await getProductCheaperThan(filterPrice);
    if (empty) {
      toast({
        title: "Error",
        description: res.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFilterPrice(0);
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Layout>
      <Container maxW="container.xl" py={12}>
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
          <VStack spacing={4} mb={8} align="stretch">
            <Text fontSize="xl" fontWeight="semibold">
              Filter Products by Price
            </Text>
            <form onSubmit={handleFilter}>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <input
                  type="number"
                  name="price"
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  placeholder="Enter max price"
                  style={{
                    padding: "0.5rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #E2E8F0",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#4299E1",
                    color: "white",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Filter
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#A0AEC0",
                    color: "white",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
              </SimpleGrid>
            </form>
          </VStack>
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>

          {products.length === 0 && !empty && (
            <Text
              fontSize="xl"
              textAlign={"center"}
              fontWeight="bold"
              color="gray.500"
            >
              No products found 😢{" "}
              <Link to={"/create-product"}>
                <Text
                  as="span"
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                >
                  Create a product
                </Text>
              </Link>
            </Text>
          )}
          {empty && <Text>Oops! No products found with the specified price.</Text>}
        </VStack>
      </Container>
    </Layout>
  );
};

export default HomePage;

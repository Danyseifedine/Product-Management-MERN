import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Layout from "./layouts/Main";

const CreateProduct = () => {
  const { createProduct } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await createProduct(data);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Product created successfully",
        position: "top-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
      reset();
    } else {
      console.log(result);
    }
  };

  return (
    <Layout>
      <Flex align="center" justify="center" minHeight="80vh">
        <Box maxWidth="500px" width="100%" p={4}>
          <Heading mb={6} textAlign="center">
            Create Product
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.name}>
                <FormLabel>Product Name</FormLabel>
                <Input
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  placeholder="Enter product name"
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.price}>
                <FormLabel>Price</FormLabel>
                <Input
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                  type="number"
                  placeholder="Enter price"
                />
                <FormErrorMessage>
                  {errors.price && errors.price.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.imageUrl}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  {...register("imageUrl", {
                    required: "Image URL is required",
                  })}
                  placeholder="Enter image URL"
                />
                <FormErrorMessage>
                  {errors.imageUrl && errors.imageUrl.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={isLoading}
              >
                Create Product
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Layout>
  );
};

export default CreateProduct;

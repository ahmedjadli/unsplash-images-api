/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form } from "formik";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const LoginForm = ({ handleChange, values, errors, isValid, touched }) => {
  return (
    <Form>
      <Box padding="2rem 0">
        <Stack spacing={5}>
          <FormControl>
            <FormLabel htmlFor="username">
              <Text fontWeight="bold">Username</Text>
            </FormLabel>
            <Input
              isInvalid={touched.username && errors.username}
              errorBorderColor="red.500"
              value={values.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter your username"
              _placeholder={{ opacity: 1, color: "gray.500" }}
              focusBorderColor="black"
              id="username"
              type="text"
            />
            {touched.username && errors.username && (
              <FormHelperText color="red.500" fontSize="sm">
                {errors.username}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">
              <Text fontWeight="bold">Password</Text>
            </FormLabel>
            <Input
              isInvalid={touched.password && errors.password}
              errorBorderColor="red.500"
              value={values.password}
              onChange={handleChange}
              name="password"
              placeholder="••••••••••••"
              _placeholder={{ opacity: 1, color: "gray.500" }}
              focusBorderColor="black"
              id="password"
              type="password"
            />
            {touched.password && errors.password && (
              <FormHelperText color="red.500" fontSize="sm">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Flex padding="1rem 0 3rem">
          <Box>
            <Checkbox colorScheme="black">
              <Text fontWeight="bold" fontSize="xs" focusBorderColor="black">
                Remember for 30 days
              </Text>
            </Checkbox>
          </Box>
          <Spacer />
          <Box>
            <Text fontWeight="bold" fontSize="xs">
              Forget passowrd
            </Text>
          </Box>
        </Flex>

        <VStack>
          <Button
            colorScheme="blackAlpha"
            bg="black"
            width="100%"
            variant="solid"
            color="white"
            size="lg"
            type="submit"
            isDisabled={!isValid}
          >
            Sign in
          </Button>
          <Button
            colorScheme="blackAlpha"
            width="100%"
            size="lg"
            color="black"
            variant="outline"
            leftIcon={<FcGoogle size="32" />}
          >
            Sign in with Google
          </Button>
        </VStack>

        <Box padding="2rem 0">
          <Center width="100%">
            <Text fontSize="sm" color="gray">
              Don't have an account?
            </Text>
            <Text color="black" fontWeight="bold">
              Sign up for free
            </Text>
          </Center>
        </Box>
      </Box>
    </Form>
  );
};

export default LoginForm;

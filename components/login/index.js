/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Center,
  Flex,
  VStack,
  Text,
  Stack,
  Container,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Checkbox,
  Button,
  HStack,
  IconButton,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { useRouter } from "next/router";
import StarRatings from "react-star-ratings/build/star-ratings";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import LoginForm from "./form";
import { Formik } from "formik";
import LoginSchema from "./schema";
import axios from "axios";
import { setCookies } from "cookies-next";

const Login = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  return (
    <div>
      <Container bg="gray.200" minW="100%" height="100vh" centerContent>
        <Box
          maxW="95%"
          height="98%"
          bg="white"
          borderBottomLeftRadius="10"
          borderBottomRightRadius="10"
        >
          <Flex direction="row" align="center" justify="center" height="100%">
            <Box align="center" width="50%" padding="0 4rem">
              <Box w="70%">
                <Stack spacing={2}>
                  <Text fontSize="4xl" fontWeight="bold" textAlign="start">
                    Welcome Back !
                  </Text>
                  <Text fontSize="md" color="gray" textAlign="start">
                    Welcome back! Please enter your details.
                  </Text>
                </Stack>

                {/* <LoginForm /> */}
                <Formik
                  component={(props) => <LoginForm {...props} />}
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    axios
                      .post("/api/users/login", values)
                      .then((res) => {
                        setCookies("token", res.data.user.token, {
                          maxAge: 60 * 60 * 24, // 1 day
                          path: "/",
                        });
                        router.push("/");
                      })

                      .catch((err) => setError(err.response.data.error));
                  }}
                />
              </Box>
              {error && (
                <Alert margin="2rem 0" status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
            </Box>
            <Box width="50%" height="100%" position="relative">
              <div
                style={{
                  backgroundImage: `url(./assets/sideImage.jpeg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  height: "100%",
                  width: "100%",
                  borderBottomRightRadius: "10px",
                }}
              >
                <Flex
                  direction="row-reverse"
                  justifyContent="center"
                  alignItems="flex-end"
                  height="100%"
                  padding="2rem"
                >
                  <Box
                    bg="rgba(255, 255, 255, .15)"
                    backdropFilter="blur(10px)"
                    border="solid 1px rgba(255, 255, 255, .15)"
                    padding="1rem"
                  >
                    <Text
                      fontSize="3xl"
                      fontWeight="bold"
                      color="white"
                      padding="1rem 0.5rem"
                    >
                      "We've been using Untitled to kick start every new project
                      and can't imagine working without it."
                    </Text>

                    <Flex
                      direction="row-reverse"
                      alignItems="flex-end"
                      padding="0.5rem 1rem 0"
                    >
                      <StarRatings
                        starRatedColor="white"
                        starDimension="20px"
                        starSpacing="2px"
                        numberOfStars={5}
                        rating={5}
                      />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="bold" color="white">
                      Andi Lane
                    </Text>
                    <Flex direction="row" padding="1rem 0">
                      <VStack align="flex-start">
                        <Text fontSize="md" fontWeight="bold" color="white">
                          Founder,Catalog
                        </Text>
                        <Text fontSize="md" color="white">
                          Web Design Agency
                        </Text>
                      </VStack>
                      <Spacer />
                      <HStack spacing={6}>
                        <IconButton
                          variant="outline"
                          colorScheme="whiteAlpha"
                          aria-label="Send email"
                          icon={<ArrowBackIcon />}
                          borderRadius="100"
                          borderWidth="2px"
                          size="lg"
                        />
                        <IconButton
                          variant="outline"
                          colorScheme="whiteAlpha"
                          aria-label="Send email"
                          icon={<ArrowForwardIcon />}
                          borderRadius="100"
                          borderWidth="2px"
                          size="lg"
                        />
                      </HStack>
                    </Flex>
                  </Box>
                </Flex>
              </div>
            </Box>
          </Flex>
        </Box>
      </Container>
    </div>
  );
};

export default Login;

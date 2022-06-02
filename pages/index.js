import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";

import verifyUser from "../lib/verifyUser";
import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import ImagesList from "../components/pictures";
import Layout from "../components/layout";
import axios from "axios";

export default function Home(props) {
  const router = useRouter();

  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`https://api.unsplash.com/photos?per_page=20&page=${currentPage}`, {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`,
        },
      })
      .then((res) => {
        const imgs = res.data;

        setImages(imgs);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  const signoutHandler = () => {
    removeCookies("token");
    router.push("/login");
  };

  return (
    <Layout {...{ signoutHandler, user: props.user }}>
      <Container maxW="100%" height="100%" centerContent>
        <ImagesList {...{ images, user: props.user }} />
        <Flex direction="column" margin="2rem 0">
          <Center margin="1rem 0">
            <Text fontWeight="bold">Page : </Text>
            <Text>{currentPage}</Text>
          </Center>
          <Center>
            <HStack>
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Send email"
                icon={<ArrowBackIcon />}
                borderRadius="100"
                borderWidth="2px"
                size="lg"
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              />
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Send email"
                icon={<ArrowForwardIcon />}
                borderRadius="100"
                borderWidth="2px"
                size="lg"
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </HStack>
          </Center>
        </Flex>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const user = await verifyUser(req, res);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: {
      user,
    },
  };
}

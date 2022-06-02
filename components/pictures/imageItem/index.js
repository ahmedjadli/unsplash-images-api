import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Divider } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";

const ImageItem = ({ image, user }) => {
  const [liked, setLiked] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      axios
        .post(`/api/image/liked`, {
          username: user.username,
          id: image.id,
        })
        .then((res) => {
          if (res.data.liked) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        })
        .catch((err) => {});
    }
  }, [user, image]);

  const handleLike = () => {
    axios
      .patch("/api/image/like", { id: image.id, username: user.username })
      .then((res) => {
        setLiked(true);
      })
      .catch((err) => {});
  };
  return (
    <Box
      border="1px solid gray"
      borderRadius="10"
      padding="1rem"
      margin="1rem"
      w="fit-content"
    >
      <Image src={image?.urls.regular} width="200" height="200" />
      <Divider padding="0.5rem 0" />
      <Center margin="1rem 0 0">
        <Button
          rightIcon={<StarIcon />}
          colorScheme="teal"
          variant={liked ? "solid" : "outline"}
          width="100%"
          onClick={() => handleLike()}
        >
          Like
        </Button>
      </Center>
    </Box>
  );
};

export default ImageItem;

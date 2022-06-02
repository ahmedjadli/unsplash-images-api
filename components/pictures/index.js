import { Box, Center, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import ImageItem from "./imageItem";

const ImagesList = ({ images, user }) => {
  return (
    <Flex justifyContent="center" alignItems="center" w="100%">
      <Box>
        <Wrap spacing={3} padding="2rem" margin="0 auto">
          {images?.map((image) => (
            <WrapItem key={image.id}>
              <ImageItem image={image} user={user} />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Flex>
  );
};

export default ImagesList;

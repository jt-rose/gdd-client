import { Button as ChakraButton } from "@chakra-ui/react";

export const Button = (props) => {
  return <ChakraButton colorScheme="blue">{props.children}</ChakraButton>;
};

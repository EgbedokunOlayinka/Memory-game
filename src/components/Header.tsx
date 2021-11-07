import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  Spacer,
  Button,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { useAppState } from "../context/AppContext";

const Header = () => {
  const { resetGame, restartGame } = useAppState();

  const textColor = useColorModeValue("primary", "white");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  return (
    <Box>
      <Flex alignItems="center">
        <Text fontWeight="600" color={textColor} fontSize="3xl">
          Memory
        </Text>
        <Spacer />
        <ColorModeSwitcher />
        <Spacer />
        <HStack spacing={4}>
          {isLargerThan550 ? (
            <>
              <Button
                background="tertiary"
                borderRadius="50"
                color="primary"
                _hover={{ bg: "main", color: "white" }}
                onClick={(e) => restartGame()}
              >
                Restart
              </Button>
              <Button
                background="tertiary"
                borderRadius="50"
                color="primary"
                _hover={{ bg: "main", color: "white" }}
                onClick={(e) => resetGame()}
              >
                New Game
              </Button>
            </>
          ) : (
            <Button
              background="tertiary"
              borderRadius="50"
              color="primary"
              _hover={{ bg: "main", color: "white" }}
            >
              Menu
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;

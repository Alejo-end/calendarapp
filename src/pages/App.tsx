import React from "react";
import { ChakraProvider, Box, VStack, theme, Flex } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { useLocation } from "react-router-dom";
import Readme from "../components/Readme";
import { Route, Switch, Link } from "react-router-dom";
import Calendar from "./Calendar";

export const App = () => {
  let location = useLocation();
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />

      <VStack>
        <Box>
          <Flex align="center" justify="space-evenly" width="15%" m="auto">
            {location.pathname === "/calendar" ? (
              <Link to="/">Home</Link>
            ) : (
              <Link to="/calendar">Calendar</Link>
            )}
          </Flex>
          <Switch>
            <Route path="/" exact component={Readme} />
            <Route path="/calendar" component={Calendar} />
          </Switch>
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

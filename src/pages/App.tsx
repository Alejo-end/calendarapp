import * as React from "react";
import { ChakraProvider, Box, VStack, theme, Text } from "@chakra-ui/react";
/* import Readme from "../components/Readme"; */
import { Route, Switch } from "react-router-dom";
import Calendar from "./Calendar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <VStack>
      <Box>
        <Text>Hello World</Text>
        <Switch>
          <Route path="/calendar" component={Calendar} />
        </Switch>
      </Box>
    </VStack>
  </ChakraProvider>
);

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Container,
} from "@chakra-ui/react"
import { StacApiProvider } from "@developmentseed/stac-react";
import theme from "./theme"
import Home from "./pages/Home";
import CollectionList from "./pages/CollectionList";
import { MainNavigation } from "./components";

export const App = () => (
  <ChakraProvider theme={theme}>
    <StacApiProvider apiUrl="http://localhost:8081">
      <Router>
        <Container mx="auto" p="5" bgColor="white" boxShadow="md">
          <Box
            as="header"
            borderBottom="1px dashed"
            borderColor="gray.300"
            fontWeight="bold"
            mb="4"
            pb="4"
            textTransform="uppercase"
          >
            STAC Admin
          </Box>
          <Box display="grid" gridTemplateColumns="1fr 2fr" gap="8">
            <MainNavigation />
            <Box as="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections/" element={<CollectionList />} />
              </Routes>
            </Box>
          </Box>
        </Container>
      </Router>
    </StacApiProvider>
  </ChakraProvider>
)

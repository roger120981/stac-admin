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
import { MainNavigation } from "./components";
import Home from "./pages/Home";
import CollectionList from "./pages/CollectionList";
import CollectionForm from "./pages/CollectionForm";
import ItemList from "./pages/ItemList";
import ItemForm from "./pages/ItemForm";

export const App = () => (
  <ChakraProvider theme={theme}>
    <StacApiProvider apiUrl="http://localhost:8081">
      <Router>
        <Container mx="auto" p="5" bgColor="white" boxShadow="md">
          <Box
            as="header"
            borderBottom="1px dashed"
            borderColor="gray.300"
            mb="4"
            pb="4"
            display="flex"
          >
            <Box flex="1" fontWeight="bold" textTransform="uppercase">STAC Admin</Box>
            <MainNavigation />
          </Box>
          <Box as="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections/" element={<CollectionList />} />
              <Route path="/collections/:collectionId/" element={<CollectionForm />} />
              <Route path="/items/" element={<ItemList />} />
              <Route path="/collections/:collectionId/items/:itemId/" element={<ItemForm />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </StacApiProvider>
  </ChakraProvider>
)

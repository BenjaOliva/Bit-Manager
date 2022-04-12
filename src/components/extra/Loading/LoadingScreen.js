import {
  Box,
  Text,
  VStack,
  Grid,
  Image,
  Center,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import logo from '../../../assets/divina-logo-simple.png';
import logoDark from '../../../assets/divina-logo-simple-dark.png';

function LoadingPage() {
  const themeLogo = useColorModeValue(true, false);
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Center pt={'10vh'} pb={85}>
            {themeLogo ? (
              <Image boxSize="180px" src={logoDark}></Image>
            ) : (
              <Image boxSize="180px" src={logo}></Image>
            )}
          </Center>
          <Spinner size="xl" />
          <Text>Cargando...</Text>
        </VStack>
      </Grid>
    </Box>
  );
}

export default LoadingPage;

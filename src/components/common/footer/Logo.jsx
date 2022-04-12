import { useColorModeValue, Image } from '@chakra-ui/react';
import * as React from 'react';
import logo from '../../../assets/divina-logo-simple.png';
import logoDark from '../../../assets/divina-logo-simple-dark.png';

export const Logo = (props) => {
  const themeLogo = useColorModeValue(true, false);

  return (
    <Image src={themeLogo ? logoDark : logo} boxSize={{ lg: '22vh', md: '12vh', base: '35%' }} />
  );
};

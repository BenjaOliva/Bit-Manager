// Chakra Imports
import {
  Button,
  Flex,
  Box,
  Avatar,
  Center,
  MenuDivider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
// Custom Components
import { SidebarResponsive } from 'components/Sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';
import routes from 'routes.js';
import { logout } from 'services/firebase';

const LogOutmodal = ({ isOpen, onClose }) => {
  const initialFocusRef = React.useRef()
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialFocusRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Seguro desea cerrar sesion ?</ModalHeader>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button ref={initialFocusRef} colorScheme="red" mr={3} onClick={logout}>
            Cerrar sesion
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Chakra Color Mode
  let mainText = useColorModeValue('gray.700', 'gray.200');
  let navbarIcon = useColorModeValue('gray.500', 'gray.200');

  if (secondary) {
    navbarIcon = 'white';
    mainText = 'white';
  }

  return (
    <>
      <Flex
        pe={{ sm: '0px', md: '16px' }}
        w={{ sm: '100%', md: 'auto' }}
        alignItems="flex-end"
        flexDirection="column">
        <Box mb={{ sm: '20px', md: '0px' }}>
          <Menu ms="0px" px="0px" me={{ sm: '2px', md: '16px' }}>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Avatar
                size={'sm'}
                src={'https://ui-avatars.com/api/?uppercase=true&name=Patricio+Arancibia'}
              />
            </MenuButton>
            <MenuList alignItems={'center'}>
              <br />
              <Center>
                <Avatar
                  size={'2xl'}
                  src={'https://ui-avatars.com/api/?uppercase=true&name=Patricio+Arancibia'}
                />
              </Center>
              <br />
              <Center>
                <p>Patricio Arancibia</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem onClick={props.onOpen}>Admin Settings</MenuItem>
              <MenuItem onClick={onOpen}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <SidebarResponsive
          logoText={props.logoText}
          secondary={props.secondary}
          routes={routes}
          // logo={logo}
          {...rest}
        />
      </Flex>
      <LogOutmodal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};

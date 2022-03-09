import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useHistory } from 'react-router';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const toast = useToast();
  const handleClick = () => {
    setShow(!show);
  };
  const submitHandler = async () => {
    setIsLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please full all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      );
      toast({
        title: 'Login is Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
      history.push('/chat');
    } catch (err) {
      toast({
        title: 'Error occurred',
        description: err?.response?.data?.message || 'description',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          defaultValue={email}
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            defaultValue={password}
            type={show ? 'true' : 'password'}
            placeholder="Enter Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        color="white"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail('guest@example.com');
          setPassword(123456);
        }}
      >
        Get guest users credentials
      </Button>
    </VStack>
  );
};
export default Login;

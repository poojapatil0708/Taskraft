import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Avatar,
} from '@chakra-ui/react'
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../redux/user-reducer';

const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode()
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Box fontWeight="bold">TodoList</Box>
                <Stack direction={'row'} spacing={5} alignItems="center" >
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <IoIosMoon size={25} /> : <IoIosSunny size={25} />}
                    </Button>
                    <Box display="flex" flexDirection="row" alignItems="center" gap={5} >
                        <Avatar
                            name={user.first_name + ' ' + user.last_name}
                        />
                        <Button onClick={() => dispatch(removeUser())}>Logout</Button>
                    </Box>
                </Stack>
            </Flex>
        </Box>
    );
}

export default Navbar;
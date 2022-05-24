import { Button,Box,useColorModeValue } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
export default function ShowFollowers(props) {
    const { user: walletUser } = useSelector((state) => state.user);
    const [toggle, setToggle] = useState(false);
    const [buttonText, setButtonText] = useState('Show only following');
    const colorBtn = useColorModeValue("white", "black");
    const dispatch = useDispatch();
    const {sFollowers} = props;
    const toggleFollowers = (data) => {
        if(toggle){
            setToggle(false)
            sFollowers(false)
            setButtonText('Show only following')

        }else{
            setToggle(true)
            sFollowers(true)
            setButtonText('Show all post')
        }
    };
    return (
      <Box>
        <Button
          onClick={() => {
            toggleFollowers(walletUser);
          }}
          colorScheme="cyan"
          color={colorBtn}
          borderRadius="3xl"
        >
          {buttonText}
        </Button>
      </Box>
    );
  }
  
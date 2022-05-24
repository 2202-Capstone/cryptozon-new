import { Button,Box,useColorModeValue } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
export default function ShowFollowers() {
    const { user: walletUser } = useSelector((state) => state.user);
    const [toggle, setToggle] = useState(false);
    const [buttonText, setButtonText] = useState('Show only followers');
    const colorBtn = useColorModeValue("white", "black");
    const dispatch = useDispatch();
    const toggleFollowers = (data) => {
        if(toggle){
            setToggle(false)
            setButtonText('Show all post')
        }else{
            setToggle(true)
            setButtonText('Show only followers')
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
  
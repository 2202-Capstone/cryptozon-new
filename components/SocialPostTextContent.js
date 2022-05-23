import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
export default function SocialPostTextContent({ username, content }) {
  const [truncate, setTruncate] = useState(true);
  return (
    <Box display="flex" pt="1" px="4" pb="1">
      <Text
        onClick={() => {
          setTruncate((prev) => !prev);
        }}
        textAlign="left"
        {...(truncate && { noOfLines: "2" })}
        cursor="default"
      >
        <Text as="span" fontWeight="bold">
          {username}{" "}
        </Text>
        {content}
      </Text>
    </Box>
  );
}

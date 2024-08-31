import { useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <footer
      style={{
        backgroundColor: bg,
        padding: "20px",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <p>&copy; 2023 Your Company Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

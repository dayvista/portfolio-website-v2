import { Flex, useColorMode } from "@chakra-ui/react";

const KoFiDonation = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex justify="center" align="center" w="100%" m="2.5vh auto !important">
      <iframe
        src="https://ko-fi.com/liamdavis/?hidefeed=true&widget=true&embed=true&preview=true"
        style={{
          border: "none",
          width: "70%",
          padding: "16px",
          background: "#f7f7f7",
          overflowX: "hidden",
          boxShadow:
            colorMode === "light"
              ? "-1px 2px 13px 1px rgb(86 78 88 / 40%)"
              : "-1px 2px 13px 1px rgb(195 187 196 / 40%)",
        }}
        height="670"
        title="liamdavis"
      />
    </Flex>
  );
};

export default KoFiDonation;

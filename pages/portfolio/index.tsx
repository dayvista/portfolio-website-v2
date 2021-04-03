import Frame from "src/components/Frame";
import PortfolioItem from "src/components/PortfolioItem";
import { portfolioItems } from "src/lib/data";
import { Divider, Box } from "@chakra-ui/react";

const PortfolioPage = () => {
  return (
    <Frame>
      {portfolioItems.map((item, i) => {
        return (
          <>
            <PortfolioItem
              heading={item.heading}
              duration={item.duration}
              description={item.description}
              technologies={item.technologies}
              link={item.link}
              key={`${item.heading}-${item.description}`}
            />
            {i + 1 < portfolioItems.length ? (
              <Divider key={`${item.heading}-divider`} />
            ) : null}
          </>
        );
      })}
    </Frame>
  );
};

export default PortfolioPage;

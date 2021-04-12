import Frame from "src/components/Frame";
import PortfolioItem from "src/components/PortfolioItem";
import { portfolioItems } from "src/lib/data";
import { Divider } from "@chakra-ui/react";
import { Fragment } from "react";

const PortfolioPage = () => {
  return (
    <Frame>
      {portfolioItems.map((item, i) => {
        return (
          <Fragment key={`${item}-fragment`}>
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
          </Fragment>
        );
      })}
    </Frame>
  );
};

export default PortfolioPage;

import { default as NextLink } from "next/link";
import { Button } from "@chakra-ui/react";

interface TagButtonInterface {
  tag: string;
}

const TagButton = ({ tag }: TagButtonInterface) => {
  return (
    <NextLink href={`/blog/tag/${tag}`}>
      <a>
        <Button variant="tag">{tag}</Button>
      </a>
    </NextLink>
  );
};

export default TagButton;

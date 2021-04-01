import { useEffect } from "react";
import Loading from "src/components/Loading";
import { useRouter } from "next/router";

const PostPageRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/blog");
  }, [router]);

  return <Loading />;
};

export default PostPageRedirect;

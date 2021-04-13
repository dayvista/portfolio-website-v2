import { useEffect } from "react";
import Loading from "src/components/Loading";
import { useRouter } from "next/router";

const Donate = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/donate/kofi");
  }, []);

  return <Loading />;
};

export default Donate;

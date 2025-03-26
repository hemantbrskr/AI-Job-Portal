import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (callback, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      const res = await callback(supabaseAccessToken, options, ...args);
      setData(res);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { fn, data, loading, error };
};

export default useFetch;

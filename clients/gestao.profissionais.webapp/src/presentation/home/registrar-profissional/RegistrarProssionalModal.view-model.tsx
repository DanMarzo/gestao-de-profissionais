import { useState } from "react";

const useRegistrarProssionalViewModel = () => {
  const [loading, setLoading] = useState(false);

  return { loading };
};

export { useRegistrarProssionalViewModel };

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { EspecialidadeModel } from "../models/especialidade.model";
import { obterEspecialidadesService } from "../infra/services/obter-especialidades.service";

interface EspecialidadesContextProps {
  especialidades: Array<EspecialidadeModel>;
  obterEspecialidades: () => void;
  carregando: boolean;
}

const EspecialidadeContext = createContext<EspecialidadesContextProps>(
  {} as EspecialidadesContextProps
);

const EspecialidadeProvider = ({ children }: PropsWithChildren) => {
  const [especialidades, setEspecialidades] = useState<EspecialidadeModel[]>(
    []
  );
  const [carregando, setCarregando] = useState(false);

  const obterEspecialidades = async () => {
    setCarregando(true);
    obterEspecialidadesService()
      .then((result) => {
        console.log(result);
        setEspecialidades(result.data ?? []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    obterEspecialidades();
    return () => {};
  }, []);

  return (
    <EspecialidadeContext.Provider
      value={{
        especialidades,
        carregando,
        obterEspecialidades,
      }}
    >
      {children}
    </EspecialidadeContext.Provider>
  );
};

export type { EspecialidadesContextProps };
export { EspecialidadeProvider, EspecialidadeContext };

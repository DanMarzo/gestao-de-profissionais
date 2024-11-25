import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { EspecialidadeModel } from "../models/especialidade.model";
import { obterEspecialidadesService } from "../infra/services/obter-especialidades.service";
import { toast } from "react-toastify";

interface EspecialidadesContextProps {
  especialidades: Array<EspecialidadeModel>;
  obterEspecialidades: () => void;
  carregando: boolean;
}

const EspecialidadeContext = createContext<EspecialidadesContextProps>(
  {} as EspecialidadesContextProps
);

const EspecialidadeProvider = ({ children }: PropsWithChildren) => {
  const [especialidades, setEspecialidades] = useState<
    Array<EspecialidadeModel>
  >([]);
  const [carregando, setCarregando] = useState(false);

  const obterEspecialidades = async () => {
    setCarregando(true);
    obterEspecialidadesService()
      .then((result) => {
        if (result.error) {
          toast("Não foi possível obter todas especialidades.", {
            type: "warning",
          });
        } else {
          setEspecialidades(result.data ?? []);
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Ocorreu um erro ao obter as especialidades.", {
          type: "error",
        });
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

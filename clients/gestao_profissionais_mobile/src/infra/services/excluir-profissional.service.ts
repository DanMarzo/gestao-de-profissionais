import { getHttp } from "../http";

const excluirProfissionalService = async (
  idProfissional: number
): Promise<boolean> => {
  const response = await (await getHttp()).delete(`/api/Profissional/${idProfissional}`);
  return response.status == 200;
};
export { excluirProfissionalService };

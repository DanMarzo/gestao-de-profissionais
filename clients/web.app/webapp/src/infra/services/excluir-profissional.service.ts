import { http } from "../http";

const excluirProfissionalService = async (
  idProfissional: number
): Promise<boolean> => {
  const response = await http.delete(`/api/Profissional/${idProfissional}`);
  return response.status == 200;
};
export { excluirProfissionalService };

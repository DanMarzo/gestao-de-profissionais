import { nomeTipoDocEspecialidadeEnum } from "../../../models/especialidade.model";
import { ProfissionalModel } from "../../../models/profissional.model";

type Props = {
  profissionais: Array<ProfissionalModel>;
};

const TableListProfissionaisComponent = ({ profissionais }: Props) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Especialidade</th>
          <th scope="col">Tipo do Documento</th>
          <th scope="col">Número do Documento</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {profissionais.map((profissional, index) => {
          return (
            <tr key={index}>
              <th scope="row">{profissional.id}</th>
              <td>{profissional.nome}</td>
              <td>{profissional.especialidade.nome}</td>
              <td>
                {nomeTipoDocEspecialidadeEnum(
                  profissional.especialidade.tipoDocumento
                )}
              </td>
              <td>{profissional.numeroDocumento}</td>
              <td>
                <button className="btn">
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableListProfissionaisComponent;

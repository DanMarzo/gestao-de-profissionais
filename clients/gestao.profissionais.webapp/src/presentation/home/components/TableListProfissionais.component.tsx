import { nomeTipoDocEspecialidadeEnum } from "../../../models/especialidade.model";
import { ProfissionalModel } from "../../../models/profissional.model";
import { AtualizarProfissionalModal } from "../atualizar-profissional/AtualizarProfissionalModal";
import { ExcluirProfissionalModal } from "../excluir-profissional/ExcluirProfissionalModal";

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
                <div className="dropdown">
                  <button
                    className="btn border-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <h6 className="dropdown-header">AÇÕES:</h6>
                    </li>
                    <li>
                      <AtualizarProfissionalModal />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target={`atualizarProfissionalModal${profissional.id}`}
                      >
                        Excluir
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
      <ExcluirProfissionalModal profissional={profissionais[0]} />
    </table>
  );
};

export default TableListProfissionaisComponent;

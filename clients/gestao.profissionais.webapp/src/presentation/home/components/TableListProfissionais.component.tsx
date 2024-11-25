import { useContext } from "react";
import { nomeTipoDocEspecialidadeEnum } from "../../../models/especialidade.model";
import { AtualizarProfissionalModal } from "../atualizar-profissional/AtualizarProfissionalModal";
import { ExcluirProfissionalModal } from "../excluir-profissional/ExcluirProfissionalModal";
import { ProfissionalContext } from "../../../providers/Profissional.context";

const TableListProfissionaisComponent = () => {
  const {
    profissionais,
    handleProfissionalParaAtualizar,
    handleProfissionalParaExcluir,
  } = useContext(ProfissionalContext);
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
        {profissionais?.data.map((profissional, index) => {
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
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleProfissionalParaAtualizar(profissional)
                        }
                      >
                        Atualizar
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleProfissionalParaExcluir(profissional)
                        }
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
      <ExcluirProfissionalModal />
      <AtualizarProfissionalModal />
    </table>
  );
};

export default TableListProfissionaisComponent;

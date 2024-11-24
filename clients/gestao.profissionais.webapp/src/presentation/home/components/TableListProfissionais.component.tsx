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
              <th>{profissional.nome}</th>
              <th>{profissional.especialidade.nome}</th>
              <th>{profissional.especialidade.tipoDocumento}</th>
              <th>{profissional.numeroDocumento}</th>
              <th>
                <button className="btn">
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableListProfissionaisComponent;

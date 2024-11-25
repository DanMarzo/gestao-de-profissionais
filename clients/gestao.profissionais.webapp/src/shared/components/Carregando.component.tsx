import { LoadingOutlined } from "@ant-design/icons";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  carregando: boolean;
}
const Carregando = ({ carregando, children }: Props) => {
  return (
    <>
      {carregando ? (
        <div className="d-flex justify-content-center align-items-center gap-2 ">
          <div className="d-flex align-items-center">
            <LoadingOutlined />
          </div>
          <div>Carregando...</div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Carregando;

import { useContext, useEffect, useState } from "react";
import { ProfissionalContext } from "../../providers/Profissional.context";

const Alert = () => {
  const { alertType } = useContext(ProfissionalContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    handleShowAlert();
    return () => {};
  }, [alertType]);

  const handleShowAlert = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };
  return (
    <>
      {visible ? (
        <>
          {alertType && (
            <div
              className={`alert alert-${alertType?.type}  alert-dismissible fade show`}
              role="alert"
            >
              <span>{alertType?.message}</span>
              <button
                type="button"
                className="btn-close btn-sm"
                aria-label="Close"
                onClick={() => setVisible(false)}
              ></button>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Alert;

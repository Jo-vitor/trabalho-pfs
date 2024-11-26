import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const EditarCarro = () => {
  const [objeto, setObjeto] = useState(
    { id: "", modelo: "", ano: 0, preco: 0 }
  )

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5146/carros/${id}`, { withCredentials: true }).then(resp => {
      console.log(resp.data);
      setObjeto(resp.data);
    })
  }, [id]);

  const atualizarCampo = (nome, valor) => {
    let objNovo = { ...objeto };
    objNovo[nome] = valor;
    setObjeto(objNovo);
  }

  const salvar = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5146/carros/${id}`, objeto, { withCredentials: true });

    navigate('/adm/home');
  }

  const voltar = (e) => {
    e.preventDefault();
    navigate('/adm/home');
  }

  return (
    <form>
      <div className="container mt-5">
        <h1>Editar Carro</h1>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Modelo</label>
          <input
            type="text"
            className="form-control"
            value={objeto.modelo}
            onChange={e => atualizarCampo('modelo', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Ano</label>
          <input
            type="text"
            className="form-control"
            value={objeto.ano}
            onChange={e => atualizarCampo('ano', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Valor da Diária</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={objeto.preco}
            onChange={e => atualizarCampo('preco', e.target.value)}
          />
        </div>
        <div className="card-footer d-flex justify-content-start gap-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={e => salvar(e)}
          >
            Salvar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={e => voltar(e)}
          >
            Voltar
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditarCarro;
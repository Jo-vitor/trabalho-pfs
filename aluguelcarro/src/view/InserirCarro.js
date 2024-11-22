import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InserirCarro = () => {

    const navigate = useNavigate();


    const [objeto, setObjeto] = useState(
        {modelo: "", preco: 0}
    )

    const salvar = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5146/carros', objeto).then( resp => {
            navigate('/home');
        });
    }

    const voltar = (e) => {
        e.preventDefault();
        navigate('/home');
    }

    const atualizarCampo = (nome, valor) => {
        let objNovo = {...objeto};
        objNovo[nome] = valor;
        setObjeto(objNovo);
    }

    return (
        <form>
            <div className="container mt-5">
                <h1>Inserir Carro</h1>
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
                    <label htmlFor="title" className="form-label">Valor da Diária</label>
                    <input
                        type="number"
                        className="form-control"
                        min= "1"
                        value={objeto.preco}
                        onChange={e => atualizarCampo('preco', e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={e => salvar(e)}
                >
                    Inserir
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={e => voltar(e)}
                >
                    Voltar
                </button>
            </div>
        </form>
    );

};

export default InserirCarro;
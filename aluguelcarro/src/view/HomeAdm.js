import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeAdm = () => {

    const [objetos, setObjetos] = useState(null);

    const carregarDados = () => {
        axios.get('http://localhost:5146/carros').then(resp => {
            console.log(resp.data);
            setObjetos(resp.data);
        }).catch(erro => { console.log(erro) })
    };

    useEffect(() => {
        carregarDados();
    }, []);



    if (!objetos) {
        return <div>Carregando...</div>
    }

    const excluir = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:5146/carros/${id}`).then(() => {
            setObjetos(prevObjetos => prevObjetos.filter(car => car.id !== id));
        })
    };


    return (
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{ width: "100%" }}>
            {objetos.map(car => (
                <div className="col" key={car.id}>
                    <div className="card h-100">
                        <img
                            src={car.image}
                            className="card-img-top"
                            alt={car.modelo}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{car.modelo}</h5>
                            <p className="card-text">{car.ano}</p>
                            <p className="card-text">Diária: {car.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="card-footer d-flex justify-content-end gap-2">
                            <Link to={`/adm/editar/${car.id}`} type="button" className="btn btn-success">Editar</Link>

                            <button className="btn btn-danger" onClick={e => excluir(e, car.id)}>Excluir</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeAdm;
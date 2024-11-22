import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HomeAdm = () => {
    /*const [carros, setObjetos] = useState([
    {
        id: 1,
        modelo: "HONDA HR-V", //!!
        ano: "2020",
        preco: 255.80, //!!
        image: "https://storagew.mercadorweb.com.br/imagens/veiculos/9/2024/7/honda-hr-v-exl-1-8-flexone-16v-5p-aut-2020-260423-1-sm.jpg",
    },
    {
        id: 2,
        modelo: "HYUNDAI HB20X", //!!
        ano: "2017",
        preco: 222.00, //!!
        image: "https://storagew.mercadorweb.com.br/imagens/veiculos/71/2024/8/hyundai-hb20x-premium-1-6-flex-16v-aut-2017-260828-2-sm.jpg",
        alugado: false,
    }
]);
*/

    const [objetos, setObjetos] = useState(null);

    const navigate = useNavigate();
    
    const carregarDados = () => {
        axios.get('http://localhost:5146/carros').then(resp => {
            //console.log(resp.data);
            setObjetos(resp.data);
        }).catch(erro => {console.log(erro) })
    };

    useEffect(() => {
        carregarDados();
    },[]);

    

    if (!objetos) {
        return <div>Carregando...</div>
    }

    const excluir = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:5146/carros/${id}`).then(
            resp => {
                navigate('/home')
            }
        )
    }

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
                            <Link to="/adm/editar" type="button" className="btn btn-secondary">Consultar</Link>

                            <Link to="/adm/editar" type="button" className="btn btn-success">Editar</Link>
                            
                            <button className="btn btn-danger" onClick={e => excluir(e, car.id)}>Excluir</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeAdm;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeAdm = () => {
    /*const [carros, setCarros] = useState([
        {
            id: 1,
            modelo: "HONDA HR-V",
            ano: "2020",
            preco: 255.80,
            image: "https://storagew.mercadorweb.com.br/imagens/veiculos/9/2024/7/honda-hr-v-exl-1-8-flexone-16v-5p-aut-2020-260423-1-sm.jpg",
            alugado: false,
            QuantidadeDias: 0,
        },
        {
            id: 2,
            modelo: "HYUNDAI HB20X",
            ano: "2017",
            preco: 222.00,
            image: "https://storagew.mercadorweb.com.br/imagens/veiculos/71/2024/8/hyundai-hb20x-premium-1-6-flex-16v-aut-2017-260828-2-sm.jpg",
            alugado: false,
            QuantidadeDias: 0,
        }
    ]);
    */

    const [objetos, setObjetos] = useState(null);
    
    const carregarDados = () => {
        axios.get('http://localhost:5146/carros').then(resp => {
            console.log(resp.data);
        }).catch(erro => {console.log(erro);
        })
    };

    useEffect(() => {
        carregarDados();
    },[]);

    return (
     <div></div>  
    )
};

export default HomeAdm;
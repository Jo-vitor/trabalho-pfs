import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {

    const [objeto, setObjeto] = useState({
        login: '', 
        hashSenha: ''
    })

    const navigate = useNavigate();
    const [falha, setFalha] = useState(null);
    const { redirecionarPara } = useParams();

    // const atualizarCampo = (nome, valor) => {
    //     let objNovo = { ...objeto };
    //     objNovo[nome] = valor;
    //     setObjeto(objNovo);
    // }

    const sucessoLogin = (usuario) => {
        sessionStorage.setItem("usuario-login", usuario.login);
        console.log(usuario);
        navigate("/usuario/home");

        
    };
    

    const logar = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5146/login', objeto).then(res => {
            //console.log(res);
            sucessoLogin(res.data)
        });

        //console.log(objeto);

    }

    let mensagemFalha = null;

    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
        setTimeout(() => {
            setFalha(null);
        }, 10000);
    }

    return (
        <div>
            {mensagemFalha}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40rem" }}>
                <div className="card" style={{ width: "40rem" }}>
                    <h1 style={{ textAlign: "center" }}>Logar</h1>
                    <div className="card-body">
                        <div className="mb-3 row">
                            <label htmlFor="staticlogin" className="col-sm-2 col-form-label">Login</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="staticlogin" value={objeto.login} onChange={e => setObjeto({...objeto,login:  e.target.value})} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Senha</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword" value={objeto.hashSenha} onChange={e => setObjeto({...objeto,hashSenha:  e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary" onClick={e => logar(e)}>Entrar</button><br />
                            <Link to="cadastro" type="button" className="btn btn-secondary" style={{ marginTop: 10 }}>Cadastar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
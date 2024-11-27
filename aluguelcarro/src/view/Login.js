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

    const sucessoLogin = (usuario) => {
        localStorage.setItem("usuario-nome", usuario.nome);
        localStorage.setItem("usuario-id", usuario.id);
        localStorage.setItem("usuario-role", usuario.role);

        if(usuario.role == "Cliente")
            navigate("/usuario/home");
        else
            navigate("/adm/home");
    };
    

    const logar = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5146/login', objeto, { withCredentials: true }).then(res => {
            sucessoLogin(res.data)
        });
    }

    return (
        <div style={{backgroundColor: 'gray'}}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "45.6rem" }}>
                <div className="card" style={{ width: "40rem" }} >
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
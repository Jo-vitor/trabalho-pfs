import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40rem" }}>
            <div className="card" style={{ width: "40rem" }}>
                <h1 style={{ textAlign: "center" }}>Logar</h1>
                <div className="card-body">
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Login</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="staticEmail" value={email} onChange={(t) => setEmail(t.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Senha</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" value={senha} onChange={(t) => setSenha(t.target.value)} />
                        </div>
                    </div>
                    <div>
                        <Link to="usuario/home" type="button" className="btn btn-primary">Entrar</Link><br />
                        <Link to="cadastro" type="button" className="btn btn-secondary" style={{ marginTop: 10 }}>Cadastar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
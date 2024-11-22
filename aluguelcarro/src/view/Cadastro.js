import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const cadastrar = () => {
        alert("Cadastrado com sucesso");
        navigate("/");
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40rem" }}>
            <div className="card" style={{ width: "40rem" }}>
                <h1 style={{ textAlign: "center" }}>Cadastrar</h1>
                <div className="card-body">
                    <div className="mb-3 row">
                        <label htmlFor="staticNome" className="col-sm-2 col-form-label">Nome</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="staticNome" value={nome} onChange={(t) => setNome(t.target.value)} />
                        </div>
                    </div>
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
                        <button type="button" className="btn btn-secondary" style={{ marginTop: 10 }} onClick={cadastrar}>Cadastrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;
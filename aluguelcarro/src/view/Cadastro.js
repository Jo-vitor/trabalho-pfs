import React, {useState} from "react"
import { Link } from "react-router-dom";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    return (
        <div style={{display: "flex",justifyContent:"center", alignItems:"center", height: "40rem"}}>
            <h1>Cadastrar</h1>
            <div class="card" style={{width: "40rem"}}>
                <div class="card-body">
                <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nome</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="staticEmail" value={nome} onChange={(t) => setNome(t.target.value)}/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Login</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="staticEmail" value={email} onChange={(t) => setEmail(t.target.value)}/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Senha</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" value={senha} onChange={(t) => setSenha(t.target.value)}/>
                        </div>  
                    </div>
                    <div>
                        <button type="button" class="btn btn-secondary" style={{marginTop:10}}>Cadastar</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Cadastro;
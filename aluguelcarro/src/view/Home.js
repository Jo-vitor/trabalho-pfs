import React, { useState } from "react"
const Home = () => {
  return (
    <div class="row row-cols-1 row-cols-md-3 g-4"  style={{width: "100%"}}>
      <div class="col">
        <div class="card h-100">
          <img src="https://storagew.mercadorweb.com.br/imagens/veiculos/9/2024/7/honda-hr-v-exl-1-8-flexone-16v-5p-aut-2020-260423-1-sm.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">HONDA HR-V</h5>
            <p class="card-text">EXL 1.8 FLEXONE 16V 5P AUT. 2020
            46.942 km.</p>
            <button type="button" class="btn btn-primary">Alugar</button><br/>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="https://storagew.mercadorweb.com.br/imagens/veiculos/71/2024/8/hyundai-hb20x-premium-1-6-flex-16v-aut-2017-260828-2-sm.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">HYUNDAI HB20X</h5>
            <p class="card-text">PREMIUM 1.6 FLEX 16V AUT. 2017
            84.000 km.</p>
            <button type="button" class="btn btn-primary">Alugar</button><br/>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="https://storagew.mercadorweb.com.br/imagens/veiculos/8/2024/11/chevrolet-onix-hatch-joy-1-0-8v-flex-5p-mec-2019-262309-3-sm.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">CHEVROLET ONIX</h5>
            <p class="card-text">HATCH JOY 1.0 8V FLEX 5P MEC. 2019
            63.000 km.</p>
            <button type="button" class="btn btn-primary">Alugar</button><br/>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="https://storagew.mercadorweb.com.br/imagens/veiculos/54/2024/4/ford-ranger-xlt-3-2-20v-4x4-cd-diesel-aut-2016-259002-1-sm.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">FORD Ranger</h5>
            <p class="card-text">XLT 3.2 20V 4X4 CD DIESEL AUT. 2016
            218.200 km.</p>
            <button type="button" class="btn btn-primary">Alugar</button><br/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
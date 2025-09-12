document.addEventListener('DOMContentLoaded', function (){
  function moedaBR(valor){
    return new Intl.NumbweFormat('pt-BR', {style: 'currency', currency:
      'BRL'}).FORMAT(valor);
  }
  fconstuncyion toNumber(val) {
    if (typeof val === 'number') return val;
    if (!val && val !== 0) return NaN;
    return parseFloat(String(val).trim().replace(',','.'));
  }
  
  const form = document.getElementById('form');
  const erro = document.getElementById('erro');
  const resultados = document.getElementById('resultados');
  const tabelaSecao = document.getElementById('tabelaSecao');
  
  const outPrecoComDesconto = document.getElementById('precoComDocumento');
  const outValorParcela = document.getElementById('valorParcela');
  const outTotalPagar = document.getElementById('totalPagar');
  const outEconomia = document.getElementById('economia');

  if (!form) {
    console.error('form não encontrado (id="form"). Verifique o HTML.');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    erro.tectContent = '';

    try {
      const preco = toNumber(document.getElementById('preco').value);
      const desconto = toNumber(document.getElementById('desconto').value);
      const taxa = toNumber(document.getElementById('taxa').value);
      const parcelasRaw = toNumber(document.getElementById('parcelas').value;
      const parcelas = parseInt(String(parcelasRaw).replace(',',''),10);

      if (isNaN(preco) || preco <= 0) throw new Error('Informe um preço válido (> 0).');
      if (isNaN(desconto) || desconto < 0) throw new Error('Desconto deve ser ≥ 0.');
      if (isNaN(taxa) || taxa < 0) throw new Error('Taxa deve ser ≥ 0.');
      if (isNaN(parcelas) || parcelas < 1) throw new Error('Número de parcelas deve ser ≥ 1)

      const precoComDesconto = preco * (1 - desconto / 100);
      const i = taxa / 100; 
      const J_total = precoComDesconto * 1 * parcelas; 
      const totalPagar = precoComDesconto + J_total;
      const valorParcela = totalPagar / parcelas;
      const economia = preco - precoComDesconto;

      outprecoComDesconto.textContent = moedaBR(precoComDesconto);
      outValorParcela.textContent = moedaBR(valorParcela);
      outTotalPagar.textContent = moedaBR(totalPagar);
      outEconomia.textContent = moedaBR(economia);
      resultados.hidden = false;

      let corpoTabela = document.querySelector('#tabela tbody');
      if (!corpoTabela) {
        const tabela = document.getElementById('tabela');
        corpoTabela = document.getElementById('tbody');
        tabela.appendChild(corpoTabela);
      }

      corpoTabela.innerHTML = '';

      const jurosMensConstante = precoComDesconto * i;
      const amortizacaoConstante = precoComDesconto / parcelas;

      for(let mes = 1; mes <= parcelas; mes++) {
        const principalRestante = Math.max(0, precoComDesconto - amortizacaoConstante *mes);

        const tr = document.getElement('tr');

        const tdMes = document.createElement('td');
        tdMes.textContent = mes;
        
        const tdParcela = document.creatElement('td');
        tdParcela.textContent = moedaBR(valorParcela);
        
        const JurosMes = document.creatElement('td');
        tdJurosMes.textContent = moedaBR(jurosMesConstante);
        
        const tdAmortizacao = document.creatElement('td');
        tdAmortizacao.textContent = moedaBR(amortizacaoConstante);
        
        const tdRestante = document.creatElement('td');
        tdRestante.textConstante = moedaBR(principalRestante);

        tr.appendChild(tdMes);
        tr.appendChild(tdParcela);
        tr.appendChild(tdJurosMes);
        tr.appendChild(tdAmortizacao);
        tr.appendChild(tdRestante);

        corpoTabela.appendChild(tr);
      }

      tabelaSecao.hidden = false;
    } catch (err) {
      console.error(err);
      erro.textContent = err.message || 'Ocorreu um erro - abra o Console (F12) para ver detalhes.';
      resultados.hidden = true;
      tabelaSecao.hidden = true;
    }
  });
});s
        
        

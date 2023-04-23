/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/patrimonios';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.patrimonios.forEach(item => insertList(item.nome, item.quantidade, item.valor, item.fabricante, item.modelo, item.setor))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputPatrimonio, inputQuantity, inputPrice, inputFabricante, inputModelo, inputSetor) => {
  const formData = new FormData();
  formData.append('nome', inputPatrimonio);
  formData.append('quantidade', inputQuantity);
  formData.append('valor', inputPrice);
  formData.append('fabricante', inputFabricante);
  formData.append('modelo', inputModelo);
  formData.append('setor', inputSetor);

  let url = 'http://127.0.0.1:5000/patrimonio';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

 
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/patrimonio?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

 
const newItem = () => {
  let inputPatrimonio = document.getElementById("newPatrimonio").value;
  let inputQuantity = document.getElementById("newQuantity").value;
  let inputPrice = document.getElementById("newPrice").value;
  let inputFabricante = document.getElementById("newFabricante").value;
  let inputModelo = document.getElementById("newModelo").value;
  let inputSetor = document.getElementById("newSetor").value;

  if (inputPatrimonio === '') {
    alert("Escreva o nome de um item!");
  } else if (isNaN(inputQuantity) || isNaN(inputPrice)) {
    alert("Quantidade e valor precisam ser números!");
  } else {
    insertList(inputPatrimonio, inputQuantity, inputPrice, inputFabricante, inputModelo, inputSetor)
    postItem(inputPatrimonio, inputQuantity, inputPrice, inputFabricante, inputModelo, inputSetor)
     
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (namePatrimonio, quantity, price, fabricante, modelo, setor) => {
  var item = [namePatrimonio, quantity, price, fabricante, modelo, setor]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newPatrimonio").value = "";
  document.getElementById("newQuantity").value = "";
  document.getElementById("newPrice").value = "";
  document.getElementById("newFabricante").value = "";
  document.getElementById("newModelo").value = "";
  document.getElementById("newSetor").value = "";

  removeElement()
}

/* Seção de setor */

const newSetor = () => {
  let novoSetor = document.getElementById("novoSetor").value;
  let message = document.getElementById("sucess-message");
  let pat = document.getElementById("pat");
  if (novoSetor === '') {
    alert("Escreva o nome de um item!");  
  } else {    
    postSetor(novoSetor)
    insertSetor(novoSetor)
    message.append('O setor foi adicionado com sucesso');
    setTimeout(function(){ message.innerHTML = ""; }, 3000);
    pat.style.display = "block";
    document.getElementById("novoSetor").value = "";

  }
}

const postSetor = async (setor) => {
  const formData = new FormData();
  formData.append('nome', setor);  

  let url = 'http://127.0.0.1:5000/setor';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

const getSetor = async () => {
  let url = 'http://127.0.0.1:5000/setores';
  let pat = document.getElementById("pat");
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.setores.forEach(item => insertSetor(item.nome));
      if(data.setores.length>0){
           pat.style.display = "block";
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

getSetor()

const insertSetor = (nameSetor) => {
  var setor = [nameSetor]
  var select = document.getElementById('newSetor');
 
  for (var i = 0; i < setor.length; i++) {
     select.append(new Option(setor[i], setor[i])); 
  }
   
  
 
}
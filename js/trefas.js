let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let addtarefa = document.querySelector('#addtarefa');
let listadorDeTarefas = document.querySelector('#listadorDeTarefas');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let atualizarTarefa = document.querySelector('#atualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');

inputNovaTarefa.addEventListener('keypress',(e) => {

	if(e.keycode == 13){
		let tarefa = {
			nome: inputNovaTarefa.value,
			id: geraId(),
		}
		adicionarTarefa(tarefa);
	}

});

janelaEdicaoBtnFechar.addEventListener('click', (e) =>{
	alternarJanelaEdicao();
});

addtarefa.addEventListener('click',(e) => {
	let tarefa = {
		nome: inputNovaTarefa.value,
		id: geraId(),
	}
	adicionarTarefa(tarefa); 
});

atualizarTarefa.addEventListener('click', (e) => {
	e.preventDefault();
	let idtarefa = idTarefaEdicao.innerHTML.replace('#','');
	let tarefa = {
		nome: inputTarefaNomeEdicao.value,
		id: idtarefa
	}

	let tarefaAtualizada = document.getElementById(''+idtarefa+'');
	
	 if(tarefaAtualizada){
	let li = criarTagLi(tarefa);
	listadorDeTarefas.replaceChild(li, tarefaAtualizada);
	alternarJanelaEdicao();
	}else{
		alert('Elemento HTML não encontrado')
	}
});



function geraId(){
	return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa){
	let li = criarTagLi(tarefa);
	listadorDeTarefas.appendChild(li);
	inputNovaTarefa.value = '';

}

function criarTagLi(tarefa){
	let li = document.createElement('li');
	li.id = tarefa.id;

	let span = document.createElement('span');
	span.classList.add('textoTarefa');
	span.innerHTML = tarefa.nome;
	
	let div = document.createElement('div');
	
	let btnEditar = document.createElement('button');
	btnEditar.classList.add('btnAcao');
	btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
	btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');
	

	let btnExcluir = document.createElement('button');
	btnExcluir.classList.add('btnAcao');
	btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
	btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');


	div.appendChild(btnEditar);
	div.appendChild(btnExcluir);
	
	
	li.appendChild(span);
	li.appendChild(div);
	return li;
}

function editar(idTarefa){
	let li = document.getElementById(''+idTarefa+''); 
		if(li){
			idTarefaEdicao.innerHTML = '#'+idTarefa;
			inputTarefaNomeEdicao.value = li.innerText;
			alternarJanelaEdicao();
		}else{
			alert('Elemento HTML não encontrado')
		}
}

function excluir(idTarefa){
	let confirma = window.confirm('Tem certeza que deseja excluir');
	if(confirma){
		let li = document.getElementById(''+idTarefa+''); 
		if(li){
			listadorDeTarefas.removeChild(li);

		}else{
			alert('Elemento HTML não encontrado')
		}
    }
}


function alternarJanelaEdicao() {
	janelaEdicao.classList.toggle('abrir');
	janelaEdicaoFundo.classList.toggle('abrir');
}
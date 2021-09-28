function mueverana(elemento){
	//alert('cambiado 12:20');
	var id_num = parseInt(elemento.id,10), destino = -1;
	if(elemento.src.includes("R.png")){
		if(// id_num-1 >= 0 -- arregla la causa
		document.getElementById(id_num-1) != null && // arregla el sintoma
		document.getElementById(id_num-1).src.includes("B.png")){
			destino = id_num-1;
		} else if(//id_num-2 >= 0 -- arregla la causa 
			document.getElementById(id_num-2) != null && // arregla el sintoma
			document.getElementById(id_num-2).src.includes("B.png")){
				destino = id_num-2;
		}
	} else if(elemento.src.includes("L.png")){
		try {  // arregla el muerto - hace una cirurgia
			if(document.getElementById(id_num+1).src.includes("B.png")){
				destino = id_num+1;
			} else if(document.getElementById(id_num+2).src.includes("B.png")){
				destino = id_num+2;
			}
		} catch (err) {
			//alert(err.message);
		}
		
	}	
	if (destino>=0){
		cambia_ranas(elemento.id,destino);
	}
}

function cambia_ranas(i,j){
	var aux =  document.getElementById(i).src;
	document.getElementById(i).src = document.getElementById(j).src;
	document.getElementById(j).src = aux;
	//
}

function aleatoriza_ranas(){
	for(var origen=0;origen<=6;origen++){
		do {
			destino = Math.floor(Math.random() * 7);
		} while(origen == destino);
		cambia_ranas(origen,destino);
	}
}

function deshace_ultimo(){
	
}

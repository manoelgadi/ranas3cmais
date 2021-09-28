function mueverana(elemento){
	//alert('cambiado 11:52');
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
		var aux =  elemento.src;
		elemento.src = document.getElementById(destino).src;
		document.getElementById(destino).src = aux;
	}
}


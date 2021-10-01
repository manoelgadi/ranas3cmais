var movimientos = [], blanco=3;



function mueverana(elemento){
	//alert('cambiado 10:19');
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

function cambia_ranas(i,j, loggea=1){
	var aux =  document.getElementById(i).src;
	document.getElementById(i).src = document.getElementById(j).src;
	document.getElementById(j).src = aux;
	if(loggea!=0){ //Deshaciendo movimiento.
		movimientos.push([i,j]);

	} 
	blanco= parseInt(i,10);	
	//document.getElementById('blanco').innerHTML = blanco;
	if (confirma_victoria() == false){
		chequea_bloqueo();
	}
}


function aleatoriza_ranas(){
	for(var origen=0;origen<=6;origen++){
		do {
			destino = Math.floor(Math.random() * 7);
		} while(origen == destino);
		cambia_ranas(origen,destino);
	}
	document.getElementById('mensaje').innerHTML = 'ranas aleatorizadas';
	setTimeout(() =>{ document.getElementById('mensaje').innerHTML = '';},2000);	
}



function deshace_ultimo(){
	if(movimientos.length > 0){
		var ultimo = movimientos.pop();
		cambia_ranas(ultimo[1],ultimo[0],loggea=0);
	}
}

function confirma_victoria(){
	if(document.getElementById(0).src.includes('R.png') &&
		document.getElementById(1).src.includes('R.png') &&
		document.getElementById(2).src.includes('R.png') &&
		document.getElementById(3).src.includes('B.png')){
		document.getElementById('mensaje').innerHTML = 'has ganado!';
		return true;
	} else {
		document.getElementById('mensaje').innerHTML = '';
		return false;
	}	
}

function chequea_bloqueo(){
	if(
	  (document.getElementById(blanco-2) != null && document.getElementById(blanco-2).src.includes('L.png') ||
	   document.getElementById(blanco-1) != null && document.getElementById(blanco-1).src.includes('L.png') ||
	   document.getElementById(blanco+1) != null && document.getElementById(blanco+1).src.includes('R.png') ||
	   document.getElementById(blanco+2) != null && document.getElementById(blanco+2).src.includes('R.png')) == false){
		document.getElementById('mensaje').innerHTML = 'bloqueado';
	}
}


function resuelve_hardcoded(){
	cambia_ranas(2,3, loggea=1);
	cambia_ranas(4,2, loggea=1);
	cambia_ranas(5,4, loggea=1);
	cambia_ranas(3,5, loggea=1);
	cambia_ranas(1,3, loggea=1);
	cambia_ranas(0,1, loggea=1);
	cambia_ranas(2,0, loggea=1);
	cambia_ranas(4,2, loggea=1);
	cambia_ranas(6,4, loggea=1);
	cambia_ranas(5,6, loggea=1);	
	cambia_ranas(3,5, loggea=1);
	cambia_ranas(1,3, loggea=1);
	cambia_ranas(2,1, loggea=1);
	cambia_ranas(4,2, loggea=1);
	cambia_ranas(3,4, loggea=1);	
}

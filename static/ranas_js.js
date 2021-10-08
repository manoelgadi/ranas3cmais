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

function cambia_ranas(i,j, loggea=1, ia=false){
	var aux =  document.getElementById(i).src;
	document.getElementById(i).src = document.getElementById(j).src;
	document.getElementById(j).src = aux;
	if(loggea!=0){ //Deshaciendo movimiento.
		movimientos.push([i,j]);

	} 
	blanco= parseInt(i,10);	
	//document.getElementById('blanco').innerHTML = blanco;
	if(ia==false){
		if (confirma_victoria() == false){
			chequea_bloqueo();
		}
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
	var ranas_correctas = 0;

	if (document.getElementById(0).src.includes('R.png')){
		ranas_correctas++;
		if (document.getElementById(1).src.includes('R.png')){
			ranas_correctas++;
			if (document.getElementById(2).src.includes('R.png')){
				ranas_correctas++;
			}		
		}
	}

	if (document.getElementById(6).src.includes('L.png')){
		ranas_correctas++;
		if (document.getElementById(5).src.includes('L.png')){
			ranas_correctas++;
			if (document.getElementById(4).src.includes('L.png')){
				ranas_correctas++;
			}		
		}
	}
	
	
	
	document.getElementById('contador').innerHTML = ranas_correctas;
	

	if(ranas_correctas == 6){
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

var tiempo_para_esperar=0;
function cambia_ranas_retrasado(i,j,loggea){
	tiempo_para_esperar += 1000;
	setTimeout(cambia_ranas,tiempo_para_esperar,i,j,loggea);	
}

function resuelve_hardcoded(){
	cambia_ranas_retrasado(2,3, loggea=1);
	cambia_ranas_retrasado(4,2, loggea=1);
	cambia_ranas_retrasado(5,4, loggea=1);
	cambia_ranas_retrasado(3,5, loggea=1);
	cambia_ranas_retrasado(1,3, loggea=1);
	cambia_ranas_retrasado(0,1, loggea=1);
	cambia_ranas_retrasado(2,0, loggea=1);
	cambia_ranas_retrasado(4,2, loggea=1);
	cambia_ranas_retrasado(6,4, loggea=1);
	cambia_ranas_retrasado(5,6, loggea=1);	
	cambia_ranas_retrasado(3,5, loggea=1);
	cambia_ranas_retrasado(1,3, loggea=1);
	cambia_ranas_retrasado(2,1, loggea=1);
	cambia_ranas_retrasado(4,2, loggea=1);
	cambia_ranas_retrasado(3,4, loggea=1);	
	tiempo_para_esperar=0;
}

function pista_proximo(){
	resuelve_ia(ia=false);
}


function resuelve_ia(ia=true){
	var ranas = [];
	for(i=0;i<7;i++){
		if(document.getElementById(i).src.includes('L.png')){
			ranas[i] = 'L';
		} else if (document.getElementById(i).src.includes('R.png')){
			ranas[i] = 'R';
		} else {
			ranas[i] = 'B';
			blanco =i;
		}
	}
	console.log(ranas);
	console.log(blanco);
	resuelve_recursiva(ranas, blanco,0,ia);	
}

function swap_ranas(r,i,j){
	var aux = r[j];
	r[j]= r[i];
	r[i]= aux;
}

function comprueba_victoria_array(r){
	if(r[0]=='R'&&r[1]=='R'&&r[2]=='R'&&r[3]=='B'){
		return(true);
	} else {
		return(false);
	}
}

function resuelve_recursiva(r, b, nr=0,ia=true){ // r = ranas, b=posición del blanco, nr=nivel de la recursión
	if(comprueba_victoria_array(r)) {return(true);}
	if(nr>15){return(false);} // no he encontrado la solución!
	
	if(b-1>=0 && r[b-1]=='L'){
		swap_ranas(r,b,b-1);
		if(resuelve_recursiva(r, b-1, nr+1,ia)){
			if(ia){setTimeout(cambia_ranas,nr*1000,b,b-1,1,true);}
			else if(nr==0){
				setTimeout(cambia_ranas,0,b,b-1,0,true);
				setTimeout(cambia_ranas,2000,b,b-1,0,true);
			}
			
			return(true);
		} else {
			swap_ranas(r,b-1,b); // deshaciendo el cambio si no ha encontrado la solución
		}
	}

	if(b-2>=0 && r[b-2]=='L'){
		swap_ranas(r,b,b-2);
		if(resuelve_recursiva(r, b-2, nr+1,ia)){
			if(ia){setTimeout(cambia_ranas,nr*1000,b,b-2,1,true);}
			else if(nr==0){
				setTimeout(cambia_ranas,0,b,b-2,0,true);
				setTimeout(cambia_ranas,2000,b,b-2,0,true);
			}
			
			return(true);
		} else {
			swap_ranas(r,b-2,b); // deshaciendo el cambio si no ha encontrado la solución
		}
	}

	if(b+1<7 && r[b+1]=='R'){
		swap_ranas(r,b,b+1);
		if(resuelve_recursiva(r, b+1, nr+1,ia)){
			if(ia){setTimeout(cambia_ranas,nr*1000,b,b+1,1,true);}
			else if(nr==0){
				setTimeout(cambia_ranas,0,b,b+1,0,true);
				setTimeout(cambia_ranas,2000,b,b+1,0,true);
			}
			
			return(true);
		} else {
			swap_ranas(r,b+1,b); // deshaciendo el cambio si no ha encontrado la solución
		}
	}

	if(b+2<7 && r[b+2]=='R'){
		swap_ranas(r,b,b+2);
		if(resuelve_recursiva(r, b+2, nr+1,ia)){ // he encontrado la solución
			if(ia){setTimeout(cambia_ranas,nr*1000,b,b+2,1,true);}
			else if(nr==0){
				setTimeout(cambia_ranas,0,b,b+2,0,true);
				setTimeout(cambia_ranas,2000,b,b+2,0,true);
			}
						
			return(true);
		} else {
			swap_ranas(r,b+2,b); // deshaciendo el cambio si no ha encontrado la solución
		}
	}
	
	return(false); // bloqueado!
	
	
}

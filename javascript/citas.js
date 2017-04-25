var t, actual,lgaleria;

function select(i){
   actual = i;

  $("nav a")
    .removeClass("on off")
    .addClass(function(j){return(j===i)?"on":"off";});

  $("#persona").html(lgaleria[i].persona);
  $("#frase").html(lgaleria[i].frase);
  $("#foto").attr("src", lgaleria[i].foto);

  clearTimeout(t);
  t = setTimeout( function(){select((i + 1) % lgaleria.length);}, 3000);
}

function generar_selector(){ // regenera la botonera
  var selector = $("#selector");

  selector.html("");
  
  lgaleria.forEach(function(elem,i) {
    selector.append("<li><a onClick='select("+i+")'></a></li>");
  });
}

function guardar_galeria(){
  localStorage.lsgaleria=JSON.stringify(lgaleria);
}

$(function (){

  localStorage.lsgaleria = (localStorage.lsgaleria || JSON.stringify(galeria));
  lgaleria =JSON.parse(localStorage.lsgaleria);

  generar_selector();

  $("#editar").on("click", function(){
    clearTimeout(t);
    $("#persona_d").html(lgaleria[actual].persona);
    $("#frase_d").html(lgaleria[actual].frase);
    $("#foto_d").html(lgaleria[actual].foto);
    $("#datos").css("display", "block");
  })

  $("#nuevo").on("click", function(){
    $("#datos").css("display", "none");
    actual = lgaleria.push({
       persona:$("#persona_d").html(),
       frase:$("#frase_d").html(),
       foto:$("#foto_d").html()
    }) - 1;
    generar_selector();
    select(actual);
    guardar_galeria();
  })

  $("#borrar").on("click", function(){
    $("#datos").css("display", "none");
    lgaleria.splice(actual,1);
    if (lgaleria.length === 0) {
      $("#selector").html("");
      $("#caja").html("");
    } else {
      actual = 0;
      generar_selector();
      select(actual);
      guardar_galeria();
    }
  })

  $("#guardar").on("click", function(){
    $("#datos").css("display", "none");
    var nuevo = {  
       persona:$("#persona_d").html(),
       frase:$("#frase_d").html(),
       foto:$("#foto_d").html()
    };
    lgaleria.splice(actual,1,nuevo);
    generar_selector();
    select(actual);
    guardar_galeria();
  })

  $("#refresh").on("click", function(){
	var respuesta = confirm("¿Desea cargar la galeria inicial de nuevo?");  
	if(respuesta){  
	  	localStorage.clear;
		lgaleria=galeria;
    	generar_selector();
    	select(0);
	}
  })

  select(0);
});
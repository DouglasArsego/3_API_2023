function ler() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if( this.readyState == 1) {
            $("#divResposta").html("Solicitacao enviado ao servidor!")
        }
        if( this.readyState == 4 ) {
            if( this.status == 200) { 
               texto = $("#divResposta").html(texto + "<br>" + this.responseText)
            }
            if( this.status == 400) {
                $("#divResposta").html("Pagina nao encontrada!")
            }
        }
    };










    xhttp.open("GET", "informacao.txt", true);
    xhttp.send();

}

function gerar() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if( this.readyState == 4 ) {
            if( this.status == 200) { 
                $("#divNumero").html(this.responseText)
            }
            if( this.status == 400) {
                $("#divNumero").html("Pagina nao encontrada!")
            }
        }
    };
       

    url = "numeros.php?numero="+ $("#txtNumero").val()
    xhttp.open("GET", url, true);
    xhttp.send();

}
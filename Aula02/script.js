function validar(){
    var valor = document.getElementById("txtValor").value;
    var pInfo = document.getElementById("info");
    if( valor == "" ){
        pInfo.innerHTML = "O campo valor deve ser preenchido!"
        return false;
    }else{
        if( isNaN(valor) ){
            pInfo.innerHTML = "O valor deve ser um número!"
            return false;
        }else{
            if( valor > 0 && valor < 11 ){
                return true;
            }else{
                pInfo.innerHTML = "Valor não permitido!"
                return false;
            }
        }
    }
}


function lerObjeto(){
    var carro = { modelo : "Doblo" , ano : 2006 } ;
    
    var pessoa = {
        nome : "Maria" ,
        idade : 25 ,
        altura : 1.8 ,
        temFilhos : true , 
        endereco : null ,
        veiculo : carro ,
        filhos : [ 
            { nome : "Carlos" , idade : 10 } ,
            { nome : "Júlia" , idade : 8 } ,
        ] ,
        formacao : [ 2006 , 2013, 2017 ] ,
        imprimir : function(){
            texto = this.nome + " - idade: " + this.idade +
                " - Carro: " + this.veiculo.modelo;
            return texto;
        }
    }

    divObjeto = document.getElementById("divObjeto");
    divObjeto.innerHTML = pessoa.imprimir();

}

// Construir o objeto retângulo que possui os atributos 
// largura e altura.
// este objeto deverá conter um método que calcula a 
// área do retângulo. 
// criar no html, dois campos para que o usuário 
// preencha com os valores para largura e altura.
// Criar um botão que irá mostrar o resultado 
// para o usuário
//


function calcular(){
    var retangulo = {
        largura : document.getElementById("txtLargura").value ,
        altura : document.getElementById("txtAltura").value ,
        calcularArea : function(){
            return this.largura * this.altura;
        }
    };
    var pResultado = document.getElementById("pResultado");
    pResultado.innerHTML = "Área: " + retangulo.calcularArea();

}
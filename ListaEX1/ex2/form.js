function Pessoa( altura,peso){
    this.altura = altura;
    this.peso= peso;
    this.imc = 0;
    this.classificacao = '';

    this.getAltura = function () {
        return this.altura;

    };


    this.getPeso = function () {
        return this.peso;

    };


    this.getIMC = function () {
        return this.imc;

    };

    this.getClass = function () {
        return this.classificacao;

    };

    this.setAltura = function (altura) {
        this.altura  = altura;
    };


    this.setPeso = function (peso) {
        this.peso = peso;

    };

    this.setIMC = function () {
        this.imc = this.peso/(this.altura * this.altura);

    };

    this.setClassificacao = function () {
        if (this.getIMC() < 18.5)
        {
            this.classificacao = "Subnutrição";
        }else if(this.imc >18.5 && this.imc <24.9){
            this.classificacao = "Peso Saudável";
        }else if(this.imc>30.0 && this.imc<34.9){
            this.classificacao = "Obesidade Grau 1";
        }else if (this.imc>35.0 && this.imc<39.9){
            this.classificacao = "Obesidade Grau 2";

        }else
        {
            this.classificacao = "Obesidade Grau 3";
        }
    }





}



function validarCampo(campo, alerta, label) {

    console.log("validarCampo: " + campo + " " + alerta + " " + label);

    // Validar campo
    var valor = parseFloat($(campo).val());
    // Valor 1 -- inválido
    if (isNaN(valor)) {
        // Exibe  alerta
        $(alerta).slideDown();
        // Adiciona CSS de erro - input
        $(campo).addClass("is-invalid");
        // No label
        $(label).addClass("text-danger");
        // Limpar o campo
        $(campo).val("");
        // Definir o foco para o input
        $(campo).focus();
        // Abandonar a execução
        return false;
    }

    // Valor - correto

    // Oculta o alerta
    $(alerta).hide();
    // Remover as classes de erro
    $(campo).removeClass("is-invalid");
    $(label).removeClass("text-danger");
    // Adicionar classe de validade
    $(campo).addClass("is-valid");
    return true;

}




$(document).ready(function(){

    // Vincular ação ao botão de cálculo
    // $("#btnCalcular").click(function(){
    //
    // });

   // $("#resultado").hide();

    $("button[name='calculo']").click(function(){

        if ( validarCampo("input[name= 'altura']", "#alertaV1", "#labelV1") &&
            validarCampo("input[name='peso']", "#alertaV2", "#labelV2")){





            var alt =  parseFloat($("#altura").val());
            var pes = parseFloat( $("#peso").val() );
            var pessoa = new Pessoa(alt,pes);


            pessoa.setIMC();
            pessoa.setClassificacao();



            // Apresentar o resultado





            $("#resultado").text(pessoa.getClass());


            $("#alertaV3").show();
        }

    });



});
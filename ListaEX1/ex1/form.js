function Competidor( nome,tempo,largada){
    this.nome = nome;
    this.tempo = tempo;
    this.largada = largada;
    this.posicao = 0;
    this.vencedor = false;

    this.getNome = function () {
        return this.nome;
        
    };


    this.getTempo = function () {
        return this.tempo;

    };


    this.getlargada = function () {
        return this.largada;

    };

    this.getposicao = function () {
        return this.posicao;

    };

    this.setPosicao = function (posicao) {
        this.posicao  = posicao
    };

    this.isVecendor = function () {
        return this.vencedor;
    };

    this.setVencedor = function (vencedor) {
        this.vencedor = vencedor;

    }


}



function validarCampo(campo, alerta, label) {

    console.log("validarCampo: " + campo + " " + alerta + " " + label);

    // Validar campo
    var valor = parseInt($(campo).val());
    // Valor 1 -- inválido
    if (valor.toString().trim().length==0) {
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

    $("#table-comp").hide();

    $("button[name='cadastrar']").click(function(){

        if ( validarCampo("input[name='nome1']", "#alertaV1", "#labelV1") &&
            validarCampo("input[name='nome2']", "#alertaV2", "#labelV2") && validarCampo("input[name='nome3']", "#alertaV3", "#labelV3")
        && validarCampo("input[name='nome4']", "#alertaV4", "#labelV4") && validarCampo("input[name='nome5']", "#alertaV5", "#labelV5") &&
            validarCampo("input[name='nome6']", "#alertaV6", "#labelV6")){

            var competidores = [];



            for (i=1;i<=6;i++) {
                var n1 =  $("#nome"+i).val();
                var n2 = parseInt( $("#tempo"+i).val() );
                oCompetidor = new Competidor(n1,n2,i);
                competidores.push(oCompetidor);
            }

            for(  i = 1; i < 6; i++ ) {
                for(  j = i; j > 0; j-- ) {
                    if( competidores[j].getTempo() < competidores[j-1].getTempo() )
                    {
                        var comp = competidores[j];
                        competidores[j] = competidores[j-1];
                        competidores[j-1] = comp;
                    }
                }

            }


            competidores[0].setPosicao(1);
            for (i=1;i<6;i++)
            {
                if (competidores[i-1].getTempo() == competidores[i].getTempo()) {
                    competidores[i].setPosicao(competidores[i-1].getposicao());

                }
                else{
                    competidores[i].setPosicao(competidores[i-1].getposicao()+1)
                }
            }

            for(i=0;i<6;i++)
            {
                if(competidores[i].getposicao() == 1)
                {
                    competidores[i].setVencedor(true);
                }
            }


            // Apresentar o resultado




            for (i = 0;i<6;i++) {
                $("#pos"+(i+1)).text(competidores[i].getposicao());
                $("#larg"+(i+1)).text(competidores[i].getlargada());
                $("#comp"+(i+1)).text(competidores[i].getNome());
                $("#temp"+(i+1)).text(competidores[i].getTempo());
                $("#res"+(i+1)).text(competidores[i].isVecendor() ? "Vencedor!" : "");

            }
            $("#table-comp").show()
        }

    });

    $("input[name='valor1']").focusout(function(){
        validarCampo("input[name='valor1']", "#alertaV1", "#labelV1");
    });

    $("input[name='valor2']").focusout(function(){
        validarCampo("input[name='valor2']", "#alertaV2", "#labelV2");
    });



});
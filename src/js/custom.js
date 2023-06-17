// instancia jquery e evita conflitos
// jQuery( function($){

   $(document).ready(function(){
      $('.owl-carousel').owlCarousel({
         loop:true,
         margin:10,
         responsiveClass:true,
         responsive:{
             0:{
                 items:1,
                 nav:true
             },
             600:{
                items:2,
                nav:true
            },
             992:{
                 items:3,
                 nav:true,
                 loop:false
             }
         }
     })

     $(".owl-prev,.owl-next").css({
        "color" : "white",
    
        "font-size" : "4rem",
 
    
    })

    $(".owl-nav").css({
        "display" : "flex",
        "justify-content" : "space-between",
        "margin-left" : "-5%",
        "position" : "absolute",
        "top" : "0",
        "width" : "106%",
        "align-items" : "stretch",
        "height" : "100%"
    })
     
    $(".owl-stage-outer").css({
        "z-index" : "2"
    })
   })

/*   $(document).mouseleave(function(){
    console.log('saiu');
    $('#ModalCliente1').modal('show');
});*/

$(document).one("mouseleave", function(){
    console.log('saiu');
    $('#naosair').modal('show');
    $(".oferta").delay(800).animate({
        left: '250px',
        width: '350px',
        fontSize: '50px',
        fontWeight: 'bold'
            }, "slow");
});

$(document).ready(function(){

    $(".botao-descricao").click(function(event){
        event.preventDefault();
        $(this).next().slideToggle();
        console.log("clicou");
      });

    /* Ouvinte para nav modal open */

      $('.nav-modal-open').on('click', function(e) {
        e.preventDefault();

        let elem = $(this).attr('rel');
        let elemTitle = $(this).html();

        // $('.modal-body').html('#'+elem) 
        // exemplo acima exibe o #contato como conteúdo, porém usar este recurso para transformá-lo em um seletor dinâmico

        $('#modal-dinamico .modal-body').html($('#'+elem).html())
        $('#modal-dinamico .modal-header h5').html(elemTitle)
        let myModal = new bootstrap.Modal($('#modal-dinamico'))
        myModal.show()

        // Ativar o jquery-mask para os campos que são criados após o carregamento do documento.
        $('#date').mask('00/00/0000');
        $('#time').mask('00:00:00');
        $('#date_time').mask('00/00/0000 00:00:00');
        $('#cep').mask('00000-000');
        $('#celular').mask('(00) 00000-0000');
        $('#phone_with_ddd').mask('(00) 0000-0000');
        $('#cpf').mask('000.000.000-00', {reverse: true});
        
    })

    function validar(elem){
        if ($(elem).val() == '') {
            $(elem).addClass('invalido')
            $(elem.next()).removeClass('visually-hidden')
            console.log("função ativada")
            return false
        } 
        else {
            $(elem).removeClass('invalido')
            $(elem.next()).addClass('visually-hidden')
            return true

        }
    }

    function validarNome (elem){
        if ($(elem).val().length <= 2) {
            $(elem).addClass('invalido')
            $(elem.next()).removeClass('visually-hidden')
            console.log("função ativada")
            return false
        } 
        else {
            $(elem).removeClass('invalido')
            $(elem.next()).addClass('visually-hidden')
            return true

        }
    }

    function validarEmail (elem){
        if (!$(elem).val().match(/^[A-z0-9]+\@[A-z0-9]+\.[a-z]+[.]?[a-z]*$/)) {
            $(elem).addClass('invalido')
            $(elem.next()).removeClass('visually-hidden')
            console.log("função ativada")
            return false
        } 
        else {
            $(elem).removeClass('invalido')
            $(elem.next()).addClass('visually-hidden')
            return true

        }
    }

    

    $("body").on("keyup" || "blur", "#nome", function() {
        validarNome ($(this));
    })

    $("body").on("keyup" || "blur", "#email", function() {
        validarEmail ($(this));
     })

    $("body").on("blur", "#date", function() {
       validar ($(this));
    })

    $("body").on("focus", ".datepicker", function() {
        $(".datepicker").datepicker({
            dateFormat: "dd/mm/yy",
            dayNames: [ "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado" ],
            dayNamesMin: [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb" ],
            monthNames: [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Júlio", "Agosto", "Setembro", "Outobro", "Novembro", "Dezembro" ]

        });
     })

     
     $("body").on("blur", "#time", function() {
        validar ($(this));
     })

     
     $("body").on("blur", "#cep", function() {
        validar ($(this));
     })

     
     $("body").on("blur", "#celular", function() {
        validar ($(this));
     })

     
     $("body").on("blur", "#cpf", function() {
        validar ($(this));
     })



     $("body").on("submit", ".modal-body .form", function(v) {
        v.preventDefault();

        var campos = $('.campo')

        validar($(campos));
        validarNome ($("#nome"));
        validarEmail ($("#email"));
        if ($(".form-control").hasClass("invalido")){
            return false
        }
        else {
            alert("Formulário pronto para envio!")
            return true
        }
            

        })


    })





//API
var form;
var requestURL = "https://quiz-trainee.herokuapp.com/questions";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.send();
request.onreadystatechange = function(){
    if(request.readyState === 4){
        if(request.status === 200)
        form = JSON.parse(request.responseText);    
    };
};


//VARIAVEIS
var pontos = 0;
var aux = -1;
var inp = document.getElementsByTagName("input");

//QUESTOES
function mostrarQuestao() {

    document.getElementById("resultado").innerHTML = "";
    document.getElementById("listaRespostas").style.display = "block";        

    if(aux === -1 || inp[0].checked != false || inp[1].checked != false || inp[2].checked != false || inp[3].checked != false){
        if(aux != -1){
            for(var i=0 ; i<form[aux].options.length ; i++){
                pontos = pontos + inp[i].checked*form[aux]['options'][i]['value']
            }
        }
        document.getElementById("confirmar").innerHTML = "Próximo";
        aux++;
    }

    if(aux == -1){
        document.getElementById("titulo").classList.remove('hide');
        document.getElementById("resultado").remove('hide');
    }

    if(aux < form.length){
        document.getElementById("titulo").innerHTML=form[aux].title;
        
        for(var i=0 ; i<form[aux].options.length ; i++){
            if(inp[i].checked === true){
                inp[i].checked = false;
            }
            document.getElementsByTagName("span")[i].innerHTML=form[aux].options[i].answer
            inp[i].value=form[aux].options[i].value
        }
        
    }
    
    else{
        console.log(form[aux-1].options.length)
        finalizarQuiz();
    }
}

//FINALIZANDO
function finalizarQuiz() {
  var pont = 3*(form[aux-1].options.length+1);

  document.getElementById("listaRespostas").style.display = "none";
  
  document.getElementById("confirmar").innerHTML = "Refazer quiz";

  document.getElementById("titulo").innerHTML = "QUIZ DOS VALORES DA GTI";

  document.getElementById("resultado").innerHTML = "Sua pontuação: " + (pontos*100/pont) + "%";

}



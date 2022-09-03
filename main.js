
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
var escores = 0;
var aux = -1;
var resp = document.getElementsByTagName("input");
let btn = document.getElementByTagName("confirmar");

//MOSTRANDO A QUESTAO
function mostrarQuestao() { 
    document.getElementById("resultado").innerHTML = ""; 
    document.getElementById("listaRespostas").style.display = "block"; 
    
    if(aux === -1 || resp[0].checked != false || resp[1].checked != false || resp[2].checked != false || resp[3].checked != false){
      if(aux != -1){
        for(var i =0; i < form[aux].options.length; i++){
           escores = escores + resp[i].checked*form[aux]['options'][i]['value']
        }
    }
      document.getElementById("confirmar").textContent = "Próxima pergunta"; 
      aux++;
      proxQuestao(); 
    };
      };
  
  btn.addEventListener('click', mostrarQuestao, false);
  
    function reiniciar(){
        aux = -1;
       escores = 0;
        for(let i = 0; i<form[aux].options[i].value;i++){
          document.location.reload(true);
        }
    };
  
          
      function proxQuestao(){
        if(aux == -1){  
          document.getElementById("titulo").classList.remove('hide');
          document.getElementById("resultado").remove('hide');  
        }; 
    
      if(aux < form.length){  
          document.getElementById("titulo").innerHTML=form[aux].title;  
            
          for(var i=0 ; i < form[aux].options.length ; i++){  
              if(resp[i].checked === true){  
                  resp[i].checked = false;  
                }  
              document.getElementsByTagName("span")[i].innerHTML=form[aux].options[i].answer  
              resp.value=form[aux].options[i].value  
            };  
            
        } 
  
        
      else{  
            console.log(form[aux-1].options.length)
            finalizarQuiz();  
        }  
      }; 
   
       //FINALIZANDO
      function finalizarQuiz() {
        var pont = 3*(form[aux-1].options.length+1);
          document.getElementById("confirmar").innerHTML = "Refazer quiz";
          document.getElementById("listaRespostas").style.display = "none"; 
          document.getElementById("resultado").innerHTML = "Sua pontuação: " + (pontos*100/pont) + "%";   
          btn.addEventListener('click', reiniciar(), false); 
      }
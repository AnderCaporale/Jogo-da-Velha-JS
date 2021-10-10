let jogo = [];
let tabuleiro = [];
let qmJoga = 0; //1=jogador -1=cpu
let verificar;
let jogando = true;
let jogadas = 0;
let nivel = 1;
let jogadaCPU = 1;
let quemComeca = 1


function jogar(p){
    let linha = parseInt((p-1)/3)
    let coluna = (p-1)%3

    if (jogando && qmJoga == 1){
        if (jogo[linha][coluna] == 0){
            jogo[linha][coluna] = 1;
            qmJoga = -1;
            jogadas++;
        }
        atualizaTabuleiro();
        verificaFim();
        cpuJogar();
    }

    
    
}

function cpuJogar(){
    if (jogando && qmJoga == -1){
        if(nivel == 1){
            nivel1();
        }else if(nivel == 2){
            //nivel 2
        }
        
        atualizaTabuleiro();
        verificaFim();
    }
}

function nivel1(){
    if(quemComeca == -1 && jogadaCPU<5) {
        do{
            linha = Math.round(Math.random()*2)
            coluna = Math.round(Math.random()*2)
        } while(jogo[linha][coluna] != 0);
    }
    else if(quemComeca == 1 && jogadaCPU<6){
        do{
            linha = Math.round(Math.random()*2)
            coluna = Math.round(Math.random()*2)
        } while(jogo[linha][coluna] != 0);
    }

    jogo[linha][coluna] = -1;
    qmJoga = 1;
    jogadaCPU++;
    jogadas++;
}


function verificaFim(){
    let vitoria = verificaVitoria()
    if (vitoria == 1){
        alert("Parabéns, você venceu!")
        jogando = false
    } else if(vitoria == -1){
        alert("Que pena, você perdeu!")
        jogando = false
    } else if(jogadas == 9){
        alert("EMPATE!")
        jogando = false
    }

}

function verificaVitoria(){
    //Verificar linhas
    for(i=0; i<3; i++){
        if(jogo[i][0] != 0 && jogo[i][0] == jogo[i][1] && jogo[i][0] == jogo[i][2]){
            return jogo[i][0];
        }
    }

    //Verificar colunas
    for(i=0; i<3; i++){
        if(jogo[0][i] != 0 && jogo[0][i] == jogo[1][i] && jogo[0][i] == jogo[2][i]){
            return jogo[0][i];
        }
    } 

    //Verificar diagonal principal
    if(jogo[0][0] != 0 && jogo[0][0] == jogo[1][1] && jogo[0][0] == jogo[2][2]){
        return jogo[0][0];
    }

    //Verificar diagonal secundária
    if(jogo[0][2] != 0 && jogo[0][2] == jogo[1][1] && jogo[0][2] == jogo[2][0]){
        return jogo[0][2];
    }
    
}

function atualizaTabuleiro(){
    for(linha=0; linha<3; linha++){
        for(coluna=0; coluna<3; coluna++){
            if(jogo[linha][coluna] == 1){
                tabuleiro[linha][coluna].innerHTML = 'X';
                tabuleiro[linha][coluna].style.cursor = "default";
            } else if(jogo[linha][coluna] == -1){
                tabuleiro[linha][coluna].innerHTML = 'O';
                tabuleiro[linha][coluna].style.cursor = "default";
            } else {
                tabuleiro[linha][coluna].innerHTML = '';
                tabuleiro[linha][coluna].style.cursor = "pointer";
            }
        }
    }
}

function iniciar(){
    jogando = true;
    jogadaCPU = 1;
    nivel = document.getElementById("dificuldade").value;
    qmJoga = 0;
    jogadas = 0;
    jogo = [[0,0,0],
            [0,0,0],
            [0,0,0]];
    tabuleiro = [
        [document.getElementById("p1"), document.getElementById("p2"), document.getElementById("p3")],
        [document.getElementById("p4"), document.getElementById("p5"), document.getElementById("p6")],
        [document.getElementById("p7"), document.getElementById("p8"), document.getElementById("p9")]
    ]
    atualizaTabuleiro()

    if (quemComeca == 1){
        document.getElementById("quemComeca").innerHTML = "Quem Começa: Jogador";
        qmJoga = quemComeca
        quemComeca = -1;    
    } else{
        document.getElementById("quemComeca").innerHTML = "Quem Começa: CPU";
        qmJoga = quemComeca
        quemComeca = 1;
        cpuJogar()
    }
}

window.addEventListener('load', iniciar);
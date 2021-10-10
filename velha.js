let jogo = [];
let tabuleiro = [];
let qmJoga = 0; //1=jogador -1=cpu
let jogando = false;
let jogadas = 0;
let nivel = 1;
let jogadaCPU = 1;
let quemComeca = 1

function iniciar(){
    document.getElementById("btIniciar").setAttribute('disabled', 'true')
    document.getElementById("resultado").innerHTML = ''
    jogando = true;
    jogadaCPU = 1;
    nivel = document.querySelector('input[name="Dificuldade"]:checked').value;
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
            nivel2();
        }
        
        atualizaTabuleiro();
        verificaFim();
    }
}

function nivel1(){
    if(quemComeca == -1 && jogadaCPU < 5) {
        do{
            linha = Math.round(Math.random()*2)
            coluna = Math.round(Math.random()*2)
        } while(jogo[linha][coluna] != 0);
    }
    else if(quemComeca == 1 && jogadaCPU < 6){
        do{
            linha = Math.round(Math.random()*2)
            coluna = Math.round(Math.random()*2)
        } while(jogo[linha][coluna] != 0);
    }

    jogo[linha][coluna] = -1;
    atualizarDados();
}

function nivel2(){
    //ataque linha
    for(i=0; i<3; i++){
        if(jogo[i][0] == -1 && jogo[i][1] == -1 && jogo[i][2] == 0){
            jogo[i][2] = -1;
            atualizarDados();
            return
        } else if(jogo[i][0] == -1 && jogo[i][2] == -1 && jogo[i][1] == 0){
            jogo[i][1] = -1;
            atualizarDados();
            return
        } else if(jogo[i][1] == -1 && jogo[i][2] == -1 && jogo[i][0] == 0){
            jogo[i][0] = -1;
            atualizarDados();
            return
        }
    }

     //ataque coluna
     for(i=0; i<3; i++){
        if(jogo[0][i] == -1 && jogo[1][i] == -1 && jogo[2][i] == 0){
            jogo[2][i] = -1;
            atualizarDados();
            return
        } else if(jogo[0][1] == -1 && jogo[2][i] == -1 && jogo[1][i] == 0){
            jogo[1][i] = -1;
            atualizarDados();
            return
        } else if(jogo[1][i] == -1 && jogo[2][i] == -1 && jogo[0][i] == 0){
            jogo[0][i] = -1;
            atualizarDados();
            return
        }
    }

    //ataque diag princ
    if(jogo[0][0] == -1 && jogo[1][1] == -1 && jogo[2][2] == 0){
        jogo[2][2] = -1;
        atualizarDados();
        return
    } else if(jogo[0][0] == -1 && jogo[2][2] == -1 && jogo[1][1] == 0){
        jogo[1][1] = -1;
        atualizarDados();
        return
    } else if(jogo[1][1] == -1 && jogo[2][2] == -1 && jogo[0][0] == 0){
        jogo[0][0] = -1;
        atualizarDados();
        return
    }

    //ataque diag sec
    if(jogo[0][2] == -1 && jogo[1][1] == -1 && jogo[2][0] == 0){
        jogo[2][0] = -1;
        atualizarDados();
        return
    } else if(jogo[0][2] == -1 && jogo[2][0] == -1 && jogo[1][1] == 0){
        jogo[1][1] = -1;
        atualizarDados();
        return
    } else if(jogo[1][1] == -1 && jogo[2][0] == -1 && jogo[0][2] == 0){
        jogo[0][2] = -1;
        atualizarDados();
        return
    }
    

    //defesa linha
    for(i=0; i<3; i++){
        if(jogo[i][0] == 1 && jogo[i][1] == 1 && jogo[i][2] == 0){
            jogo[i][2] = -1;
            atualizarDados();
            return
        } else if(jogo[i][0] == 1 && jogo[i][2] == 1 && jogo[i][1] == 0){
            jogo[i][1] = -1;
            atualizarDados();
            return
        } else if(jogo[i][1] == 1 && jogo[i][2] == 1 && jogo[i][0] == 0){
            jogo[i][0] = -1;
            atualizarDados();
            return
        }
    }

    //defesa coluna
    for(i=0; i<3; i++){
        if(jogo[0][i] == 1 && jogo[1][i] == 1 && jogo[2][i] == 0){
            jogo[2][i] = -1;
            atualizarDados();
            return
        } else if(jogo[0][1] == 1 && jogo[2][i] == 1 && jogo[1][i] == 0){
            jogo[1][i] = -1;
            atualizarDados();
            return
        } else if(jogo[1][i] == 1 && jogo[2][i] == 1 && jogo[0][i] == 0){
            jogo[0][i] = -1;
            atualizarDados();
            return
        }
    }

    //defesa diag princ
    if(jogo[0][0] == 1 && jogo[1][1] == 1 && jogo[2][2] == 0){
        jogo[2][2] = -1;
        atualizarDados();
        return
    } else if(jogo[0][0] == 1 && jogo[2][2] == 1 && jogo[1][1] == 0){
        jogo[1][1] = -1;
        atualizarDados();
        return
    } else if(jogo[1][1] == 1 && jogo[2][2] == 1 && jogo[0][0] == 0){
        jogo[0][0] = -1;
        atualizarDados();
        return
    }

    //defesa diag sec
    if(jogo[0][2] == 1 && jogo[1][1] == 1 && jogo[2][0] == 0){
        jogo[2][0] = -1;
        atualizarDados();
        return
    } else if(jogo[0][2] == 1 && jogo[2][0] == 1 && jogo[1][1] == 0){
        jogo[1][1] = -1;
        atualizarDados();
        return
    } else if(jogo[1][1] == 1 && jogo[2][0] == 1 && jogo[0][2] == 0){
        jogo[0][2] = -1;
        atualizarDados();
        return
    }

    nivel1();
}

function atualizarDados(){
    qmJoga = 1;
    jogadaCPU++;
    jogadas++;
}

function verificaFim(){
    let vitoria = verificaVitoria()
    if (vitoria == 1){
        document.getElementById("resultado").innerHTML = "Parabéns, você venceu!";
        document.getElementById("pontosJogador").value++
        jogando = false
    } else if(vitoria == -1){
        document.getElementById("resultado").innerHTML = "Que pena, você perdeu!";
        document.getElementById("pontosCPU").value++
        jogando = false
    } else if(jogadas == 9){
        document.getElementById("resultado").innerHTML = "EMPATE!";
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


function zerarPlacar(){
    document.getElementById("pontosJogador").value = 0;
    document.getElementById("pontosCPU").value = 0;
}

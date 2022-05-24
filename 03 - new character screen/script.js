newGame = {

    arrayPersonagens: [],

    arrayAtributosPorClasse: [{
        guerreiro: {
            forca: 5,
            agilidade: 7,
            inteligencia: 2,
            vitalidade: 150,
            mana: 50,
            defesa: 7 / 10,
        },
        arqueiro: {
            forca: 3,
            agilidade: 10,
            inteligencia: 6,
            vitalidade: 100,
            mana: 50,
            defesa: 9 / 10
        },
        mago: {
            forca: 2,
            agilidade: 5,
            inteligencia: 10,
            vitalidade: 100,
            mana: 150,
            defesa: 9 / 10
        },
        assassino: {
            forca: 3,
            agilidade: 15,
            inteligencia: 1,
            vitalidade: 100,
            mana: 50,
            defesa: 8 / 10
        },
        curandeiro: {
            forca: 3,
            agilidade: 5,
            inteligencia: 610,
            vitalidade: 100,
            mana: 150,
            defesa: 9 / 10
        },
        tank: {
            forca: 10,
            agilidade: 3,
            inteligencia: 2,
            vitalidade: 250,
            mana: 50,
            defesa: 5 / 10
        }
    }],

    pegarAtributosClasse(classe) {
        return this.arrayAtributosPorClasse.map((elem) => elem[classe]);
    },

    newChar() {
        let nome = document.getElementById('nickname');
        let idade = document.getElementById('idade');
        let classe = document.getElementById('profissao');
        let raca = document.getElementById('raca');
        if (!nome.value || !idade.value || !classe.value || !raca.value) {
            alert('Favor preencher o(s) campo(s) vazio(s)');
            return;
        }

        const dataClasse = this.pegarAtributosClasse(classe.value);

        const personagem = {
            nome: nome.value,
            idade: idade.value,
            classe: classe.value,
            raca: raca.value,
            level: 1,
            experiencia: 0,
            bag: ['faca', 'roupa', 'arco', 'flecha'],
            atributos: {
                forca: dataClasse[0].forca,
                agilidade: dataClasse[0].agilidade,
                inteligencia: dataClasse[0].inteligencia,
                vitalidade: dataClasse[0].vitalidade,
                mana: dataClasse[0].mana,
                defesa: dataClasse[0].defesa
            }
        };

        this.arrayPersonagens.push(personagem);
        console.log(this.arrayPersonagens);
        localStorage.setItem('personagem', JSON.stringify(personagem));
        window.location.href = "http://127.0.0.1:5500/04%20-%20battle%20screen/battle.html"
    }
}
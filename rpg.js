// array com os atributos padrões de cada classe. obs: os atributos de ataque do curandeiro estão buffados para fins de teste
var arrayAtributosPorClasse = [{
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
}]

function pegarAtributosClasse(classe) {
    return arrayAtributosPorClasse.map((elem) => elem[classe]);
}

function criarPersonagem(nome, idade, classe, raca) {
    const dataClasse = pegarAtributosClasse(classe);
    return {
        nome: nome,
        idade: idade,
        raca: raca,
        classe: classe,
        level: 1,
        experiencia: 0,
        bag: ['bandagem', 'corda', 'faca', 'poção'],
        atributos: {
            forca: dataClasse[0].forca,
            agilidade: dataClasse[0].agilidade,
            inteligencia: dataClasse[0].inteligencia,
            vitalidade: dataClasse[0].vitalidade,
            mana: dataClasse[0].mana,
            defesa: dataClasse[0].defesa
        }
    }
}

// criação do personagem abaixo. Passar como parâmetro nome, idade, classe e raça
var personagem1 = criarPersonagem('Ord', 22, 'curandeiro', 'humano');

// array dos monstros com os atributos padrões, os drops e a experiência dada
var monstros = [
    {
        nome: 'Slime',
        atributos: {
            forca: 5,
            agilidade: 10,
            vitalidade: 50,
            defesa: 9 / 10
        },
        experiencia: 310,
        bag: ['pocaoVida', 'pocaoMana']
    },
    {
        nome: 'Goblin',
        atributos: {
            forca: 8,
            agilidade: 5,
            vitalidade: 70,
            defesa: 8 / 10
        },
        experiencia: 330,
        bag: ['pocaoVida', 'pocaoMana']
    }
]

// função de atacar. 1 rodada apenas (jogador e monstro atacam 1x de acordo com sua agilidade)
function atacar(p1, p2) {
    let defesa1 = p1.atributos.defesa;
    let defesa2 = p2.atributos.defesa;
    let ataque1 = p1.classe === 'curandeiro' || 'mago' ? p1.atributos.inteligencia : p1.atributos.forca;
    let vida1 = p1.atributos.vitalidade;
    let ataque2 = p2.atributos.forca;
    let vida2 = p2.atributos.vitalidade;
    let agilidade1 = p1.atributos.agilidade;
    let agilidade2 = p2.atributos.agilidade;
    let mode1 = agilidade1 / agilidade2;
    let mode2 = agilidade2 / agilidade1; 

    console.log(`O ${p1.nome} foi desafiado pelo ${p2.nome} para um combate!`);

    if (mode1 > mode2) {
        dano1 = (parseInt(mode1) * (ataque1 * defesa2));
        dano2 = (ataque2 * defesa1);
        vida2 -= dano1;
        vida1 -= dano2;
        console.log(`O ${p1.nome} causou ${dano1} de dano\nO ${p2.nome} causou ${dano2} de dano`);
    }
    if (mode2 > mode1) {
        dano1 = (ataque1 * defesa2);
        dano2 = (parseInt(mode2) * (ataque2 * defesa1));
        vida1 -= dano2;
        vida2 -= dano1;
        console.log(`O ${p1.nome} causou ${dano1} de dano\nO ${p2.nome} causou ${dano2} de dano`);
    }
    if (mode1 == mode2) {
        dano1 = (ataque1 * defesa2);
        dano2 = (ataque2 * defesa1);
        vida2 -= dano1;
        vida1 -= dano2;
        console.log(`O ${p1.nome} causou ${dano1} de dano\nO ${p2.nome} causou ${dano2} de dano`);
    }
    if (vida1 <= 0) {
        console.log(`O vencedor da batalha é ${p2.nome}\nA sua experiência após a batalha é: ${perderExp(p1, p2)}`);
    }
    if (vida2 <= 0) {
        itemDropado = dropItem(p1, p2);
        console.log(`O vencedor da batalha é ${p1.nome}\nO item dropado foi: ${itemDropado}\nA sua experiência após a batalha é: ${ganharExp(p1, p2)}`);
    }
}

function dropItem(p1, p2) {
    drop = p2.bag[getRandomNumber(0, 1)];
    p1.bag.push(drop);
    return drop;
}

function ganharExp(p1, p2) {
    return p1.experiencia += p2.experiencia;
}

function perderExp(p1) {
    return p1.experiencia *= 0.95;
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function subirNivel(p1) {
    let dataNivel = pegarAtributosNivel(p1.classe)
    if (p1.experiencia >= 250) {
        p1.atributos.forca += dataNivel.forca,
        p1.atributos.agilidade += dataNivel.agilidade,
        p1.atributos.inteligencia += dataNivel.inteligencia,
        p1.atributos.vitalidade += dataNivel.vitalidade,
        p1.atributos.mana += dataNivel.mana
        
        console.log(`Parabéns, ${p1.nome}, você acaba de subir de nível!`)
    }
}

function pegarAtributosNivel(classe) {
    return arraySubirNivel.find(elem => elem.classe == classe)
}


// array com os atributos padrão de cada classe ao subir de nível
var arraySubirNivel = [{
    classe: 'guerreiro',
    forca: 3,
    agilidade: 5,
    inteligencia: 1,
    vitalidade: 20,
    mana: 5,
}, {
    classe: 'arqueiro',
    forca: 1,
    agilidade: 6,
    inteligencia: 1,
    vitalidade: 10,
    mana: 5,
}, {
    classe: 'mago',
    forca: 1,
    agilidade: 2,
    inteligencia: 8,
    vitalidade: 10,
    mana: 30,
}, {
    classe: 'assassino',
    forca: 2,
    agilidade: 10,
    inteligencia: 1,
    vitalidade: 10,
    mana: 10,
}, {
    classe: 'curandeiro',
    forca: 1,
    agilidade: 2,
    inteligencia: 8,
    vitalidade: 10,
    mana: 30,
}, {
    classe: 'tank',
    forca: 6,
    agilidade: 1,
    inteligencia: 1,
    vitalidade: 40,
    mana: 10,
}
]

function jogarItemFora(p1, item) {
    index = p1.bag.indexOf(item);
    p1.bag.splice(index, 1);
}

function ordernarBag(p1) {
    ordem = p1.bag.sort();
}

atacar(personagem1, monstros[getRandomNumber(0, 1)]);
console.log(personagem1.bag);
jogarItemFora(personagem1, 'faca');
console.log(personagem1.bag);
ordernarBag(personagem1);
console.log(personagem1.bag);
subirNivel(personagem1);
console.log(personagem1);
battle = {

    character: {},

    monster: {},

    log: null,

    monstros: [
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
    ],

    getPersonagem() {
        let personagem = localStorage.getItem ('personagem');
        personagem = JSON.parse(personagem);
        let nome = document.getElementById ('nome');
        nome.innerHTML = `<strong class="nome">${personagem.nome}</strong>`
        let forca = document.getElementById ('forca');
        forca.innerHTML = `Forca: ${personagem.atributos.forca}</p>`
        let agilidade = document.getElementById ('agilidade');
        agilidade.innerHTML = `Agilidade: ${personagem.atributos.agilidade}</p>`
        let inteligencia = document.getElementById ('inteligencia');
        inteligencia.innerHTML = `Inteligencia: ${personagem.atributos.inteligencia}</p>`
        let vitalidade = document.getElementById ('vitalidade');
        vitalidade.innerHTML = `Vitalidade: ${personagem.atributos.vitalidade}</p>`
        let defesa = document.getElementById ('defesa');
        defesa.innerHTML = `Defesa: ${personagem.atributos.defesa}</p>`
        this.character = Object.assign({}, personagem);
    },

    getMonster() {
        let monstro = this.monstros[this.getRandomNumber(0, 1)];
        let nome = document.getElementById ('nome-monster');
        nome.innerHTML = `<strong class="nome-monster">${monstro.nome}</strong>`
        let forca = document.getElementById ('for-monster');
        forca.innerHTML = `Forca: ${monstro.atributos.forca}</p>`
        let agilidade = document.getElementById ('agi-monster');
        agilidade.innerHTML = `Agilidade: ${monstro.atributos.agilidade}</p>`
        let vitalidade = document.getElementById ('vit-monster');
        vitalidade.innerHTML = `Vitalidade: ${monstro.atributos.vitalidade}</p>`
        let defesa = document.getElementById ('def-monster');
        defesa.innerHTML = `Defesa: ${monstro.atributos.defesa}</p>`
        this.monster = Object.assign({}, monstro);
    },

    startGame() {
        this.getPersonagem();
        this.getMonster();
        this.log = document.getElementById('log-box');
        console.log(this.character.classe)
    },

    atacar() {
        let personagem = localStorage.getItem ('personagem');
        personagem = JSON.parse(personagem);
        this.character = Object.assign({}, personagem);
        console.log(this.character.classe)
        let defesa1 = this.character.atributos.defesa;
        let defesa2 = this.monster.atributos.defesa;
        let ataque1 = this.character.classe === 'curandeiro' || 'mago' ? this.character.atributos.inteligencia : this.character.atributos.forca;
        let vida1 = this.character.atributos.vitalidade;
        let ataque2 = this.monster.atributos.forca;
        let vida2 = this.monster.atributos.vitalidade;
        let agilidade1 = this.character.atributos.agilidade;
        let agilidade2 = this.monster.atributos.agilidade;
        let mode1 = agilidade1 / agilidade2;
        let mode2 = agilidade2 / agilidade1;

        this.log.innerHTML = `<span>O ${this.character.nome} foi desafiado pelo ${this.monster.nome} para um combate!</span><br>`
        // console.log(`O ${this.character.nome} foi desafiado pelo ${this.monster.nome} para um combate!`);

        if (mode1 > mode2) {
            let updateVidaChar = document.getElementById('vitalidade')
            let updateVidaMons = document.getElementById('vit-monster')
            dano1 = (parseInt(mode1) * (ataque1 * defesa2));
            dano2 = (ataque2 * defesa1);
            vida2 -= dano1;
            vida1 -= dano2;
            updateVidaChar.innerHTML = `<p>Vitalidade: ${vida1}</p>`
            updateVidaMons.innerHTML = `<p>Vitalidade: ${vida2}</p>`

            this.log.innerHTML += `<span>O ${this.character.nome} causou ${dano1} de dano\nO ${this.monster.nome} causou ${dano2} de dano</span><br>`
            // console.log(`O ${this.character.nome} causou ${dano1} de dano\nO ${this.monster.nome} causou ${dano2} de dano`);
        }
        if (mode2 > mode1) {
            dano1 = (ataque1 * defesa2);
            dano2 = (parseInt(mode2) * (ataque2 * defesa1));
            vida1 -= dano2;
            vida2 -= dano1;

            let updateVidaChar = document.getElementById('vitalidade')
            let updateVidaMons = document.getElementById('vit-monster')

            updateVidaChar.innerHTML = `<p>Vitalidade: ${vida1}</p>`
            updateVidaMons.innerHTML = `<p>Vitalidade: ${vida2}</p>`


            this.log.innerHTML += `<span>O ${this.character.nome} causou ${dano1} de dano\nO ${this.monster.nome} causou ${dano2} de dano</span><br>`
            // console.log(`O ${this.character.nome} causou ${dano1} de dano\nO ${this.monster.nome} causou ${dano2} de dano`);
        }
        if (mode1 == mode2) {
            dano1 = (ataque1 * defesa2);
            dano2 = (ataque2 * defesa1);
            vida2 -= dano1;
            vida1 -= dano2;

            let updateVidaChar = document.getElementById('vitalidade')
            let updateVidaMons = document.getElementById('vit-monster')

            
            updateVidaChar.innerHTML = `<p>Vitalidade: ${vida1}</p>`
            updateVidaMons.innerHTML = `<p>Vitalidade: ${vida2}</p>`


            this.log.innerHTML += `<span>O ${this.character.nome} causou ${dano1} de dano\nO ${this.monster.nome} causou ${dano2} de dano</span><br>`
            // console.log(`O ${this.character.nome} causou ${dano1} de dano\nO ${this.monster.nome} causou ${dano2} de dano`);
        }
        if (vida1 <= 0) {
            this.log.innerHTML += `<span>O vencedor da batalha é ${this.monster.nome}\nA sua experiência após a batalha é: ${this.perderExp(this.character, this.monster)}</span><br>`
            // console.log(`O vencedor da batalha é ${this.monster.nome}\nA sua experiência após a batalha é: ${this.perderExp(this.character, this.monster)}`);
        }
        if (vida2 <= 0) {
            itemDropado = this.dropItem(this.character, this.monster);
            this.log.innerHTML += `<span>O vencedor da batalha é ${this.character.nome}<br>O item dropado foi: ${itemDropado}<br>A sua experiência após a batalha é: ${this.ganharExp(this.character, this.monster)}</span><br>`
            // console.log(`O vencedor da batalha é ${this.character.nome}\nO item dropado foi: ${itemDropado}\nA sua experiência após a batalha é: ${this.ganharExp(this.character, this.monster)}`);
        }
    },

    dropItem(character, monster) {
        drop = monster.bag[this.getRandomNumber(0, 1)];
        character.bag.push(drop);
        return drop;
    },
    
    ganharExp(character, monster) {
        return character.experiencia += monster.experiencia;
    },
    
    perderExp(character) {
        return character.experiencia *= 0.95;
    },
    
    getRandomNumber: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
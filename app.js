const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      opportunityToHeal: true,
      roundsCounter: 1,
      battleLogs: [],
      monsterWinsCounter: 0,
      playerWinsCounter: 0,
      drawCounter: 0,
      currentWinner: null,
    }
  },

  // - - - - - M E T H O D S - - - - - //

  methods: {
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },

    attack() {
      const attackOnMonster = this.getRandomNumber(8, 15);
      this.monsterHealth -= attackOnMonster;
      this.pushLog('Monster', 'lost', attackOnMonster);
      
      const attackOnPlayer = this.getRandomNumber(8, 18);
      this.playerHealth -= attackOnPlayer;
      this.pushLog('Player', 'lost', attackOnPlayer);
    },

    specialAttack() {
      const attackOnMonster = this.getRandomNumber(8, 15);
      this.monsterHealth -= attackOnMonster;
      this.pushLog('Monster', 'lost', attackOnMonster);
    },

    heal() {
      const health = this.getRandomNumber(2, 17);
      this.playerHealth += health;
      this.opportunityToHeal = false;
      this.pushLog('Player', 'recovered', health);
    },

    surrender() {
      this.playerHealth = 0;
    },

    restart() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.isAttackButtonDisabled = false;
      this.opportunityToHeal = true;
      this.roundsCounter++;
      this.currentWinner = null;
      this.battleLogs.length = 0;
    },

    pushLog(person, action, hp) {
      this.battleLogs.unshift({ person, action, hp });
    }
  },

  // - - - - - C O M P U T E D - - - - - //

  computed: {
    isSpecialAttackButtonDisabled() {
      return this.roundsCounter % 3 !== 0;
    },

    isHealButtonDisabled() {
      return this.playerHealth >= 65 || !this.opportunityToHeal || this.currentWinner;
    },

    monsterHealthBarStyles() {
      return {
        width: this.monsterHealth + '%',
      }
    },

    playerHealthBarStyles() {
      return {
        width: this.playerHealth + '%',
      }
    },
  },

  // - - - - - W A T C H - - - - - //

  watch: {
    playerHealth(val) {
      if (val <= 0) {
        this.playerHealth = 0;
      }

      if (val === 0 && this.monsterHealth > 0) {
        this.monsterWinsCounter++;
        this.currentWinner = 'monster';
      }

      if (val === 0 && this.monsterHealth === 0) {
        this.drawCounter++;
        this.currentWinner = 'nobody';
      }
    },

    monsterHealth(val) {
      if (val <= 0) {
        this.monsterHealth = 0;
      }

      if (val === 0 && this.playerHealth > 0) {
        this.playerWinsCounter++;
        this.currentWinner = 'player';
      }
    },
  }
})

app.mount('#game')

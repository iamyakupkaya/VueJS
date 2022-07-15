new Vue({
  el: "#app", //element: app (id)
  data: {
    player_heal: 100,
    monster_heal: 100,
    game_is_on: false,
    special_attack_active: false,
    attack_count: 0,
    logs: [],
  },
  methods: {
    start_game: function () {
      this.game_is_on = true;
    },
    attack: function () {
      let point = Math.ceil(Math.random() * 10); // it will generate 0-10 integer number. normally if we didn't use ceil it would be float number
      this.monster_heal -= point;
      this.attack_count += 1;
      this.monster_attack(11); // afte our attacking bi de biz attack the canavar :))
      this.add_log({ turn: "p", attack: "Player Attack ==> " + point });
      if (this.attack_count >= 3) {
        this.special_attack_active = true;
      } else {
        this.special_attack_active = false;
      }
      /*       console.log("Normal attack:");
      console.log("Attack COUNT", typeof this.attack_count);

      console.log("Player:", this.player_heal);
      console.log("Monster:", this.monster_heal); */
    },
    special_attack: function () {
      if (this.attack_count >= 3) {
        let point = Math.ceil(Math.random() * 20); // it will generate 0-10 integer number. normally if we didn't use ceil it would be float number
        this.monster_heal -= point;
        this.monster_attack(15);
        this.attack_count = 0;
        this.special_attack_active = false;
        this.add_log({
          turn: "p",
          attack: "Player Special Attack ==> " + point,
        });

        /* 
        console.log("special attack:");
        console.log("Player:", this.player_heal);
        console.log("Monster:", this.monster_heal); */
      }
    },
    heal_up: function () {
      let point = Math.ceil(Math.random() * 15);
      this.player_heal += point;
      this.monster_attack(12);
      this.add_log({ turn: "h", attack: "Player Heal UP ==> " + point });

      /*       console.log("Heal UP:");

      console.log("Player:", this.player_heal);
      console.log("Monster:", this.monster_heal); */
    },
    give_up: function () {
      this.player_heal = 0;
      /*       console.log("Give UP:");

      console.log("Player:", this.player_heal);
      console.log("Monster:", this.monster_heal); */
    },
    monster_attack: function (factor) {
      let point = Math.ceil(Math.random() * factor);
      this.player_heal -= point;
      this.add_log({ turn: "m", attack: "MONSTER Attack ==> " + point });

      /*       console.log("Monster attack:");

      console.log("Player:", this.player_heal);
      console.log("Monster:", this.monster_heal); */
    },
    add_log: function (log) {
      this.logs.push(log);
    },
  },
  // bir data değerini izlemek için watch kullanalım.
  watch: {
    player_heal: function (value) {
      // value player_heal in değeridir her zaman
      if (value <= 0) {
        this.player_heal = 0;
        if (confirm(":( Oyunu KAYBETTİN.! Tekrar oynamak ister misin?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      } else if (value >= 100) {
        this.player_heal = 100;
      }
    },
    monster_heal: function (value) {
      // value monster_heal in değeridir her zaman
      if (value <= 0) {
        this.monster_heal = 0;
        if (confirm(":) Oyunu KAZANDIN.! Tekrar oynamak ister misin?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      } else if (value >= 100) {
        this.monster_heal = 100;
      }
    },
  },
  computed: {
    player_progress: function () {
      return {
        width: this.player_heal + "%",
      };
    },
    monster_progress: function () {
      return {
        width: this.monster_heal + "%",
      };
    },
  },
});

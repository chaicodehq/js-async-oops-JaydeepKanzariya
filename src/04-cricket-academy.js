/**
 * 🏏 Cricket Academy Management - Inheritance: extends & super
 *
 * Cricket academy ka management system banana hai! Base Player class hai,
 * aur usse extend karke Batsman, Bowler, aur AllRounder classes banao.
 * `extends` se inheritance milega aur `super` se parent constructor aur
 * methods call honge. Har player type ki apni specialty hai!
 *
 * Class: Player (Base Class)
 *
 *   constructor(name, age, team)
 *     - this.name, this.age, this.team
 *     - this.trainingHours = 0
 *
 *   getProfile()
 *     - Returns { name, age, team, role: "player", trainingHours }
 *
 *   train(hours)
 *     - Adds hours to this.trainingHours
 *     - hours must be > 0, otherwise return -1
 *     - Returns updated this.trainingHours
 *
 *   getTrainingHours()
 *     - Returns this.trainingHours
 *
 *
 * Class: Batsman extends Player
 *
 *   constructor(name, age, team, battingStyle)
 *     - Call super(name, age, team)
 *     - this.battingStyle = battingStyle ("right-hand" or "left-hand")
 *     - this.innings = []
 *
 *   playInnings(runs, balls)
 *     - Validates runs >= 0 and balls > 0
 *     - Calculates strikeRate for this innings: (runs / balls) * 100
 *     - Pushes { runs, balls, strikeRate } to this.innings
 *     - Returns the innings object
 *     - Invalid input returns null
 *
 *   getStrikeRate()
 *     - Returns average strikeRate across all innings
 *     - Agar no innings, return 0
 *
 *   getProfile() [OVERRIDE]
 *     - Returns { ...super.getProfile(), battingStyle, role: "batsman",
 *       totalRuns: sum of all innings runs,
 *       inningsPlayed: this.innings.length }
 *
 *
 * Class: Bowler extends Player
 *
 *   constructor(name, age, team, bowlingStyle)
 *     - Call super(name, age, team)
 *     - this.bowlingStyle = bowlingStyle ("fast", "spin", or "medium")
 *     - this.spells = []
 *
 *   bowlSpell(wickets, runsConceded, overs)
 *     - Validates wickets >= 0, runsConceded >= 0, overs > 0
 *     - Calculates economy: runsConceded / overs
 *     - Pushes { wickets, runsConceded, overs, economy } to this.spells
 *     - Returns the spell object
 *     - Invalid input returns null
 *
 *   getEconomy()
 *     - Returns average economy across all spells
 *     - Agar no spells, return 0
 *
 *   getProfile() [OVERRIDE]
 *     - Returns { ...super.getProfile(), bowlingStyle, role: "bowler",
 *       totalWickets: sum of all spell wickets,
 *       spellsBowled: this.spells.length }
 *
 *
 * Class: AllRounder extends Player
 *
 *   constructor(name, age, team, battingStyle, bowlingStyle)
 *     - Call super(name, age, team)
 *     - this.battingStyle, this.bowlingStyle
 *     - this.innings = [], this.spells = []
 *
 *   playInnings(runs, balls)
 *     - Same logic as Batsman.playInnings
 *
 *   bowlSpell(wickets, runsConceded, overs)
 *     - Same logic as Bowler.bowlSpell
 *
 *   getStrikeRate()
 *     - Same logic as Batsman.getStrikeRate
 *
 *   getEconomy()
 *     - Same logic as Bowler.getEconomy
 *
 *   getProfile() [OVERRIDE]
 *     - Returns { ...super.getProfile(), battingStyle, bowlingStyle,
 *       role: "allrounder",
 *       totalRuns: sum of all innings runs,
 *       totalWickets: sum of all spell wickets,
 *       inningsPlayed: this.innings.length,
 *       spellsBowled: this.spells.length }
 *
 * Rules:
 *   - Always use super() in child constructors
 *   - Override getProfile() in each child class
 *   - battingStyle must be "right-hand" or "left-hand"
 *   - bowlingStyle must be "fast", "spin", or "medium"
 *   - All numeric validations: runs >= 0, balls/overs > 0, wickets >= 0
 *   - AllRounder has BOTH batting and bowling capabilities
 *
 * @example
 *   const virat = new Batsman("Virat", 35, "India", "right-hand");
 *   virat.train(5);
 *   virat.playInnings(82, 53);
 *   virat.getProfile();
 *   // => { name: "Virat", age: 35, team: "India", role: "batsman",
 *   //      trainingHours: 5, battingStyle: "right-hand", totalRuns: 82, inningsPlayed: 1 }
 *
 * @example
 *   const bumrah = new Bowler("Bumrah", 30, "India", "fast");
 *   bumrah.bowlSpell(3, 25, 4);
 *   bumrah.getEconomy();  // => 6.25
 *
 * @example
 *   const hardik = new AllRounder("Hardik", 30, "India", "right-hand", "medium");
 *   hardik.playInnings(71, 30);
 *   hardik.bowlSpell(2, 30, 4);
 *   hardik.getProfile();
 *   // => { ..., role: "allrounder", totalRuns: 71, totalWickets: 2, ... }
 */
const recordInnings = (innings, runs, balls) => {
  if (typeof runs !== "number" || typeof balls !== "number") return null;
  if (!(runs >= 0) || !(balls > 0)) return null;

  const entry = { runs, balls, strikeRate: (runs / balls) * 100 };
  innings.push(entry);
  return entry;
};

const recordSpell = (spells, wickets, runsConceded, overs) => {
  if (typeof wickets !== "number" || typeof runsConceded !== "number" || typeof overs !== "number") {
    return null;
  }
  if (!(wickets >= 0) || !(runsConceded >= 0) || !(overs > 0)) return null;

  const entry = { wickets, runsConceded, overs, economy: runsConceded / overs };
  spells.push(entry);
  return entry;
};

const average = (list, key) =>
  list.length === 0 ? 0 : list.reduce((sum, item) => sum + item[key], 0) / list.length;

const sum = (list, key) => list.reduce((total, item) => total + item[key], 0);

export class Player {
  constructor(name, age, team) {
    this.name = name;
    this.age = age;
    this.team = team;
    this.trainingHours = 0;
  }

  getProfile() {
    return {
      name: this.name,
      age: this.age,
      team: this.team,
      role: "player",
      trainingHours: this.trainingHours,
    };
  }

  train(hours) {
    if (typeof hours !== "number" || !(hours > 0)) return -1;

    this.trainingHours += hours;
    return this.trainingHours;
  }

  getTrainingHours() {
    return this.trainingHours;
  }
}

export class Batsman extends Player {
  constructor(name, age, team, battingStyle) {
    super(name, age, team);
    this.battingStyle = battingStyle;
    this.innings = [];
  }

  playInnings(runs, balls) {
    return recordInnings(this.innings, runs, balls);
  }

  getStrikeRate() {
    return average(this.innings, "strikeRate");
  }

  getProfile() {
    return {
      ...super.getProfile(),
      battingStyle: this.battingStyle,
      role: "batsman",
      totalRuns: sum(this.innings, "runs"),
      inningsPlayed: this.innings.length,
    };
  }
}

export class Bowler extends Player {
  constructor(name, age, team, bowlingStyle) {
    super(name, age, team);
    this.bowlingStyle = bowlingStyle;
    this.spells = [];
  }

  bowlSpell(wickets, runsConceded, overs) {
    return recordSpell(this.spells, wickets, runsConceded, overs);
  }

  getEconomy() {
    return average(this.spells, "economy");
  }

  getProfile() {
    return {
      ...super.getProfile(),
      bowlingStyle: this.bowlingStyle,
      role: "bowler",
      totalWickets: sum(this.spells, "wickets"),
      spellsBowled: this.spells.length,
    };
  }
}

export class AllRounder extends Player {
  constructor(name, age, team, battingStyle, bowlingStyle) {
    super(name, age, team);
    this.battingStyle = battingStyle;
    this.bowlingStyle = bowlingStyle;
    this.innings = [];
    this.spells = [];
  }

  playInnings(runs, balls) {
    return recordInnings(this.innings, runs, balls);
  }

  bowlSpell(wickets, runsConceded, overs) {
    return recordSpell(this.spells, wickets, runsConceded, overs);
  }

  getStrikeRate() {
    return average(this.innings, "strikeRate");
  }

  getEconomy() {
    return average(this.spells, "economy");
  }

  getProfile() {
    return {
      ...super.getProfile(),
      battingStyle: this.battingStyle,
      bowlingStyle: this.bowlingStyle,
      role: "allrounder",
      totalRuns: sum(this.innings, "runs"),
      totalWickets: sum(this.spells, "wickets"),
      inningsPlayed: this.innings.length,
      spellsBowled: this.spells.length,
    };
  }
}

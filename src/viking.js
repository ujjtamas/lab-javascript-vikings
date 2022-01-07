// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }

  attack(){
    return this.strength;
  }
  
  receiveDamage(damage){
    this.health -= damage;
  }
}

// Viking
class Viking extends Soldier{
  constructor(name, health, strength){
    super(health, strength);
    this.name = name;
  }

  receiveDamage(damage){
    this.health -= damage;
    if(this.health <= 0){
      return this.name + ' has died in act of combat';
    }
    return this.name + ' has received ' + damage + ' points of damage';
  }

  battleCry(){
    return 'Odin Owns You All!';
  }
}

// Saxon
class Saxon extends Soldier{
  
  receiveDamage(damage){
    this.health -= damage;
    
    if(this.health <= 0){
      return 'A Saxon has died in combat'
    }
    return 'A Saxon has received ' + damage + ' points of damage';
  }
}

// War
class War {
  constructor(){
    this.vikingArmy = [];
    this.saxonArmy = [];
  }
  
  addViking(Viking){
    this.vikingArmy.push(Viking);
  }
  addSaxon(Saxon){
    this.saxonArmy.push(Saxon);
  }

  /*generic attack*/
  attack(aggressorArmy,victimArmy){
    let aggressorPos = Math.floor(Math.random() * aggressorArmy.length);
    let aggressor = aggressorArmy[aggressorPos];
    let victimPos = Math.floor(Math.random() * victimArmy.length);
    let victim = victimArmy[victimPos];

    let battleCry = victim.receiveDamage(aggressor.strength);

    if(aggressor.name){
      console.log(aggressor.name + ' attacked Saxon no' + victimPos + ' \u2656' + ' \u2905 ' + '\u265c');
    }
    else{
      console.log('Saxon no' + aggressorPos + ' attacked ' + victim.name + ' \u265c' + ' \u2915 ' + '\u2656');
    }
    
    if(battleCry == 'A Saxon has died in combat' || battleCry == victim.name + ' has died in act of combat'){
      victimArmy.splice(victimPos,1);
    }

    return (battleCry);
  }

  /*Viking attacks Saxon */
  vikingAttack(){
    return this.attack(this.vikingArmy,this.saxonArmy);
  }

  /*Saxon attacks Viking*/
  saxonAttack(){
    return this.attack(this.saxonArmy,this.vikingArmy);
  }

  showStatus(){

    let saxonArmylength = '';
    let vikingArmylength = '';
    for(let i in this.saxonArmy){
      saxonArmylength += '\u265c';
    }
    
    for(let i in this.vikingArmy){
      vikingArmylength += '\u2656';
    }

    if(this.saxonArmy.length > 0 && this.vikingArmy.length > 0){
      return 'Vikings and Saxons are still in the thick of battle. ' + vikingArmylength + ' vs ' + saxonArmylength;
    }

    if(!this.saxonArmy.length){
      return 'Vikings have won the war of the century!';
    }

    if(!this.vikingArmy.length){
      return 'Saxons have fought for their lives and survived another day...';
    }
  }
}

//Secret preparation for the war
let armySize = 5;
let armyStrength = 100;
let armyHealth = 1000;

//Declaration of war
const myWar = new War();

//Training the army
for(let i = 0; i < armySize; i++){
  let randomStrength = Math.floor(Math.random() * armyStrength)+i;
  let randomHealth = Math.floor(Math.random() * armyHealth)+i;
  let aSaxon = new Saxon(randomHealth,randomStrength);
  let aViking = new Viking('Viking_'+i,randomHealth,randomStrength);
  
  myWar.addSaxon(aSaxon);
  myWar.addViking(aViking);
}

//The march
let theSaxonArmy = '';
for(let i in myWar.saxonArmy){
  theSaxonArmy += '\u265c';
}
console.log('The Saxons: ' + theSaxonArmy);

let theVikingArmy = '';
for(let i in myWar.vikingArmy){
  theVikingArmy += '\u2656';
}
console.log('\nThe Vikings: ' + theVikingArmy);

//So it begins
let j = 1;
do{
  console.log('\nRound ' + j);
  j++;
  if(j%2){
    console.log(myWar.vikingAttack());
  }
  else{
    console.log(myWar.saxonAttack());
  }
  console.log(myWar.showStatus());
}while(myWar.showStatus() !== 'Vikings have won the war of the century!' && myWar.showStatus() !== 'Saxons have fought for their lives and survived another day...')


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}

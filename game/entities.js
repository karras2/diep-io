const s = {
  // reload, recoil, dmg, pene, speed, range, density, spray
  basic: [50, 1, 10, 10, 3, 150, 150, 1],
  drone: [4, 0, 1, 3, 1.5, -10, 10, 0.1],
  twin: [1.4, 0.8, 0.6, 0.6, 1, 1, 1, 1],
  mach: [0.75, 1.125, 0.7, 0.7, 1, 0.9, 4],
  sniper: [1.125, 1, 0.8, 1.25, 1.5, 1.25, 1, 0.5],
  flank: [1.1, 1, 0.8, 0.8, 0.9, 1, 1, 1],
  thruster: [1, 1.5, 0.5, 0.5, 0.75, 0.5, 0.5, 1.5],
  rocketeerRocket: [0.75, 2, 1.25, 1.25, 0.5, 10, 2],
  destroy: [4, 2, 3, 3, 1.125, 2, 5, 0.1],
  gunner: [1.25, 0.75, 0.75, 0.8, 1, 1, 2, 1.25],
  rocketeerRocket: [0.5, 2, 1.25, 1.25, 0.25, 0.6, 10, 5],
  skimmerMissile: [0.75, 1, 1.25, 1.25, 1, 0.5, 10, 0.5],
  trapper: [1, 1, 0.1, 4, 2, 2, 10, 2],
  anni: [1.25, 2, 1.5, 1.5, 0.8, 1.5, 2, 0.1]
};

let combineStats = ((stats) => {
  let baseStats = JSON.parse(JSON.stringify(stats[0]));
  stats.shift();
  for (let stat of stats) {
    for (let i = 0; i < stat.length; i ++) baseStats[i] *= stat[i];
  }
  let out = {};
  let names = ["reload", "recoil", "dmg", "pene", "speed", "range", "density", "spray"];
  for (let i = 0; i < names.length; i ++) out[names[i]] = baseStats[i];
  out.range = Math.floor(out.range);
  return out;
});

// Shapes
let square = {
  label: "Square",
  size: 30,
  spin: 2,
  type: "food",
  color: "square",
  shape: 4,
  health: {
    max: 50,
    amount: 50
  },
  xp: 10,
};
let triangle = {
  label: "Triangle",
  size: 45,
  spin: 2,
  type: "food",
  color: "triangle",
  shape: 3,
  health: {
    max: 75,
    amount: 75
  },
  xp: 25,
};
let pentagon = {
  label: "Pentagon",
  size: 60,
  spin: 2,
  type: "food",
  color: "pentagon",
  shape: 5,
  health: {
    max: 150,
    amount: 150
  },
  xp: 100,
};
let alphaPentagon = {
  label: "Alpha Pentagon",
  size: 225,
  spin: 2,
  type: "food",
  color: "pentagon",
  shape: 5,
  health: {
    max: 1000,
    amount: 1000
  },
  stats: {
    damage: 10
  },
  xp: 3000,
};

// Ammo
let bullet = {
  label: "Bullet",
  type: "bullet",
  guns: []
};
let trap = {
  label: "Trap",
  type: "bullet",
  shape: -3,
  slows: true,
  guns: []
};
let drone = {
  label: "Drone",
  type: "bullet",
  moveToMasterTarget: true,
  shape: 3,
  guns: []
};
let rocket = {
  label: "Rocket",
  type: "bullet",
  guns: [{
    position: [1.5, 1, 1.75, 0, 0, Math.PI, 2],
    ammo: "bullet",
    stats: combineStats([s.basic, s.mach, s.thruster, s.rocketeerRocket]),
    color: "me"
  }]
};
let missile = {
  label: "Missile",
  type: "bullet",
  spin: 1,
  guns: [{
    position: [1.65, 1, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.mach, s.thruster, s.skimmerMissile]),
    color: "me"
  }, {
    position: [1.65, 1, 1, 0, 0, Math.PI, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.mach, s.thruster, s.skimmerMissile]),
    color: "me"
  }]
};

let basic = {
  label: "Basic",
  type: "tank",
  guns: [{
    position: [2, 1, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic])
  }],
  upgrades: ["twin", "machine", "sniper", "flank"]
};

// LvL 15
let twin = {
  label: "Twin",
  guns: [{
    position: [1.9, 0.9, 1, 0.5, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [1.9, 0.9, 1, -0.5, 0, 0, 0.5],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }],
  upgrades: ["triple", "double"]
};
let machine = {
  label: "Machine Gun",
  guns: [{
    position: [2, 1, 1.75, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.mach])
  }],
  upgrades: ["destroyer", "gunner"]
};
let sniper = {
  label: "Sniper",
  stats: {
    fov: 1.1
  },
  guns: [{
    position: [2.5, 0.9, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.sniper])
  }],
  upgrades: ["assassin", "hunter", "trapper"]
};
let flank = {
  label: "Flank Guard",
  guns: [{
    position: [2, 1, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.flank])
  }, {
    position: [1.6, 1, 1, 0, 0, Math.PI, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.flank, s.thruster])
  }],
  upgrades: ["quad", "tri"]
};

// LvL 30
let triple = {
  label: "Triple Shot",
  guns: [{
    position: [1.75, 0.9, 1, -0.25, 0, Math.PI / 10, 0.5],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [1.75, 0.9, 1, 0.25, 0, -Math.PI / 10, 0.5],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [2, 0.9, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }],
  upgrades: ["triplet", "penta", "spreadshot"]
};
let double = {
  label: "Double Twin",
  guns: [{
    position: [1.9, 0.9, 1, 0.5, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [1.9, 0.9, 1, -0.5, 0, 0, 0.5],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [1.9, 0.9, 1, 0.5, 0, Math.PI, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [1.9, 0.9, 1, -0.5, 0, Math.PI, 0.5],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }],
  upgrades: ["tripleTwin"]
};
let destroyer = {
  label: "Destroyer",
  guns: [{
    position: [2, 1.4, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.destroy])
  }],
  upgrades: ["anni", "skimmer", "rocketeer"]
};
let gunner = {
  label: "Gunner",
  guns: [{
    position: [1.75, 0.5, 1, 0.8, 0, 0, 0.25],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin, s.gunner])
  }, {
    position: [1.75, 0.5, 1, -0.8, 0, 0, 0.75],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin, s.gunner])
  }, {
    position: [2, 0.5, 1, 0.4, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin, s.gunner])
  }, {
    position: [2, 0.5, 1, -0.4, 0, 0, 0.5],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin, s.gunner])
  }]
};
let trapper = {
  label: "Trapper",
  guns: [{
    position: [1.65, 1, 1, 0, 0, 0, 0],
    ammo: "trap",
    stats: combineStats([s.basic, s.trapper]),
    prop: true
  }, {
    position: [0.5, 1, 1.5, 0, 1.65, 0, 0],
    ammo: "trap",
    stats: combineStats([s.basic, s.trapper])
  }],
  upgrades: ["twin", "machine", "sniper", "flank"]
};
let assassin = {
  label: "Assassin",
  stats: {
    fov: 1.3
  },
  guns: [{
    position: [3, 0.9, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.sniper])
  }],
  upgrades: ["trapper"]
};
let hunter = {
  label: "Hunter",
  stats: {
    fov: 1.1
  },
  guns: [{
    position: [2.3, 0.9, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.sniper])
  }, {
    position: [2, 1.2, 1, 0, 0, 0, 0.25],
    ammo: "bullet",
    stats: combineStats([s.basic, s.sniper])
  }]
};
let quad = {
  label: "Quad Tank",
  guns: [{
    position: [2, 1, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.flank])
  }, {
    position: [2, 1, 1, 0, 0, Math.PI, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.flank])
  }, {
    position: [2, 1, 1, 0, 0, Math.PI / 2, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.flank])
  }, {
    position: [2, 1, 1, 0, 0, -Math.PI / 2, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.flank])
  }]
};
let tri = {
  label: "Tri-Angle",
  guns: [{
    position: [2, 1, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.flank])
  }, {
    position: [1.65, 0.9, 1, -0.1, 0, Math.PI + (Math.PI / 6), 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.flank, s.thruster])
  }, {
    position: [1.65, 0.9, 1, 0.1, 0, Math.PI - (Math.PI / 6), 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.flank, s.thruster])
  }]
};
let overseer = {
  label: "Overseer",
  guns: [{
    position: [1.5, 1, 1.5, 0, 0, Math.PI / 2, 1],
    ammo: "drone",
    stats: combineStats([s.basic, s.drone])
  }, {
    position: [1.5, 1, 1.5, 0, 0, -Math.PI / 2, 1],
    ammo: "drone",
    stats: combineStats([s.basic, s.drone])
  }]
};

// LvL 45
let triplet = {
  label: "Triplet",
  guns: [{
    position: [1.675, 0.9, 1, -0.5, 0, 0, 0.5],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [1.675, 0.9, 1, 0.5, 0, 0, 0.5],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [2, 0.9, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }]
};
let penta = {
  label: "Penta Shot",
  guns: [{
    position: [1.6, 0.9, 1, -0.3, 0, Math.PI / 5, 0.75],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [1.6, 0.9, 1, 0.3, 0, -Math.PI / 5, 0.75],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [1.8, 0.9, 1, -0.25, 0, Math.PI / 10, 0.4],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [1.8, 0.9, 1, 0.25, 0, -Math.PI / 10, 0.4],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [2, 0.9, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }]
};

let spreadshot = {
  label: "Spredshot",
  guns: []
};
for (let i = 5; i > 0; i --) spreadshot.guns.push({
  position: [1.9 - (0.05 * i), 0.6, 1, 0, 0, (Math.PI / 10) * ((i + 1) * 0.9) - (Math.PI / 10), 1 - (0.2 * i)],
  ammo: "bullet",
  stats: combineStats([s.basic, s.twin])
}, {
  position: [1.9 - (0.05 * i), 0.6, 1, 0, 0, -(Math.PI / 10) * ((i + 1) * 0.9) + (Math.PI / 10), 1 - (0.2 * i)],
  ammo: "bullet",
  stats: combineStats([s.basic, s.twin])
});
spreadshot.guns.push({
  position: [2.1, 1, 1, 0, 0, 0, 0],
  ammo: "bullet",
  stats: combineStats([s.basic, s.twin])
});
let tripleTwin = {
  label: "Triple Twin",
  guns: []
};
for (let i = 0; i < 3; i ++) 
  tripleTwin.guns.push({
    position: [1.9, 0.9, 1, 0.5, 0, Math.PI / 1.5 * i, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  }, {
    position: [1.9, 0.9, 1, -0.5, 0, Math.PI / 1.5 * i, 0.5],
    ammo: "bullet",
    stats: combineStats([s.basic, s.twin])
  });
let anni = {
  label: "Annihilator",
  guns: [{
    position: [2, 2, 1, 0, 0, 0, 0],
    ammo: "bullet",
    stats: combineStats([s.basic, s.destroy, s.anni])
  }]
};
let skimmer = {
  label: "Skimmer",
  guns: [{
    position: [0.25, 1.2, 1.1, 0, 1.8, 0, 0],
    ammo: "missile",
    stats: combineStats([s.basic, s.destroy])
  }, {
    position: [1.8, 1.4, 1, 0, 0, 0, 0],
    ammo: "missile",
    stats: combineStats([s.basic, s.destroy]),
    prop: true
  }]
};
let rocketeer = {
  label: "Rocketeer",
  guns: [{
    position: [0.25, 1.05, 1.1, 0, 1.8, 0, 0],
    ammo: "rocket",
    stats: combineStats([s.basic, s.destroy])
  }, {
    position: [1.8, 1.4, 0.75, 0, 0, 0, 0],
    ammo: "rocket",
    stats: combineStats([s.basic, s.destroy]),
    prop: true
  }]
};

export { square, triangle, pentagon, alphaPentagon, bullet, trap, drone, rocket, missile, basic, twin, machine, sniper, flank, triple, double, destroyer, gunner, trapper, assassin, hunter, quad, tri, triplet, penta, spreadshot, tripleTwin, anni, skimmer, rocketeer, overseer }
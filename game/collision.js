let basicCollide = (i, o) => {
  if (i.collisionArray.includes(o) || o.collisionArray.includes(i)) return;
  if (i === o || i.master === o || o.master === i || o.master === i.master) return;
  i.collisionArray.push(o);
  o.collisionArray.push(i);
  let fasterEntity = o;
  if (Math.abs(i.vx + i.vy) + i.size > Math.abs(o.vx + o.vy) + o.size) fasterEntity = i;
  if (fasterEntity === i) {
    o.vx = i.vx;
    o.vy = i.vy;
    i.vx *= -0.75;
    i.vy *= -0.75;
  } else {
    i.vx = o.vx;
    i.vy = o.vy;
    o.vx *= -0.75;
    o.vy *= -0.75;
  }
};

export { basicCollide }
/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */


function p4_inspirations() {
  return [{name: 'flower', assetUrl: './flower.jpg'}, {name: 'sakura', assetUrl: './sakura.jpg'}, {name: 'mountains', assetUrl: './mountains.jpg'}];
}

function p4_initialize(inspiration) {
  if (inspiration.name == 'flower')
    return { petals: 12, pWidth: 5, pLength: 20, pColor: 220, flowerR: 200, flowerG: 200, flowerB: 100, flowerRadius: 30};
  else if (inspiration.name == 'sakura')
    return { branch1s: 0.25, branch1ex: 75, branch1ey: 100, 
             branch2s: 0.33, branch2ex: 150, branch2ey: 50,
             flowerSize: 5, flowerCount: 20, flowerRatio: 0.75, petals: 20 };
  else if (inspiration.name == 'mountains')
    return { mountain1base:  25, mountain1width: 100, mountain1height: 40, mountain1alpha: 200,
             mountain2base: 200, mountain2width: 100, mountain2height: 40, mountain2alpha: 200,
             mountain3base: 125, mountain3width:  75, mountain3height: 30, mountain3alpha: 100,
             mountain4base: 150, mountain4width:  80, mountain4height: 30, mountain4alpha: 100 };
}

function p4_render(design, inspiration) {
  if (inspiration.name == 'flower') {
    push(); // Avoid affecting other designs
    noStroke();
    background('#2f4d10');
    angleMode(DEGREES);
    push(); // Add petals to the flower
      fill(design.pColor);
      translate(width/2, height/2);
      for(let i = 0; i < design.petals; i++) {
        angle = 360 * (i / floor(design.petals));
        push()
        rotate(angle);
        ellipse(design.pLength/2 + design.flowerRadius/2 - 10, 0, design.pLength, design.pWidth)
        pop()
      }
    pop();

    // Add  flower center
    fill(design.flowerR, design.flowerG, design.flowerB);
    circle(width/2, height/2, design.flowerRadius)
    pop();
  } else if (inspiration.name == 'sakura') {
    push();  // Avoid affecting other designs
    background('#4472ad');
    // Draw large branches first (hardcoded)
    strokeWeight(4);
    stroke('#141f1a')
    line(width - 20, height, width*2/5, height/5);
    line(width, height * 2/3, width * 7/8, height/8);
    // Main branch length
    let mb1lenx = width - 20 - width*2/5;
    let mb1leny = height - height/5;
    let mb2lenx = width - width * 7/8;
    let mb2leny = height * 2/3 - height/8;
    // Draw smaller branches attached to large branches
    strokeWeight(2);
    // calculate start point of branch for later
    // unrelated comment: I hate coordinate transformations
    let b1sx = (width-20 - width*2/5) * (1-design.branch1s) + width*2/5;
    let b1sy = (height - height/5) * (1-design.branch1s) + height/5;
    let b2sx = (width - width*7/8) * (1-design.branch2s) + width*7/8;
    let b2sy = (height*2/3 - height/8) * (1-design.branch2s) + height/8;
    line( b1sx, b1sy, design.branch1ex, design.branch1ey);
    line( b2sx, b2sy, design.branch2ex, design.branch2ey);
    // Small branch length
    let b1lenx = b1sx - design.branch1ex
    let b1leny = b1sy - design.branch1ey
    let b2lenx = b2sx - design.branch2ex
    let b2leny = b2sy - design.branch2ey
    // Add flowers to branches. Using circles as flowers since the reference image is low detail at this size
    push();
    noStroke();
    // hardcoded offset value
    let offset = 3;
    fill('#fcc9b9');
    for (let i = 0; i < design.flowerCount; i++) {
      circle( (b1sx - b1lenx * i/design.flowerCount) - (i % 2 == 0 ? offset : 0),
              (b1sy - b1leny * i/design.flowerCount) - (i % 2 == 1 ? offset : 0), design.flowerSize);
      circle( (b2sx - b2lenx * i/design.flowerCount) - (i % 2 == 0 ? offset : 0),
              (b2sy - b2leny * i/design.flowerCount) - (i % 2 == 1 ? offset : 0), design.flowerSize);
      circle( ((width - 20) - (mb1lenx * design.flowerRatio) * i/design.flowerCount) - (i % 2 == 0 ? 2*offset : 0),
              (height - (mb1leny * design.flowerRatio) * i/design.flowerCount) - (i % 2 == 1 ? 2*offset : 0), 2*design.flowerSize);
      circle( (width - (mb2lenx * design.flowerRatio) * i/design.flowerCount) - (i % 2 == 0 ? 2*offset : 0),
              (height * 2/3 - (mb2leny * design.flowerRatio) * i/design.flowerCount) - (i % 2 == 1 ? 2*offset : 0), 2*design.flowerSize);
    }
    // add floating flower petals. Even though random() is being used, They should stay in the same location, which is fine
    for (let i = 0; i < design.petals; i++)
    {
      circle(random()*width, random()*height, 3);
    }
    pop();
    pop();
  } else if (inspiration.name == 'mountains') { 
    push();
    background('#9ac0dc');
    noStroke();
    fill('#90a35b');
    rect(0, height - 50, width, 50);
    let mbase = height - 50;
    fill(59, 67, 21, design.mountain1alpha);
    triangle(design.mountain1base - design.mountain1width/2, mbase, design.mountain1base + design.mountain1width/2, mbase, design.mountain1base, mbase - design.mountain1height);
    fill(59, 67, 21, design.mountain2alpha);
    triangle(design.mountain2base - design.mountain2width/2, mbase, design.mountain2base + design.mountain2width/2, mbase, design.mountain2base, mbase - design.mountain2height);
    fill(59, 67, 21, design.mountain3alpha);
    triangle(design.mountain3base - design.mountain3width/2, mbase, design.mountain3base + design.mountain3width/2, mbase, design.mountain3base, mbase - design.mountain3height);
    fill(59, 67, 21, design.mountain4alpha);
    triangle(design.mountain4base - design.mountain4width/2, mbase, design.mountain4base + design.mountain4width/2, mbase, design.mountain4base, mbase - design.mountain4height);
    pop();
  }
}

function p4_mutate(design, inspiration, rate) {
  if (inspiration.name == 'flower') {
    design.petals = 12 + random() * rate * 20;
    design.pWidth = 5 + random() * rate * 15;
    design.pLength = 20 + random() * rate * 20;
    design.pColor = 220 + random(-1, 1) * rate * 35;
    design.flowerR = 200 + random(-1, 1) * rate * 55;
    design.flowerG = 200 + random(-1, 1) * rate * 55;
    design.flowerB = 50 + random(-1,1) * rate * 50;
    design.flowerRadius = 30 + random() * rate * 20;
  } else if (inspiration.name == 'sakura') {
    design.branch1s = 0.25 + random(-1, 1) * rate * 0.15;
    design.branch1ex = 75 + random(-1, 1) * rate * 15;
    design.branch1ey = 100 + random(-1, 1) * rate * 25;
    design.branch2s = 0.33 + random(-1, 1) * rate * 0.5;
    design.branch2ex = 150 + random(-1, 1) * rate * 30;
    design.branch2ey = 50 + random(-1, 1) * rate * 15;
    design.flowerSize = 7 + random(-1, 1) * rate * 2; 
    design.flowerCount = 20 + random(-1, 1) * rate * 5; 
    design.flowerRatio = 0.85 + random(-1, 1) * rate * 0.10;
    design.petals = 35 + random(-1, 1) * rate * 15;
  } else if (inspiration.name == 'mountains') {
    design.mountain1base =  25 + random(-1, 1) * rate * 10;
    design.mountain1width = 100 + random(-1, 1) * rate * 40;
    design.mountain1height = 40 + random(-1, 1) * rate * 20;
    design.mountain1alpha = 200 + random(-1, 1) * rate * 55;
    design.mountain2base = 200 + random(-1, 1) * rate * 20;
    design.mountain2width = 100 + random(-1, 1) * rate * 50;
    design.mountain2height = 40 + random(-1, 1) * rate * 20;
    design.mountain2alpha = 200 + random(-1, 1) * rate * 55;
    design.mountain3base = 125 + random(-1, 1) * rate * 15;
    design.mountain3width =  75 + random(-1, 1) * rate * 30;
    design.mountain3height = 30 + random(-1, 1) * rate * 20;
    design.mountain3alpha = 100 + random(-1, 1) * rate * 50;
    design.mountain4base = 150 + random(-1, 1) * rate * 25;
    design.mountain4width =  80 + random(-1, 1) * rate * 20;
    design.mountain4height = 30 + random(-1, 1) * rate * 20;
    design.mountain4alpha = 100 + random(-1, 1) * rate * 50;
  }
}

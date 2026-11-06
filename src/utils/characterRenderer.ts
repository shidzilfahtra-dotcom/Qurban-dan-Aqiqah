import { CharacterType } from '../types/game';

interface DrawCharacterParams {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  characterType: CharacterType;
  customName: string;
  accessoryColor: string;
  state: 'run' | 'jump' | 'slide' | 'hurt';
  frame: number;
}

export function drawCharacter({
  ctx,
  x,
  y,
  width,
  height,
  characterType,
  customName,
  accessoryColor,
  state,
  frame,
}: DrawCharacterParams) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);

  // Animation transforms
  if (state === 'jump') {
    ctx.scale(0.9, 1.15); // stretch
  } else if (state === 'slide') {
    ctx.scale(1.25, 0.65); // squash
    ctx.translate(0, height * 0.2);
  } else if (state === 'hurt') {
    ctx.rotate(Math.sin(frame * 0.5) * 0.15);
  } else {
    // Running bob
    const bob = Math.sin(frame * 0.25) * 3;
    ctx.translate(0, bob);
  }

  const cx = 0;
  const cy = 0;
  const legSwing = Math.sin(frame * 0.3) * 12;

  // Render character body based on type
  switch (characterType) {
    case 'sheep':
      drawSheep(ctx, cx, cy, accessoryColor, legSwing, state);
      break;
    case 'goat':
      drawGoat(ctx, cx, cy, accessoryColor, legSwing, state);
      break;
    case 'cow':
      drawCow(ctx, cx, cy, accessoryColor, legSwing, state);
      break;
    case 'camel':
      drawCamel(ctx, cx, cy, accessoryColor, legSwing, state);
      break;
    case 'shepherd':
      drawShepherd(ctx, cx, cy, accessoryColor, legSwing, state);
      break;
  }

  // Draw custom character name tag above character
  ctx.restore();
  ctx.save();
  ctx.translate(x + width / 2, y - 12);
  ctx.font = 'bold 12px "Fredoka", "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  const textWidth = ctx.measureText(customName).width;
  ctx.fillRect(-textWidth / 2 - 8, -14, textWidth + 16, 18);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(customName, 0, 0);

  // Scarf color pin
  ctx.fillStyle = accessoryColor;
  ctx.beginPath();
  ctx.arc(-textWidth / 2 - 3, -5, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSheep(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  accessoryColor: string,
  legSwing: number,
  state: string
) {
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 22, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs
  ctx.fillStyle = '#1e293b';
  if (state === 'slide') {
    ctx.fillRect(cx - 16, cy + 8, 32, 6);
  } else {
    // Back legs
    ctx.fillRect(cx - 16 + legSwing * 0.4, cy + 12, 6, 12);
    ctx.fillRect(cx + 8 - legSwing * 0.4, cy + 12, 6, 12);
  }

  // Fluffy sheep body (cloud puffs)
  ctx.fillStyle = '#f8fafc';
  const puffs = [
    { x: -14, y: 0, r: 14 },
    { x: 0, y: -4, r: 16 },
    { x: 12, y: 0, r: 13 },
    { x: -8, y: 8, r: 13 },
    { x: 8, y: 8, r: 13 },
  ];
  puffs.forEach((p) => {
    ctx.beginPath();
    ctx.arc(cx + p.x, cy + p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Sheep Face
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.ellipse(cx + 18, cy - 2, 10, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eye
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx + 21, cy - 4, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx + 22, cy - 4, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Horns (Golden spiral horns for kibasy / sheep)
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(cx + 14, cy - 10, 7, Math.PI * 0.8, Math.PI * 2.2);
  ctx.stroke();

  // Scarf / Ribbon
  ctx.fillStyle = accessoryColor;
  ctx.beginPath();
  ctx.roundRect(cx + 8, cy + 4, 8, 6, 2);
  ctx.fill();
  // Ribbon tail
  ctx.beginPath();
  ctx.moveTo(cx + 12, cy + 9);
  ctx.lineTo(cx + 6, cy + 18);
  ctx.lineTo(cx + 14, cy + 15);
  ctx.closePath();
  ctx.fill();
}

function drawGoat(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  accessoryColor: string,
  legSwing: number,
  state: string
) {
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 22, 20, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs (slender)
  ctx.fillStyle = '#475569';
  if (state === 'slide') {
    ctx.fillRect(cx - 15, cy + 8, 30, 5);
  } else {
    ctx.fillRect(cx - 14 + legSwing * 0.4, cy + 10, 5, 14);
    ctx.fillRect(cx + 8 - legSwing * 0.4, cy + 10, 5, 14);
  }

  // Goat Body (Etawa dual-tone cream/brown)
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 2, 18, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.ellipse(cx - 6, cy + 2, 10, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Neck & Head
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.ellipse(cx + 16, cy - 6, 11, 9, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Long drooping ears (Etawa trademark)
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.ellipse(cx + 13, cy + 3, 4, 11, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Horns (Sharp backwards curve)
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx + 16, cy - 12);
  ctx.quadraticCurveTo(cx + 8, cy - 20, cx + 5, cy - 14);
  ctx.stroke();

  // Beard
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(cx + 22, cy);
  ctx.lineTo(cx + 25, cy + 8);
  ctx.lineTo(cx + 20, cy + 5);
  ctx.closePath();
  ctx.fill();

  // Eye
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx + 20, cy - 7, 2, 0, Math.PI * 2);
  ctx.fill();

  // Scarf
  ctx.fillStyle = accessoryColor;
  ctx.fillRect(cx + 10, cy + 2, 7, 6);
  ctx.beginPath();
  ctx.moveTo(cx + 14, cy + 7);
  ctx.lineTo(cx + 8, cy + 17);
  ctx.lineTo(cx + 16, cy + 13);
  ctx.closePath();
  ctx.fill();
}

function drawCow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  accessoryColor: string,
  legSwing: number,
  state: string
) {
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 24, 25, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Strong legs
  ctx.fillStyle = '#78350f';
  if (state === 'slide') {
    ctx.fillRect(cx - 20, cy + 10, 40, 8);
  } else {
    ctx.fillRect(cx - 18 + legSwing * 0.3, cy + 12, 8, 14);
    ctx.fillRect(cx + 10 - legSwing * 0.3, cy + 12, 8, 14);
  }

  // Robust muscular body (Brown Limousin)
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.roundRect(cx - 22, cy - 10, 42, 24, 10);
  ctx.fill();

  // Belly patch
  ctx.fillStyle = '#fde68a';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 6, 12, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.roundRect(cx + 12, cy - 18, 18, 18, 6);
  ctx.fill();

  // Snout
  ctx.fillStyle = '#fbcfe8';
  ctx.beginPath();
  ctx.roundRect(cx + 20, cy - 10, 12, 10, 4);
  ctx.fill();
  // Nostrils
  ctx.fillStyle = '#9d174d';
  ctx.fillRect(cx + 24, cy - 6, 2, 2);
  ctx.fillRect(cx + 28, cy - 6, 2, 2);

  // Horns
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.moveTo(cx + 18, cy - 18);
  ctx.lineTo(cx + 22, cy - 26);
  ctx.lineTo(cx + 25, cy - 18);
  ctx.closePath();
  ctx.fill();

  // Eye
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx + 18, cy - 13, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx + 19, cy - 13, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Golden Bell with custom accessory ribbon
  ctx.fillStyle = accessoryColor;
  ctx.fillRect(cx + 12, cy + 1, 6, 5);
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(cx + 15, cy + 9, 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawCamel(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  accessoryColor: string,
  legSwing: number,
  state: string
) {
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 24, 24, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Long legs
  ctx.fillStyle = '#92400e';
  if (state === 'slide') {
    ctx.fillRect(cx - 18, cy + 10, 36, 6);
  } else {
    ctx.fillRect(cx - 16 + legSwing * 0.35, cy + 12, 6, 16);
    ctx.fillRect(cx + 8 - legSwing * 0.35, cy + 12, 6, 16);
  }

  // Body
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.ellipse(cx - 2, cy + 2, 20, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hump
  ctx.beginPath();
  ctx.arc(cx - 6, cy - 10, 10, Math.PI, Math.PI * 2);
  ctx.fill();

  // Long neck
  ctx.beginPath();
  ctx.moveTo(cx + 10, cy + 2);
  ctx.lineTo(cx + 20, cy - 14);
  ctx.lineTo(cx + 26, cy - 12);
  ctx.lineTo(cx + 16, cy + 8);
  ctx.closePath();
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.roundRect(cx + 18, cy - 22, 14, 10, 4);
  ctx.fill();

  // Eye
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx + 24, cy - 18, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx + 25, cy - 18, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Desert harness & scarf
  ctx.fillStyle = accessoryColor;
  ctx.fillRect(cx + 15, cy - 6, 8, 6);
  ctx.beginPath();
  ctx.moveTo(cx + 18, cy);
  ctx.lineTo(cx + 12, cy + 12);
  ctx.lineTo(cx + 20, cy + 8);
  ctx.closePath();
  ctx.fill();
}

function drawShepherd(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  accessoryColor: string,
  legSwing: number,
  state: string
) {
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 24, 18, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs / Trousers
  ctx.fillStyle = '#1e293b';
  if (state === 'slide') {
    ctx.fillRect(cx - 14, cy + 12, 28, 6);
  } else {
    ctx.fillRect(cx - 8 + legSwing * 0.4, cy + 12, 6, 14);
    ctx.fillRect(cx + 2 - legSwing * 0.4, cy + 12, 6, 14);
  }

  // Tunic / Vest
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.roundRect(cx - 10, cy - 4, 20, 18, 4);
  ctx.fill();

  // Head
  ctx.fillStyle = '#fed7aa'; // skin tone
  ctx.beginPath();
  ctx.arc(cx, cy - 12, 9, 0, Math.PI * 2);
  ctx.fill();

  // Black Peci / Songkok khas santri
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 9, cy - 22, 18, 7);

  // Eye & Smile
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx + 4, cy - 13, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(cx + 3, cy - 9, 3, 0.2, Math.PI * 0.8);
  ctx.stroke();

  // Shepherd staff (crook)
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx + 12, cy - 20);
  ctx.arc(cx + 8, cy - 20, 4, 0, Math.PI, true);
  ctx.lineTo(cx + 4, cy + 22);
  ctx.stroke();

  // Scarf / Sorban
  ctx.fillStyle = accessoryColor;
  ctx.fillRect(cx - 8, cy - 5, 16, 5);
  ctx.beginPath();
  ctx.moveTo(cx - 4, cy);
  ctx.lineTo(cx - 10, cy + 10);
  ctx.lineTo(cx - 2, cy + 7);
  ctx.closePath();
  ctx.fill();
}

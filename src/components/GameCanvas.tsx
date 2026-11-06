import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CharacterType, Question } from '../types/game';
import { drawCharacter } from '../utils/characterRenderer';
import { SoundSystem } from '../utils/audio';

interface GameCanvasProps {
  characterType: CharacterType;
  customCharacterName: string;
  accessoryColor: string;
  currentScore: number;
  onScoreChange: (newScore: number, delta: number) => void;
  onReachGate: (gateNumber: number, question: Question) => void;
  onFinishCourse: () => void;
  isPaused: boolean;
  questions: Question[];
  currentGateIndex: number;
  totalGates: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  vy: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  characterType,
  customCharacterName,
  accessoryColor,
  currentScore,
  onScoreChange,
  onReachGate,
  onFinishCourse,
  isPaused,
  questions,
  currentGateIndex,
  totalGates,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scoreRef = useRef(currentScore);
  useEffect(() => {
    scoreRef.current = currentScore;
  }, [currentScore]);

  // High score / game progression tracking
  const stateRef = useRef({
    player: {
      x: 120,
      y: 0,
      width: 50,
      height: 48,
      vx: 0,
      vy: 0,
      isGrounded: true,
      isSliding: false,
      slideTimer: 0,
      state: 'run' as 'run' | 'jump' | 'slide' | 'hurt',
      hurtTimer: 0,
    },
    cameraX: 0,
    cameraShake: 0,
    frame: 0,
    keys: {
      jump: false,
      slide: false,
    },
    obstacles: [] as {
      x: number;
      y: number;
      width: number;
      height: number;
      type: 'fence' | 'rock' | 'low_branch' | 'mud';
      hit: boolean;
    }[],
    collectibles: [] as {
      x: number;
      y: number;
      type: 'grass' | 'star' | 'water';
      value: number;
      collected: boolean;
    }[],
    gates: [] as {
      x: number;
      gateNumber: number;
      name: string;
      question: Question;
      passed: boolean;
    }[],
    particles: [] as Particle[],
    floatingTexts: [] as FloatingText[],
    courseLength: 7500,
    finishLineX: 7200,
    finished: false,
  });

  const [touchJumping, setTouchJumping] = useState(false);
  const [touchSliding, setTouchSliding] = useState(false);

  // Initialize course elements (Gates, Obstacles, Collectibles)
  useEffect(() => {
    const s = stateRef.current;
    s.obstacles = [];
    s.collectibles = [];
    s.gates = [];
    s.particles = [];
    s.floatingTexts = [];
    s.cameraX = 0;
    s.player.x = 120;
    s.finished = false;

    // Distribute gates along the course
    const gateSpacing = 1350;
    const gateNames = [
      'Pos 1: Gerbang Peternakan Barakah (Syarat Hewan)',
      'Pos 2: Tenda Musyawarah Syariat (Perbandingan)',
      'Pos 3: Lembah Kebaikan (Ketentuan Aqiqah)',
      'Pos 4: Padang Arafah & Idul Adha (Waktu Qurban)',
      'Pos 5: Gerbang Masjid Baiturrahman (Tata Cara & Hikmah)',
    ];

    for (let i = 0; i < totalGates; i++) {
      const gateX = 1100 + i * gateSpacing;
      const q = questions[i % questions.length];
      s.gates.push({
        x: gateX,
        gateNumber: i + 1,
        name: gateNames[i % gateNames.length],
        question: q,
        passed: false,
      });

      // Place obstacles between start and gate, and between gates
      const startSeg = i === 0 ? 350 : (1100 + (i - 1) * gateSpacing) + 200;
      const endSeg = gateX - 180;
      const numObstacles = 4 + i;

      for (let j = 0; j < numObstacles; j++) {
        const obsX = startSeg + ((endSeg - startSeg) / (numObstacles + 1)) * (j + 1) + (Math.random() * 40 - 20);
        const types: ('fence' | 'rock' | 'low_branch' | 'mud')[] = ['fence', 'rock', 'low_branch', 'mud'];
        const chosenType = types[Math.floor(Math.random() * types.length)];

        let width = 36;
        let height = 36;
        let yOffset = 0;

        if (chosenType === 'fence') {
          width = 32;
          height = 38;
        } else if (chosenType === 'rock') {
          width = 44;
          height = 32;
        } else if (chosenType === 'low_branch') {
          width = 54;
          height = 20;
          yOffset = 42; // Floating overhead: must slide under!
        } else if (chosenType === 'mud') {
          width = 60;
          height = 12;
        }

        s.obstacles.push({
          x: obsX,
          y: yOffset,
          width,
          height,
          type: chosenType,
          hit: false,
        });

        // Place collectibles near or above obstacles
        if (Math.random() > 0.3) {
          s.collectibles.push({
            x: obsX + (Math.random() * 80 - 40),
            y: chosenType === 'low_branch' ? 10 : 65 + Math.random() * 40,
            type: Math.random() > 0.5 ? 'grass' : Math.random() > 0.3 ? 'star' : 'water',
            value: 10,
            collected: false,
          });
        }
      }
    }
  }, [questions, totalGates]);

  // Jump trigger
  const triggerJump = useCallback(() => {
    const s = stateRef.current;
    if (s.player.isGrounded && !isPaused) {
      s.player.vy = -14;
      s.player.isGrounded = false;
      s.player.state = 'jump';
      s.player.isSliding = false;
      SoundSystem.playJump();

      // Jump dust particles
      for (let i = 0; i < 6; i++) {
        s.particles.push({
          x: s.player.x + 20,
          y: 0,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 3,
          color: '#cbd5e1',
          size: Math.random() * 4 + 2,
          life: 20,
          maxLife: 20,
        });
      }
    }
  }, [isPaused]);

  // Slide trigger
  const triggerSlide = useCallback(() => {
    const s = stateRef.current;
    if (s.player.isGrounded && !s.player.isSliding && !isPaused) {
      s.player.isSliding = true;
      s.player.slideTimer = 28;
      s.player.state = 'slide';
      SoundSystem.playSlide();

      // Slide spark/grass particles
      for (let i = 0; i < 5; i++) {
        s.particles.push({
          x: s.player.x + 10,
          y: 2,
          vx: -Math.random() * 4 - 2,
          vy: -Math.random() * 2,
          color: '#86efac',
          size: Math.random() * 3 + 2,
          life: 15,
          maxLife: 15,
        });
      }
    }
  }, [isPaused]);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;

      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        triggerJump();
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        triggerSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerJump, triggerSlide, isPaused]);

  // Canvas Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const groundY = () => canvas.height - 110;

    const loop = () => {
      const s = stateRef.current;
      const W = canvas.width;
      const H = canvas.height;
      const GY = groundY();

      if (!isPaused && !s.finished) {
        s.frame++;

        // Base run speed
        const baseSpeed = 4.8;
        s.player.x += baseSpeed;
        s.cameraX = s.player.x - 180;

        // Player physics
        if (!s.player.isGrounded) {
          s.player.vy += 0.72; // gravity
          s.player.y += s.player.vy;
          if (s.player.y >= 0) {
            s.player.y = 0;
            s.player.vy = 0;
            s.player.isGrounded = true;
            s.player.state = s.player.isSliding ? 'slide' : 'run';
          }
        }

        // Slide logic
        if (s.player.isSliding) {
          s.player.slideTimer--;
          if (s.player.slideTimer <= 0) {
            s.player.isSliding = false;
            if (s.player.isGrounded) {
              s.player.state = 'run';
            }
          }
        }

        // Hurt timer logic
        if (s.player.hurtTimer > 0) {
          s.player.hurtTimer--;
          if (s.player.hurtTimer === 0 && s.player.isGrounded && !s.player.isSliding) {
            s.player.state = 'run';
          }
        }

        // Decay camera shake
        if (s.cameraShake > 0) {
          s.cameraShake *= 0.88;
          if (s.cameraShake < 0.2) s.cameraShake = 0;
        }

        // Check Gates
        for (const gate of s.gates) {
          if (!gate.passed && s.player.x >= gate.x) {
            gate.passed = true;
            SoundSystem.playGate();
            onReachGate(gate.gateNumber, gate.question);
            break;
          }
        }

        // Check Finish Line
        if (!s.finished && s.player.x >= s.finishLineX) {
          s.finished = true;
          SoundSystem.playVictory();
          onFinishCourse();
        }

        // Check Collectibles
        for (const col of s.collectibles) {
          if (!col.collected) {
            const playerBox = {
              x: s.player.x,
              y: GY - s.player.y - s.player.height,
              w: s.player.width,
              h: s.player.height,
            };
            const colBox = {
              x: col.x,
              y: GY - col.y - 20,
              w: 24,
              h: 24,
            };

            if (
              playerBox.x < colBox.x + colBox.w &&
              playerBox.x + playerBox.w > colBox.x &&
              playerBox.y < colBox.y + colBox.h &&
              playerBox.y + playerBox.h > colBox.y
            ) {
              col.collected = true;
              SoundSystem.playCollect();
              const nextScore = scoreRef.current + col.value;
              scoreRef.current = nextScore;
              onScoreChange(nextScore, col.value);

              s.floatingTexts.push({
                x: col.x - s.cameraX,
                y: GY - col.y - 20,
                text: `+${col.value}`,
                color: col.type === 'star' ? '#f59e0b' : '#22c55e',
                life: 30,
                vy: -1.8,
              });

              // Sparkles
              for (let k = 0; k < 6; k++) {
                s.particles.push({
                  x: col.x,
                  y: GY - col.y,
                  vx: (Math.random() - 0.5) * 3,
                  vy: -Math.random() * 3,
                  color: col.type === 'star' ? '#fde047' : '#86efac',
                  size: Math.random() * 3 + 2,
                  life: 18,
                  maxLife: 18,
                });
              }
            }
          }
        }

        // Check Obstacles
        for (const obs of s.obstacles) {
          if (!obs.hit) {
            // Player collision box depends on sliding
            const pH = s.player.isSliding ? 24 : s.player.height;
            const pY = GY - s.player.y - pH;
            const pX = s.player.x;
            const pW = s.player.width;

            let obsY = GY - obs.height;
            if (obs.type === 'low_branch') {
              obsY = GY - obs.y - obs.height;
            }

            if (
              pX + pW > obs.x &&
              pX < obs.x + obs.width &&
              pY + pH > obsY &&
              pY < obsY + obs.height
            ) {
              obs.hit = true;
              s.cameraShake = 9;
              s.player.hurtTimer = 22;
              s.player.state = 'hurt';
              SoundSystem.playHitObstacle();

              // Obstacle impact reduces small penalty (e.g., -10 or stagger)
              const penalty = obs.type === 'mud' ? 5 : 10;
              const newScore = Math.max(0, scoreRef.current - penalty);
              scoreRef.current = newScore;
              onScoreChange(newScore, -penalty);

              s.floatingTexts.push({
                x: s.player.x - s.cameraX + 20,
                y: pY - 10,
                text: `-${penalty} Rintangan!`,
                color: '#ef4444',
                life: 35,
                vy: -1.5,
              });

              // Impact particles
              for (let k = 0; k < 8; k++) {
                s.particles.push({
                  x: obs.x + obs.width / 2,
                  y: obsY + obs.height / 2,
                  vx: (Math.random() - 0.5) * 5,
                  vy: -Math.random() * 4,
                  color: obs.type === 'mud' ? '#78350f' : '#cbd5e1',
                  size: Math.random() * 4 + 2,
                  life: 20,
                  maxLife: 20,
                });
              }
            }
          }
        }

        // Update particles
        for (let i = s.particles.length - 1; i >= 0; i--) {
          const p = s.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          if (p.life <= 0) s.particles.splice(i, 1);
        }

        // Update floating texts
        for (let i = s.floatingTexts.length - 1; i >= 0; i--) {
          const ft = s.floatingTexts[i];
          ft.y += ft.vy;
          ft.life--;
          if (ft.life <= 0) s.floatingTexts.splice(i, 1);
        }
      }

      // --- RENDERING CANVAS ---
      ctx.save();

      // Camera Shake
      if (s.cameraShake > 0) {
        const shakeX = (Math.random() - 0.5) * s.cameraShake;
        const shakeY = (Math.random() - 0.5) * s.cameraShake;
        ctx.translate(shakeX, shakeY);
      }

      // 1. SKY GRADIENT (Bright scenic morning sun over oasis & hills)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, GY);
      skyGrad.addColorStop(0, '#38bdf8'); // sky blue
      skyGrad.addColorStop(0.55, '#bae6fd');
      skyGrad.addColorStop(0.85, '#fef08a'); // golden dawn
      skyGrad.addColorStop(1, '#fed7aa');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // Sun
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(W * 0.78, 90, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(254, 240, 138, 0.35)';
      ctx.beginPath();
      ctx.arc(W * 0.78, 90, 58, 0, Math.PI * 2);
      ctx.fill();

      // 2. PARALLAX DISTANT MOUNTAINS & MOSQUE SILHOUETTES
      drawMountainsAndMosque(ctx, W, GY, s.cameraX * 0.15);

      // 3. PARALLAX MID-GROUND HILLS & DATE PALMS
      drawHillsAndPalms(ctx, W, GY, s.cameraX * 0.45);

      // 4. FOREGROUND GROUND & PATHWAY
      drawForeground(ctx, W, H, GY, s.cameraX);

      // 5. GATES
      for (const gate of s.gates) {
        drawGate(ctx, gate.x - s.cameraX, GY, gate.gateNumber, gate.name, gate.passed);
      }

      // Finish Line Arch
      drawFinishArch(ctx, s.finishLineX - s.cameraX, GY);

      // 6. OBSTACLES
      for (const obs of s.obstacles) {
        const screenX = obs.x - s.cameraX;
        if (screenX > -100 && screenX < W + 100) {
          drawObstacle(ctx, screenX, GY, obs);
        }
      }

      // 7. COLLECTIBLES
      for (const col of s.collectibles) {
        if (!col.collected) {
          const screenX = col.x - s.cameraX;
          if (screenX > -60 && screenX < W + 60) {
            drawCollectible(ctx, screenX, GY - col.y, col.type, s.frame);
          }
        }
      }

      // 8. PARTICLES
      for (const p of s.particles) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x - s.cameraX, GY - p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 9. PLAYER
      const playerScreenX = s.player.x - s.cameraX;
      const playerScreenY = GY - s.player.y - s.player.height;
      drawCharacter({
        ctx,
        x: playerScreenX,
        y: playerScreenY,
        width: s.player.width,
        height: s.player.height,
        characterType,
        customName: customCharacterName,
        accessoryColor,
        state: s.player.state,
        frame: s.frame,
      });

      // 10. FLOATING TEXTS (+100, -50, etc.)
      for (const ft of s.floatingTexts) {
        ctx.save();
        ctx.font = 'bold 20px "Fredoka", "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = ft.color;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        ctx.textAlign = 'center';
        ctx.globalAlpha = Math.min(1, ft.life / 20);
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      }

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [
    characterType,
    customCharacterName,
    accessoryColor,
    isPaused,
    onScoreChange,
    onReachGate,
    onFinishCourse,
  ]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden select-none">
      {/* 60fps Game Viewport Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* On-Screen Touch Controls (optimized for Chromebooks, Tablets, and Mobile) */}
      <div className="absolute inset-x-0 bottom-4 pointer-events-none px-6 flex justify-between items-end z-20">
        {/* Slide Button */}
        <button
          type="button"
          onPointerDown={() => {
            setTouchSliding(true);
            triggerSlide();
          }}
          onPointerUp={() => setTouchSliding(false)}
          className={`pointer-events-auto flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-amber-500/90 hover:bg-amber-500 active:scale-95 text-white font-fun font-bold shadow-xl border-4 border-amber-300 transition-transform ${
            touchSliding ? 'scale-95 bg-amber-600' : ''
          }`}
          title="Tombol Meluncur / Tunduk (S atau Panah Bawah)"
        >
          <svg className="w-7 h-7 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs md:text-sm tracking-wide">LUNCUR</span>
        </button>

        {/* Jump Button */}
        <button
          type="button"
          onPointerDown={() => {
            setTouchJumping(true);
            triggerJump();
          }}
          onPointerUp={() => setTouchJumping(false)}
          className={`pointer-events-auto flex flex-col items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-emerald-600/95 hover:bg-emerald-600 active:scale-95 text-white font-fun font-bold shadow-2xl border-4 border-emerald-300 transition-transform ${
            touchJumping ? 'scale-95 bg-emerald-700' : ''
          }`}
          title="Tombol Lompat (Spasi, W, atau Panah Atas)"
        >
          <svg className="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-sm md:text-base tracking-wide">LOMPAT!</span>
        </button>
      </div>

      {/* Keyboard Hint banner */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-900/60 backdrop-blur-xs text-white/90 text-xs px-4 py-1.5 rounded-full pointer-events-none hidden md:flex items-center gap-2 border border-white/20">
        <span className="font-semibold text-emerald-300">SPASI / W / ↑</span> Lompat
        <span className="text-white/40">•</span>
        <span className="font-semibold text-amber-300">S / ↓</span> Meluncur
        <span className="text-white/40">•</span>
        <span>Hindari Rintangan &amp; Raih Poin di Pos Soal!</span>
      </div>
    </div>
  );
};

// Canvas Drawing Helpers:

function drawMountainsAndMosque(ctx: CanvasRenderingContext2D, W: number, GY: number, camOffset: number) {
  ctx.save();
  ctx.fillStyle = '#93c5fd'; // soft blue purple mountain
  ctx.beginPath();
  ctx.moveTo(0, GY);

  const mountainWidth = 320;
  const startX = -(camOffset % mountainWidth) - mountainWidth;

  for (let x = startX; x < W + mountainWidth * 2; x += mountainWidth) {
    ctx.lineTo(x, GY - 90);
    ctx.lineTo(x + 120, GY - 170);
    ctx.lineTo(x + 220, GY - 110);
    ctx.lineTo(x + mountainWidth, GY - 90);
  }
  ctx.lineTo(W, GY);
  ctx.closePath();
  ctx.fill();

  // Distant Golden Dome / Minarets
  ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
  for (let x = startX + 150; x < W + mountainWidth * 2; x += mountainWidth * 1.5) {
    // Dome
    ctx.beginPath();
    ctx.arc(x, GY - 115, 20, Math.PI, 0);
    ctx.fill();
    // Minaret tower
    ctx.fillRect(x - 28, GY - 145, 8, 45);
    ctx.beginPath();
    ctx.moveTo(x - 28, GY - 145);
    ctx.lineTo(x - 24, GY - 162);
    ctx.lineTo(x - 20, GY - 145);
    ctx.fill();
  }
  ctx.restore();
}

function drawHillsAndPalms(ctx: CanvasRenderingContext2D, W: number, GY: number, camOffset: number) {
  ctx.save();
  ctx.fillStyle = '#86efac'; // soft green mid-hill
  ctx.beginPath();
  ctx.moveTo(0, GY);

  const hillWidth = 420;
  const startX = -(camOffset % hillWidth) - hillWidth;

  for (let x = startX; x < W + hillWidth * 2; x += hillWidth) {
    ctx.quadraticCurveTo(x + hillWidth * 0.5, GY - 80, x + hillWidth, GY - 20);
  }
  ctx.lineTo(W, GY);
  ctx.closePath();
  ctx.fill();

  // Draw Date Palms on hills
  for (let x = startX + 80; x < W + hillWidth * 2; x += 190) {
    drawPalmTree(ctx, x, GY - 30);
  }
  ctx.restore();
}

function drawPalmTree(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  // Trunk
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x - 4, y - 25, x + 2, y - 50);
  ctx.stroke();

  // Fronds
  ctx.strokeStyle = '#15803d';
  ctx.lineWidth = 3.5;
  const fronds = [
    { dx: -24, dy: -6 },
    { dx: -18, dy: -18 },
    { dx: 18, dy: -18 },
    { dx: 24, dy: -6 },
    { dx: 0, dy: -24 },
  ];
  fronds.forEach((f) => {
    ctx.beginPath();
    ctx.moveTo(x + 2, y - 50);
    ctx.quadraticCurveTo(x + f.dx * 0.5, y - 50 + f.dy * 0.4, x + f.dx, y - 50 + f.dy);
    ctx.stroke();
  });
  ctx.restore();
}

function drawForeground(ctx: CanvasRenderingContext2D, W: number, H: number, GY: number, camOffset: number) {
  ctx.save();
  // Main Grass Ground
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(0, GY, W, 22);

  // Soil / Path layer
  const soilGrad = ctx.createLinearGradient(0, GY + 22, 0, H);
  soilGrad.addColorStop(0, '#ca8a04');
  soilGrad.addColorStop(1, '#854d0e');
  ctx.fillStyle = soilGrad;
  ctx.fillRect(0, GY + 22, W, H - (GY + 22));

  // Grass tufts pattern
  ctx.fillStyle = '#15803d';
  const tuftSpacing = 65;
  const startTuft = -(camOffset % tuftSpacing);
  for (let tx = startTuft; tx < W; tx += tuftSpacing) {
    ctx.beginPath();
    ctx.moveTo(tx, GY);
    ctx.lineTo(tx + 4, GY - 7);
    ctx.lineTo(tx + 8, GY);
    ctx.fill();
  }

  // Cobblestone stones on the pathway
  ctx.fillStyle = '#a16207';
  const stoneSpacing = 110;
  const startStone = -(camOffset % stoneSpacing);
  for (let sx = startStone; sx < W; sx += stoneSpacing) {
    ctx.beginPath();
    ctx.ellipse(sx, GY + 32, 12, 6, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(sx + 45, GY + 55, 16, 7, -0.1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawObstacle(
  ctx: CanvasRenderingContext2D,
  x: number,
  GY: number,
  obs: { width: number; height: number; type: string; hit: boolean; y: number }
) {
  ctx.save();
  const y = obs.type === 'low_branch' ? GY - obs.y - obs.height : GY - obs.height;

  if (obs.type === 'fence') {
    // Wooden farm fence
    ctx.fillStyle = '#b45309';
    // Vertical posts
    ctx.fillRect(x + 2, y, 7, obs.height);
    ctx.fillRect(x + obs.width - 9, y, 7, obs.height);
    // Horizontal slats
    ctx.fillStyle = '#d97706';
    ctx.fillRect(x, y + 8, obs.width, 6);
    ctx.fillRect(x, y + 22, obs.width, 6);
  } else if (obs.type === 'rock') {
    // Rocky boulder
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(x + 6, y + obs.height);
    ctx.lineTo(x + obs.width * 0.3, y + 4);
    ctx.lineTo(x + obs.width * 0.8, y);
    ctx.lineTo(x + obs.width, y + obs.height);
    ctx.closePath();
    ctx.fill();

    // Rock highlights
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(x + 12, y + obs.height - 4);
    ctx.lineTo(x + obs.width * 0.35, y + 8);
    ctx.lineTo(x + obs.width * 0.6, y + 12);
    ctx.fill();
  } else if (obs.type === 'low_branch') {
    // Overhanging palm branch / flying banner (must slide under!)
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x - 10, y + 4, obs.width + 20, 6);

    ctx.fillStyle = '#15803d';
    // Hanging foliage
    for (let bx = 0; bx < obs.width; bx += 10) {
      ctx.beginPath();
      ctx.moveTo(x + bx, y + 6);
      ctx.lineTo(x + bx + 5, y + obs.height);
      ctx.lineTo(x + bx + 10, y + 6);
      ctx.fill();
    }

    // Warning sign: "TUNDUK / LUNCUR"
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(x + obs.width / 2 - 18, y - 18, 36, 16, 4);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LUNCUR!', x + obs.width / 2, y - 6);
  } else if (obs.type === 'mud') {
    // Mud puddle
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(x + obs.width / 2, GY - 2, obs.width / 2, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.ellipse(x + obs.width / 2 - 6, GY - 2, obs.width / 4, 4, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawCollectible(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  type: 'grass' | 'star' | 'water',
  frame: number
) {
  ctx.save();
  const floatOffset = Math.sin(frame * 0.1) * 4;
  const cy = y + floatOffset;

  if (type === 'grass') {
    // Rumput Segar Hijauan Makanan Hewan Ternak
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(x, cy, 11, 7, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.ellipse(x + 4, cy - 2, 10, 5, 0.3, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'star') {
    // Bintang Berkah Emas
    ctx.fillStyle = '#f59e0b';
    ctx.save();
    ctx.translate(x, cy);
    ctx.rotate(frame * 0.05);
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * 11, -Math.sin(((18 + i * 72) * Math.PI) / 180) * 11);
      ctx.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * 5, -Math.sin(((54 + i * 72) * Math.PI) / 180) * 5);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  } else {
    // Kendi Air Zamzam Segar
    ctx.fillStyle = '#0ea5e9';
    ctx.beginPath();
    ctx.arc(x, cy, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e0f2fe';
    ctx.beginPath();
    ctx.arc(x - 2, cy - 2, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawGate(
  ctx: CanvasRenderingContext2D,
  x: number,
  GY: number,
  gateNum: number,
  gateName: string,
  passed: boolean
) {
  ctx.save();
  const archW = 110;
  const archH = 160;

  // Pillars
  ctx.fillStyle = passed ? '#10b981' : '#0284c7';
  ctx.fillRect(x - archW / 2, GY - archH, 16, archH);
  ctx.fillRect(x + archW / 2 - 16, GY - archH, 16, archH);

  // Arch Beam
  ctx.beginPath();
  ctx.roundRect(x - archW / 2 - 6, GY - archH - 24, archW + 12, 28, 8);
  ctx.fill();

  // Islamic Crescent / Star Finial
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(x, GY - archH - 32, 10, 0, Math.PI * 2);
  ctx.fill();

  // Banner Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px "Fredoka", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`POS ${gateNum}`, x, GY - archH - 6);

  // Status badge
  ctx.fillStyle = passed ? '#059669' : '#eab308';
  ctx.beginPath();
  ctx.roundRect(x - 36, GY - archH + 16, 72, 22, 6);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(passed ? 'SELESAI ✓' : 'KUIS BERKAH', x, GY - archH + 31);

  ctx.restore();
}

function drawFinishArch(ctx: CanvasRenderingContext2D, x: number, GY: number) {
  ctx.save();
  const archW = 140;
  const archH = 175;

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(x - archW / 2, GY - archH, 20, archH);
  ctx.fillRect(x + archW / 2 - 20, GY - archH, 20, archH);

  // Finish Header
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(x - archW / 2 - 8, GY - archH - 30, archW + 16, 36);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px "Fredoka", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GARIS AKHIR BARAKAH', x, GY - archH - 8);

  ctx.restore();
}

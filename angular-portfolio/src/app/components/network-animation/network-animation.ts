import { Component, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-network-animation',
  templateUrl: './network-animation.html',
  styleUrls: ['./network-animation.scss'],
  standalone: true
})
export class NetworkAnimationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('networkCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;
  private resizeObserver!: ResizeObserver;
  
  // Animation constants
  private readonly PARTICLE_COUNT = 36;
  private readonly PARTICLE_RADIUS = 2;
  private readonly CONNECT_DISTANCE = 66;
  private readonly HEART_SCALE = 6;
  private readonly ROTATE_RADIUS = 90;
  private readonly LOOP_DURATION = 6000;
  
  private particles: Array<{
    baseAngle: number;
    radiusOffset: number;
    speedOffset: number;
  }> = [];
  
  private heartPath: Array<{x: number; y: number}> = [];

  ngOnInit() {
    this.initializeParticles();
    this.generateHeartPath();
  }

  ngAfterViewInit() {
    this.setupCanvas();
    this.setupResizeObserver();
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
    });
    this.resizeObserver.observe(this.canvasRef.nativeElement.parentElement!);
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement!;
    const rect = parent.getBoundingClientRect();
    
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  private initializeParticles() {
    this.particles = Array.from({ length: this.PARTICLE_COUNT }, (_, i) => {
      const angle = (2 * Math.PI * i) / this.PARTICLE_COUNT;
      return {
        baseAngle: angle,
        radiusOffset: Math.random() * 20,
        speedOffset: Math.random(),
      };
    });
  }

  private generateHeartPath() {
    this.heartPath = Array.from({ length: this.PARTICLE_COUNT }, (_, i) =>
      this.getHeartPoint((Math.PI * 2 * i) / this.PARTICLE_COUNT, this.HEART_SCALE)
    );
  }

  private easeInOutSine(t: number): number {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }

  private getHeartPoint(t: number, scale: number = 1): {x: number; y: number} {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return {
      x: x * scale,
      y: -y * scale
    };
  }

  private interpolate(p1: {x: number; y: number}, p2: {x: number; y: number}, t: number): {x: number; y: number} {
    return {
      x: p1.x * (1 - t) + p2.x * t,
      y: p1.y * (1 - t) + p2.y * t,
    };
  }

  private getCenterX(): number {
    return this.canvasRef.nativeElement.width / 2;
  }

  private getCenterY(): number {
    return this.canvasRef.nativeElement.height / 2;
  }

  private startAnimation() {
    const animate = (time: number) => {
      this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

      const tRaw = (time % this.LOOP_DURATION) / this.LOOP_DURATION;
      const t = this.easeInOutSine(tRaw);

      let positions: Array<{x: number; y: number}> = [];

      // Generate chaos positions
      const chaosPositions = this.particles.map(p => {
        const angle = p.baseAngle + time * 0.001 + p.speedOffset;
        const r = this.ROTATE_RADIUS + Math.sin(time * 0.002 + p.speedOffset * 10) * 30;
        return {
          x: this.getCenterX() + Math.cos(angle) * r,
          y: this.getCenterY() + Math.sin(angle) * r
        };
      });

      // Generate heart positions
      const heartPositions = this.heartPath.map((p) => {
        return {
          x: this.getCenterX() + p.x,
          y: this.getCenterY() + p.y
        };
      });

      // Calculate transitions
      const transitionToHeart = this.easeInOutSine(Math.min(Math.max((t - 0.6) / 0.15, 0), 1));
      const transitionFromHeart = this.easeInOutSine(Math.min(Math.max((t - 0.9) / 0.1, 0), 1));

      if (t < 0.6) {
        positions = chaosPositions;
      } else if (t < 0.75) {
        positions = chaosPositions.map((p, i) => 
          this.interpolate(p, heartPositions[i], transitionToHeart)
        );
      } else if (t < 0.9) {
        // Heart shape with subtle movement
        positions = this.heartPath.map((p, i) => {
          const wobble = Math.sin(time * 0.003 + i) * 1.5;
          return {
            x: this.getCenterX() + p.x + Math.cos(i) * wobble,
            y: this.getCenterY() + p.y + Math.sin(i) * wobble
          };
        });
      } else {
        positions = heartPositions.map((p, i) => 
          this.interpolate(p, chaosPositions[i], transitionFromHeart)
        );
      }

      this.drawConnections(positions);
      this.drawParticles(positions);

      this.animationId = requestAnimationFrame(animate);
    };

    animate(0);
  }

  private drawConnections(positions: Array<{x: number; y: number}>) {
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < this.PARTICLE_COUNT; j++) {
        const a = positions[i];
        const b = positions[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.CONNECT_DISTANCE) {
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(78, 205, 196, ${1 - dist / this.CONNECT_DISTANCE})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }

  private drawParticles(positions: Array<{x: number; y: number}>) {
    this.ctx.shadowColor = '#4ecdc4';
    this.ctx.shadowBlur = 4;
    
    positions.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, this.PARTICLE_RADIUS, 0, Math.PI * 2);
      this.ctx.fillStyle = '#4ecdc4';
      this.ctx.fill();
    });
    
    this.ctx.shadowBlur = 0;
  }
} 
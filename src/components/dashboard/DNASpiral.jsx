import { useEffect, useRef } from "react";

export default function DNASpiral() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrame;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const amplitude = width * 0.28;
      const numNodes = 16;
      const spacing = height / (numNodes - 1);

      // Draw connecting rungs first
      for (let i = 0; i < numNodes; i++) {
        const y = i * spacing;
        const phase = (i / numNodes) * Math.PI * 4 + t;
        const x1 = cx + Math.sin(phase) * amplitude;
        const x2 = cx + Math.sin(phase + Math.PI) * amplitude;
        const alpha = 0.15 + 0.1 * Math.sin(phase);
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw strand 1
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const y = (i / 200) * height;
        const phase = (i / 200) * Math.PI * 4 + t;
        const x = cx + Math.sin(phase) * amplitude;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const grad1 = ctx.createLinearGradient(0, 0, 0, height);
      grad1.addColorStop(0, "rgba(20,184,166,0.9)");
      grad1.addColorStop(0.5, "rgba(16,185,129,0.9)");
      grad1.addColorStop(1, "rgba(20,184,166,0.9)");
      ctx.strokeStyle = grad1;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Draw strand 2
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const y = (i / 200) * height;
        const phase = (i / 200) * Math.PI * 4 + t + Math.PI;
        const x = cx + Math.sin(phase) * amplitude;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const grad2 = ctx.createLinearGradient(0, 0, 0, height);
      grad2.addColorStop(0, "rgba(56,189,248,0.9)");
      grad2.addColorStop(0.5, "rgba(99,102,241,0.9)");
      grad2.addColorStop(1, "rgba(56,189,248,0.9)");
      ctx.strokeStyle = grad2;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Draw node dots
      for (let i = 0; i < numNodes; i++) {
        const y = i * spacing;
        const phase = (i / numNodes) * Math.PI * 4 + t;

        [0, Math.PI].forEach((offset, idx) => {
          const x = cx + Math.sin(phase + offset) * amplitude;
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 7);
          glow.addColorStop(0, idx === 0 ? "rgba(20,184,166,1)" : "rgba(99,102,241,1)");
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        });
      }

      t += 0.018;
      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
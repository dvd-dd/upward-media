"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const GAP = 1.015;
const PRIMARY = "#00D4AA";
const ACCENT = "#8B5CF6";

type Axis = "x" | "y" | "z";

interface MoveState {
  active: boolean;
  elapsed: number;
  duration: number;
  nextIn: number;
  axis: Axis;
  target: number;
}

const STICKER_SIZE = 0.91;
const STICKER_OFFSET = 0.502;

interface TextureSet {
  color: THREE.Texture;
  normal: THREE.Texture;
  rough: THREE.Texture;
}

function TexturedFaces({ tex, isLight }: { tex: TextureSet | null; isLight: boolean }) {
  const faces: { pos: [number, number, number]; rot: [number, number, number] }[] = [
    { pos: [0, 0, STICKER_OFFSET], rot: [0, 0, 0] },
    { pos: [0, 0, -STICKER_OFFSET], rot: [0, Math.PI, 0] },
    { pos: [STICKER_OFFSET, 0, 0], rot: [0, Math.PI / 2, 0] },
    { pos: [-STICKER_OFFSET, 0, 0], rot: [0, -Math.PI / 2, 0] },
    { pos: [0, STICKER_OFFSET, 0], rot: [-Math.PI / 2, 0, 0] },
    { pos: [0, -STICKER_OFFSET, 0], rot: [Math.PI / 2, 0, 0] },
  ];
  return (
    <>
      {faces.map((f, i) => (
        <mesh key={i} position={f.pos} rotation={f.rot}>
          <planeGeometry args={[STICKER_SIZE, STICKER_SIZE]} />
          {tex ? (
            isLight ? (
              <meshPhysicalMaterial
                color="#e4e4ea"
                roughness={0.7}
                metalness={0}
                normalMap={tex.normal}
                normalScale={new THREE.Vector2(2.2, 2.2)}
                roughnessMap={tex.rough}
                clearcoat={0.25}
                clearcoatRoughness={0.45}
                envMapIntensity={0.35}
              />
            ) : (
              <meshPhysicalMaterial
                map={tex.color}
                color="#3a3a42"
                roughness={0.62}
                metalness={0}
                normalMap={tex.normal}
                normalScale={new THREE.Vector2(2.8, 2.8)}
                roughnessMap={tex.rough}
                clearcoat={0.35}
                clearcoatRoughness={0.4}
                envMapIntensity={0.3}
              />
            )
          ) : isLight ? (
            <meshPhysicalMaterial
              color="#ececf2"
              roughness={0.55}
              metalness={0}
              clearcoat={0.3}
              clearcoatRoughness={0.35}
              envMapIntensity={0.3}
              reflectivity={0.2}
            />
          ) : (
            <meshPhysicalMaterial
              color="#030407"
              roughness={0.55}
              metalness={0}
              clearcoat={0.35}
              clearcoatRoughness={0.3}
              envMapIntensity={0.2}
              reflectivity={0.18}
            />
          )}
        </mesh>
      ))}
    </>
  );
}

function Cube({ isLight }: { isLight: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const pivotRef = useRef<THREE.Group>(new THREE.Group());
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  const move = useRef<MoveState>({
    active: false,
    elapsed: 0,
    duration: 0.45,
    nextIn: 0.45,
    axis: "y",
    target: Math.PI / 2,
  });

  /* Build 3x3x3 grid of small cubes */
  const cubes = useMemo(() => {
    const items: { position: [number, number, number]; key: string }[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          items.push({
            position: [x * GAP, y * GAP, z * GAP],
            key: `${x}${y}${z}`,
          });
        }
      }
    }
    return items;
  }, []);

  /* Procedural textures — 3 variants (carbon weave, perforated dots, brushed). */
  const textures = useMemo(() => {
    const size = 512;
    const makeCanvasTex = (
      draw: (ctx: CanvasRenderingContext2D) => void,
      isColor = false
    ) => {
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d")!;
      draw(ctx);
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1.5, 1.5);
      tex.anisotropy = 16;
      if (isColor) tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      return tex;
    };

    /* HEX (carbon weave look) */
    const hexRadius = 22;
    const hexW = hexRadius * Math.sqrt(3);
    const hexH = hexRadius * 1.5;
    const drawHex = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number
    ) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        const px = cx + r * Math.cos(a);
        const py = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };
    const forEachHex = (cb: (cx: number, cy: number) => void) => {
      for (let row = -2; row * hexH < size + hexH * 2; row++) {
        const offset = row % 2 === 0 ? 0 : hexW / 2;
        for (let col = -2; col * hexW < size + hexW * 2; col++) {
          cb(col * hexW + offset, row * hexH);
        }
      }
    };

    const hexNormal = makeCanvasTex((ctx) => {
      ctx.fillStyle = "rgb(128,128,255)";
      ctx.fillRect(0, 0, size, size);
      forEachHex((cx, cy) => {
        const grad = ctx.createRadialGradient(
          cx - hexRadius * 0.5,
          cy - hexRadius * 0.5,
          0,
          cx,
          cy,
          hexRadius * 1.2
        );
        grad.addColorStop(0, "rgba(230,200,255,1)");
        grad.addColorStop(0.45, "rgba(160,140,255,0.9)");
        grad.addColorStop(1, "rgba(30,60,255,0)");
        ctx.fillStyle = grad;
        drawHex(ctx, cx, cy, hexRadius - 0.6);
        ctx.fill();
        ctx.strokeStyle = "rgba(20,50,255,1)";
        ctx.lineWidth = 3.2;
        drawHex(ctx, cx, cy, hexRadius - 0.6);
        ctx.stroke();
      });
    });
    const hexRough = makeCanvasTex((ctx) => {
      ctx.fillStyle = "rgb(170,170,170)";
      ctx.fillRect(0, 0, size, size);
      forEachHex((cx, cy) => {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, hexRadius);
        grad.addColorStop(0, "rgba(40,40,40,1)");
        grad.addColorStop(0.75, "rgba(70,70,70,0.85)");
        grad.addColorStop(1, "rgba(170,170,170,0)");
        ctx.fillStyle = grad;
        drawHex(ctx, cx, cy, hexRadius - 0.6);
        ctx.fill();
      });
    });
    const hexColor = makeCanvasTex((ctx) => {
      ctx.fillStyle = "rgb(2,3,6)";
      ctx.fillRect(0, 0, size, size);
      forEachHex((cx, cy) => {
        const grad = ctx.createRadialGradient(
          cx - hexRadius * 0.4,
          cy - hexRadius * 0.4,
          0,
          cx,
          cy,
          hexRadius
        );
        grad.addColorStop(0, "rgba(70,72,84,1)");
        grad.addColorStop(0.55, "rgba(28,30,40,1)");
        grad.addColorStop(1, "rgba(4,5,9,1)");
        ctx.fillStyle = grad;
        drawHex(ctx, cx, cy, hexRadius - 0.6);
        ctx.fill();
      });
    }, true);

    /* DOTS (perforated mesh) */
    const dotStep = 14;
    const dotRadius = 4.8;
    const forEachDot = (cb: (cx: number, cy: number) => void) => {
      for (let row = 0; row * dotStep < size + dotStep; row++) {
        const offset = row % 2 === 0 ? 0 : dotStep / 2;
        for (let col = 0; col * dotStep < size + dotStep; col++) {
          cb(col * dotStep + offset, row * dotStep);
        }
      }
    };
    const dotNormal = makeCanvasTex((ctx) => {
      ctx.fillStyle = "rgb(128,128,255)";
      ctx.fillRect(0, 0, size, size);
      forEachDot((cx, cy) => {
        const grad = ctx.createRadialGradient(
          cx - 1.4,
          cy - 1.4,
          0,
          cx,
          cy,
          dotRadius
        );
        grad.addColorStop(0, "rgba(220,200,255,1)");
        grad.addColorStop(0.6, "rgba(150,140,255,0.65)");
        grad.addColorStop(1, "rgba(60,90,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    });
    const dotRough = makeCanvasTex((ctx) => {
      ctx.fillStyle = "rgb(150,150,150)";
      ctx.fillRect(0, 0, size, size);
      forEachDot((cx, cy) => {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dotRadius);
        grad.addColorStop(0, "rgba(35,35,35,0.95)");
        grad.addColorStop(1, "rgba(150,150,150,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    });
    const dotColor = makeCanvasTex((ctx) => {
      ctx.fillStyle = "rgb(4,5,8)";
      ctx.fillRect(0, 0, size, size);
      forEachDot((cx, cy) => {
        const grad = ctx.createRadialGradient(
          cx - 1,
          cy - 1,
          0,
          cx,
          cy,
          dotRadius
        );
        grad.addColorStop(0, "rgba(64,66,80,1)");
        grad.addColorStop(0.6, "rgba(22,24,32,1)");
        grad.addColorStop(1, "rgba(4,5,8,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    }, true);

    /* BRUSHED (diagonal metal strokes) */
    const brushedNormal = makeCanvasTex((ctx) => {
      ctx.fillStyle = "rgb(128,128,255)";
      ctx.fillRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(-Math.PI / 12);
      ctx.translate(-size / 2, -size / 2);
      for (let i = 0; i < 950; i++) {
        const y = Math.random() * size;
        const len = 60 + Math.random() * 380;
        const x = Math.random() * size;
        const shade = 90 + Math.floor(Math.random() * 80);
        ctx.strokeStyle = `rgba(${shade},128,255,${0.45 + Math.random() * 0.5})`;
        ctx.lineWidth = 0.4 + Math.random() * 1.8;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + len, y);
        ctx.stroke();
      }
      ctx.restore();
    });
    const brushedRough = makeCanvasTex((ctx) => {
      ctx.fillStyle = "rgb(95,95,95)";
      ctx.fillRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(-Math.PI / 12);
      ctx.translate(-size / 2, -size / 2);
      for (let i = 0; i < 750; i++) {
        const y = Math.random() * size;
        const len = 50 + Math.random() * 350;
        const x = Math.random() * size;
        const v = 40 + Math.floor(Math.random() * 60);
        ctx.strokeStyle = `rgba(${v},${v},${v},${0.4 + Math.random() * 0.5})`;
        ctx.lineWidth = 0.5 + Math.random() * 1.6;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + len, y);
        ctx.stroke();
      }
      ctx.restore();
    });
    const brushedColor = makeCanvasTex((ctx) => {
      ctx.fillStyle = "rgb(7,8,12)";
      ctx.fillRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(-Math.PI / 12);
      ctx.translate(-size / 2, -size / 2);
      for (let i = 0; i < 800; i++) {
        const y = Math.random() * size;
        const len = 60 + Math.random() * 360;
        const x = Math.random() * size;
        const v = 28 + Math.floor(Math.random() * 38);
        ctx.strokeStyle = `rgba(${v},${v},${v + 5},${0.35 + Math.random() * 0.45})`;
        ctx.lineWidth = 0.5 + Math.random() * 1.4;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + len, y);
        ctx.stroke();
      }
      ctx.restore();
    }, true);

    return {
      hex: { color: hexColor, normal: hexNormal, rough: hexRough },
      dots: { color: dotColor, normal: dotNormal, rough: dotRough },
      brushed: { color: brushedColor, normal: brushedNormal, rough: brushedRough },
    };
  }, []);

  /* Variant per cubie: 0 = smooth piano-black, 1 = hex, 2 = dots, 3 = brushed */
  const variants = useMemo(
    () => [
      1, 0, 2, 0, 3, 0, 1, 0, 2,
      0, 3, 0, 1, 0, 2, 0, 3, 0,
      1, 0, 2, 0, 3, 0, 1, 0, 2,
    ],
    []
  );

  /* Mount pivot inside the group once; clean up on unmount so React doesn't
     lose track of reparented meshes. */
  useEffect(() => {
    const group = groupRef.current;
    const pivot = pivotRef.current;
    if (!group) return;
    group.add(pivot);
    return () => {
      // Return any cubies still inside pivot back to the group before teardown
      [...pivot.children].forEach((child) => {
        if (child instanceof THREE.Mesh) group.attach(child);
      });
      group.remove(pivot);
    };
  }, []);

  const startMove = useCallback(() => {
    const group = groupRef.current;
    const pivot = pivotRef.current;
    if (!group) return;

    const axes: Axis[] = ["x", "y", "z"];
    const axis = axes[Math.floor(Math.random() * 3)];
    const layer = [-1, 0, 1][Math.floor(Math.random() * 3)];
    const direction = Math.random() < 0.5 ? 1 : -1;
    const target = (direction * Math.PI) / 2;
    const targetPos = layer * GAP;
    const tol = GAP * 0.4;

    pivot.rotation.set(0, 0, 0);
    pivot.position.set(0, 0, 0);

    /* Move every cubie whose world-aligned axis component lives in this
       layer into the pivot. Using attach() preserves world transform. */
    meshRefs.current.forEach((mesh) => {
      if (!mesh) return;
      if (Math.abs(mesh.position[axis] - targetPos) < tol) {
        pivot.attach(mesh);
      }
    });

    move.current.active = true;
    move.current.elapsed = 0;
    move.current.axis = axis;
    move.current.target = target;
  }, []);

  const endMove = useCallback(() => {
    const group = groupRef.current;
    const pivot = pivotRef.current;
    if (!group) return;

    /* Snap pivot to exact target to avoid float drift */
    pivot.rotation[move.current.axis] = move.current.target;

    const children = [...pivot.children];
    children.forEach((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      group.attach(child);
      /* Snap position back to nearest grid slot */
      child.position.x = Math.round(child.position.x / GAP) * GAP;
      child.position.y = Math.round(child.position.y / GAP) * GAP;
      child.position.z = Math.round(child.position.z / GAP) * GAP;
    });

    pivot.rotation.set(0, 0, 0);
    move.current.active = false;
    move.current.elapsed = 0;
    move.current.nextIn = 0.45;
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    /* Whole-group auto-rotation (paused while dragging) */
    if (!dragging.current) {
      group.rotation.y += delta * 0.4;
      group.rotation.x += delta * 0.12;
    }

    /* Rubik's face-turn animation (runs even during drag) */
    const m = move.current;
    if (m.active) {
      m.elapsed += delta;
      const t = Math.min(m.elapsed / m.duration, 1);
      const eased =
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; /* easeInOutQuad */
      pivotRef.current.rotation[m.axis] = eased * m.target;
      if (t >= 1) endMove();
    } else {
      m.nextIn -= delta;
      if (m.nextIn <= 0) startMove();
    }
  });

  const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    dragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    document.body.style.cursor = "grabbing";

    const handleMove = (ev: PointerEvent) => {
      if (!groupRef.current) return;
      const dx = ev.clientX - lastPointer.current.x;
      const dy = ev.clientY - lastPointer.current.y;
      groupRef.current.rotation.y += dx * 0.008;
      groupRef.current.rotation.x += dy * 0.008;
      lastPointer.current = { x: ev.clientX, y: ev.clientY };
    };

    const handleUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
  }, []);

  const handlePointerOver = useCallback(() => {
    if (!dragging.current) document.body.style.cursor = "grab";
  }, []);

  const handlePointerOut = useCallback(() => {
    if (!dragging.current) document.body.style.cursor = "";
  }, []);

  return (
    <group
      ref={groupRef}
      scale={0.7}
      position={[0.8, 0.6, 0]}
      onPointerDown={handlePointerDown}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {cubes.map(({ position, key }, i) => {
        const v = variants[i];
        const tex =
          v === 1
            ? textures.hex
            : v === 2
            ? textures.dots
            : v === 3
            ? textures.brushed
            : null;
        return (
          <RoundedBox
            key={key}
            args={[1, 1, 1]}
            radius={0.13}
            smoothness={6}
            position={position}
            ref={(el: THREE.Mesh | null) => {
              if (el) meshRefs.current[i] = el;
            }}
          >
            <meshStandardMaterial
              color="#00FFB3"
              emissive="#00FFB3"
              emissiveIntensity={1.2}
              toneMapped={false}
              roughness={0.4}
              metalness={0.1}
            />
            <TexturedFaces tex={tex} isLight={isLight} />
          </RoundedBox>
        );
      })}
    </group>
  );
}

function Scene({ isLight }: { isLight: boolean }) {
  const { gl } = useThree();
  useEffect(() => {
    gl.toneMappingExposure = isLight ? 0.85 : 0.55;
  }, [gl, isLight]);
  return (
    <>
      <ambientLight intensity={isLight ? 0.75 : 0.45} />
      <hemisphereLight args={["#ffffff", "#000000", isLight ? 0.5 : 0.3]} />
      <directionalLight position={[5, 7, 5]} intensity={isLight ? 0.6 : 0.35} color="#ffffff" />
      <pointLight position={[-4, 3, 4]} intensity={0.55} color={PRIMARY} distance={20} />
      <pointLight position={[4, -3, 3]} intensity={0.45} color={ACCENT} distance={20} />
      <Cube isLight={isLight} />
      <Environment preset={isLight ? "city" : "night"} background={false} />
    </>
  );
}

export default function HeroScene() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  return (
    <Canvas
      camera={{ position: [6, 5, 7], fov: 35 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: isLight ? 0.85 : 0.55,
      }}
      key={isLight ? "light" : "dark"}
      style={{ background: "transparent" }}
    >
      <Scene isLight={isLight} />
    </Canvas>
  );
}

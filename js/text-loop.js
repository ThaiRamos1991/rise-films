// ============================================================
// RISE FILMS — Faixa de texto em loop (SVG + GSAP)
// Porte em vanilla JS do componente "TextLoop" (reactbits.dev)
// ============================================================
import { prefersReducedMotion } from './utils.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';
const VIEW_W = 1200;
const VIEW_H = 200;
const CY = VIEW_H / 2;

let uid = 0;

function buildPath() {
  // Faixa reta e contínua — mantém a seção baixa e discreta como um divisor.
  return `M -320 ${CY} L ${VIEW_W + 320} ${CY}`;
}

export function initTextLoop(mount, options = {}) {
  if (!mount) return null;

  const props = {
    text: 'Rise Films',
    separator: '✦',
    speed: 70,
    direction: 'forward',
    fontSize: 42,
    fontWeight: 700,
    letterSpacing: 2,
    uppercase: true,
    color: '#181818',
    ribbon: true,
    ribbonColor: '#65F461',
    ribbonWidth: 84,
    pauseOnHover: true,
    ...options,
  };

  const id = `text-loop-${++uid}`;
  const base = props.uppercase ? String(props.text).toUpperCase() : String(props.text);
  const gap = props.separator ? ` ${props.separator} ` : '   ';
  const unit = `${base}${gap}`;
  const textStyle = `font-size:${props.fontSize}px;font-weight:${props.fontWeight};letter-spacing:${props.letterSpacing}px;font-family:inherit;`;

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'text-loop-svg');
  svg.setAttribute('viewBox', `0 0 ${VIEW_W} ${VIEW_H}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', props.text);

  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('id', id);
  path.setAttribute('d', buildPath());
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', props.ribbon ? props.ribbonColor : 'none');
  path.setAttribute('stroke-width', String(props.ribbon ? props.ribbonWidth : 0));
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(path);

  const measureEl = document.createElementNS(SVG_NS, 'text');
  measureEl.setAttribute('class', 'text-loop-measure');
  measureEl.setAttribute('style', textStyle);
  measureEl.setAttribute('aria-hidden', 'true');
  measureEl.textContent = unit;
  svg.appendChild(measureEl);

  function makeTextPath() {
    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttribute('class', 'text-loop-text');
    text.setAttribute('style', textStyle);
    text.setAttribute('fill', props.color);
    text.setAttribute('dominant-baseline', 'central');
    text.setAttribute('aria-hidden', 'true');
    const textPath = document.createElementNS(SVG_NS, 'textPath');
    textPath.setAttributeNS(XLINK_NS, 'href', `#${id}`);
    textPath.setAttribute('href', `#${id}`);
    textPath.setAttribute('startOffset', '0');
    text.appendChild(textPath);
    svg.appendChild(text);
    return textPath;
  }

  const head = makeTextPath();
  const tail = makeTextPath();

  mount.innerHTML = '';
  mount.appendChild(svg);
  mount.setAttribute('aria-label', props.text);

  let length = 0;
  let tween = null;

  function apply(offset) {
    const partner = offset >= 0 ? offset - length : offset + length;
    head.setAttribute('startOffset', String(offset));
    tail.setAttribute('startOffset', String(partner));
  }

  function startAnim() {
    tween?.kill();
    if (prefersReducedMotion() || props.speed <= 0 || !length || !window.gsap) return;
    const state = { offset: 0 };
    tween = window.gsap.to(state, {
      offset: props.direction === 'reverse' ? -length : length,
      duration: length / props.speed,
      ease: 'none',
      repeat: -1,
      onUpdate: () => apply(state.offset),
    });
  }

  function measureAndFill() {
    try {
      length = path.getTotalLength();
      const unitWidth = measureEl.getComputedTextLength();
      const reps = unitWidth > 0 ? Math.max(1, Math.round(length / unitWidth)) : 1;
      const loopText = unit.repeat(reps);
      head.textContent = loopText;
      tail.textContent = loopText;
      head.setAttribute('textLength', String(length));
      tail.setAttribute('textLength', String(length));
      head.setAttribute('lengthAdjust', 'spacing');
      tail.setAttribute('lengthAdjust', 'spacing');
    } catch {
      return;
    }
    if (!length) return;
    apply(0);
    startAnim();
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(measureAndFill).catch(measureAndFill);
  } else {
    measureAndFill();
  }

  if (props.pauseOnHover) {
    mount.addEventListener('pointerenter', () => tween?.pause());
    mount.addEventListener('pointerleave', () => tween?.resume());
  }

  return {
    destroy() {
      tween?.kill();
      mount.innerHTML = '';
    },
  };
}

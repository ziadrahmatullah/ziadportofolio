/**
 * Builds a deterministic "neural network" graph: nodes scattered inside an
 * ellipsoid, each connected to its nearest neighbours.
 */

export type Graph = {
  count: number;
  /** xyz per node */
  positions: Float32Array;
  /** node index pairs, two entries per edge */
  edges: Uint16Array;
  edgeCount: number;
  /** edge indices touching each node */
  adjacency: number[][];
};

/** Small seeded PRNG so the layout is stable between renders. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildGraph(count: number, seed = 7): Graph {
  const rand = mulberry32(seed);
  const positions = new Float32Array(count * 3);

  // Ellipsoid radii; slightly wider than tall so it fills a landscape hero.
  const rx = 4.3;
  const ry = 3.1;
  const rz = 2.9;

  for (let i = 0; i < count; i++) {
    const u = rand();
    const v = rand();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    // Bias away from the centre so the cloud reads as a shell with depth.
    const r = 0.35 + 0.65 * Math.cbrt(rand());
    const sx = Math.sin(phi) * Math.cos(theta);
    const sy = Math.sin(phi) * Math.sin(theta);
    const sz = Math.cos(phi);
    positions[i * 3] = sx * r * rx;
    positions[i * 3 + 1] = sy * r * ry;
    positions[i * 3 + 2] = sz * r * rz;
  }

  const k = 3;
  const maxDist = 2.6;
  const seen = new Set<number>();
  const pairs: number[] = [];

  const addEdge = (a: number, b: number) => {
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    const key = lo * count + hi;
    if (seen.has(key)) return;
    seen.add(key);
    pairs.push(lo, hi);
  };

  const dists: { j: number; d: number }[] = [];
  for (let i = 0; i < count; i++) {
    dists.length = 0;
    const ix = positions[i * 3];
    const iy = positions[i * 3 + 1];
    const iz = positions[i * 3 + 2];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const dx = positions[j * 3] - ix;
      const dy = positions[j * 3 + 1] - iy;
      const dz = positions[j * 3 + 2] - iz;
      dists.push({ j, d: Math.sqrt(dx * dx + dy * dy + dz * dz) });
    }
    dists.sort((p, q) => p.d - q.d);
    // Always connect the nearest neighbour so no node is isolated.
    addEdge(i, dists[0].j);
    for (let n = 1; n < k && n < dists.length; n++) {
      if (dists[n].d <= maxDist) addEdge(i, dists[n].j);
    }
  }

  const edges = new Uint16Array(pairs);
  const edgeCount = edges.length / 2;
  const adjacency: number[][] = Array.from({ length: count }, () => []);
  for (let e = 0; e < edgeCount; e++) {
    adjacency[edges[e * 2]].push(e);
    adjacency[edges[e * 2 + 1]].push(e);
  }

  return { count, positions, edges, edgeCount, adjacency };
}

"""The screen behind the pages (assets/css/screen.css), drawn as SVG files:
a hex lattice tile, a contour map, a range finder (its dashed ring apart so
it can turn), a board of 19 of the lattice's cells, and signal rings. Deterministic: run it
again and the files come out the same. Plain Python 3, no packages:

    python3 _tools/screen-art.py

It writes into assets/screen/. The contour map is marching squares over a
smooth field (a few hills and hollows plus two long waves), its contours
joined into paths and thinned. Plan: _plans/2026-10-06_console-restyle.md.
"""
import math
import os
import random

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "screen")
os.makedirs(OUT, exist_ok=True)
ORANGE = "#ff9830"


def fmt(v):
    s = f"{v:.1f}"
    return s[:-2] if s.endswith(".0") else s


# ── The hex lattice: one tile of a flat-topped honeycomb ──────────────────
S = 16
H = math.sqrt(3) * S  # 27.7128
hexd = (
    f"M0 {H/2:.3f}L{S/2:g} 0H{S*1.5:g}L{S*2:g} {H/2:.3f}L{S*1.5:g} {H:.3f}H{S/2:g}Z"
    f"M{S*2:g} {H/2:.3f}H{S*3:g}"
)
with open(f"{OUT}/hex.svg", "w") as f:
    f.write(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{S*3}" height="{H:.4f}" '
        f'viewBox="0 0 {S*3} {H:.4f}"><path d="{hexd}" fill="none" stroke="{ORANGE}" '
        f'stroke-width="0.75"/></svg>\n'
    )

# ── The contour map ───────────────────────────────────────────────────────
W, HH = 900, 640
NX, NY = 180, 128
rng = random.Random(7)
hills = [
    (0.62, 0.40, 0.17, 0.13, 1.0),
    (0.30, 0.62, 0.13, 0.17, 0.82),
    (0.80, 0.78, 0.10, 0.09, 0.6),
    (0.45, 0.22, 0.09, 0.07, -0.45),
    (0.15, 0.25, 0.12, 0.10, 0.5),
    (0.88, 0.25, 0.08, 0.12, 0.35),
]


def field(x, y):
    v = 0.0
    for cx, cy, sx, sy, a in hills:
        v += a * math.exp(-(((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2) / 2)
    v += 0.08 * math.sin(6.1 * x + 1.3) * math.cos(4.7 * y - 0.4)
    v += 0.05 * math.sin(11.0 * x + 7.0 * y)
    return v


grid = [[field(i / (NX - 1), j / (NY - 1)) for i in range(NX)] for j in range(NY)]
lo = min(min(r) for r in grid)
hi = max(max(r) for r in grid)
levels = [lo + (hi - lo) * (k + 1) / 15 for k in range(14)]


def interp(p1, p2, v1, v2, lvl):
    t = (lvl - v1) / (v2 - v1) if v2 != v1 else 0.5
    return (p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1]))


def contour(lvl):
    segs = []
    dx, dy = W / (NX - 1), HH / (NY - 1)
    for j in range(NY - 1):
        for i in range(NX - 1):
            p = [(i * dx, j * dy), ((i + 1) * dx, j * dy), ((i + 1) * dx, (j + 1) * dy), (i * dx, (j + 1) * dy)]
            v = [grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]]
            idx = sum(1 << k for k in range(4) if v[k] > lvl)
            if idx in (0, 15):
                continue
            e = {}
            for k in range(4):
                a, b = k, (k + 1) % 4
                if (v[a] > lvl) != (v[b] > lvl):
                    e[k] = interp(p[a], p[b], v[a], v[b], lvl)
            ks = sorted(e)
            if len(ks) == 2:
                segs.append((e[ks[0]], e[ks[1]]))
            elif len(ks) == 4:
                c = sum(v) / 4 > lvl
                if (idx in (5,)) ^ c:
                    segs += [(e[0], e[3]), (e[1], e[2])]
                else:
                    segs += [(e[0], e[1]), (e[2], e[3])]
    return segs


def key(pt):
    return (round(pt[0], 3), round(pt[1], 3))


def chain(segs):
    adj = {}
    for a, b in segs:
        adj.setdefault(key(a), []).append((key(b), b))
        adj.setdefault(key(b), []).append((key(a), a))
    used = set()
    lines = []
    for a, b in segs:
        if (key(a), key(b)) in used:
            continue
        used.add((key(a), key(b)))
        used.add((key(b), key(a)))
        line = [a, b]
        for end in (1, 0):
            while True:
                tip = key(line[-1] if end else line[0])
                nxt = None
                for k2, pt in adj.get(tip, []):
                    if (tip, k2) not in used:
                        nxt = (k2, pt)
                        break
                if not nxt:
                    break
                used.add((tip, nxt[0]))
                used.add((nxt[0], tip))
                if end:
                    line.append(nxt[1])
                else:
                    line.insert(0, nxt[1])
        lines.append(line)
    return lines


def simplify(pts, eps=0.9):
    if len(pts) < 3:
        return pts
    # A closed ring: thin each half, or the ring collapses to its seam.
    if math.dist(pts[0], pts[-1]) < 1e-6 and len(pts) > 4:
        mid = len(pts) // 2
        return simplify(pts[: mid + 1], eps)[:-1] + simplify(pts[mid:], eps)
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dmax, idx = 0, 0
    L = math.hypot(x2 - x1, y2 - y1) or 1e-9
    for i in range(1, len(pts) - 1):
        x0, y0 = pts[i]
        d = abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1) / L
        if d > dmax:
            dmax, idx = d, i
    if dmax > eps:
        return simplify(pts[: idx + 1], eps)[:-1] + simplify(pts[idx:], eps)
    return [pts[0], pts[-1]]


paths_thin, paths_index = [], []
for n, lvl in enumerate(levels):
    for line in chain(contour(lvl)):
        pts = simplify(line)
        if len(pts) < 3:
            continue
        # A ring a few pixels across reads as a speck, not a hill.
        xs, ys = [q[0] for q in pts], [q[1] for q in pts]
        if max(xs) - min(xs) < 24 and max(ys) - min(ys) < 24:
            continue
        closed = math.dist(pts[0], pts[-1]) < 1e-6
        d = "M" + "L".join(f"{fmt(x)} {fmt(y)}" for x, y in (pts[:-1] if closed else pts)) + ("Z" if closed else "")
        (paths_index if n % 5 == 4 else paths_thin).append(d)

# Survey marks: the highest point (a triangle), two stations (crosses), the
# map's edge ticks.
peak = max(((grid[j][i], i, j) for j in range(NY) for i in range(NX)))
px, py = peak[1] * W / (NX - 1), peak[2] * HH / (NY - 1)
marks = [
    f'<path d="M{fmt(px)} {fmt(py-9)}L{fmt(px+8)} {fmt(py+5)}H{fmt(px-8)}Z" fill="none" stroke-width="1.5"/>',
]
for sx, sy in ((0.28 * W, 0.6 * HH), (0.78 * W, 0.76 * HH)):
    marks.append(
        f'<path d="M{fmt(sx-10)} {fmt(sy)}H{fmt(sx-3)}M{fmt(sx+3)} {fmt(sy)}H{fmt(sx+10)}'
        f'M{fmt(sx)} {fmt(sy-10)}V{fmt(sy-3)}M{fmt(sx)} {fmt(sy+3)}V{fmt(sy+10)}" stroke-width="1.5"/>'
    )
ticks = []
for k in range(0, W + 1, 30):
    ln = 10 if k % 150 == 0 else 5
    ticks.append(f"M{k} {HH}V{HH-ln}")
for k in range(0, HH + 1, 30):
    ln = 10 if k % 150 == 0 else 5
    ticks.append(f"M0 {k}H{ln}")

with open(f"{OUT}/map.svg", "w") as f:
    f.write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {HH}" fill="none" '
        f'stroke="{ORANGE}" stroke-linejoin="round" stroke-linecap="round">\n'
        f'<g stroke-opacity="0.55" stroke-width="1"><path d="{"".join(paths_thin)}"/></g>\n'
        f'<g stroke-width="1.6"><path d="{"".join(paths_index)}"/></g>\n'
        f'<g stroke-width="1"><path d="{"".join(ticks)}"/></g>\n'
        + "\n".join(marks)
        + "\n</svg>\n"
    )

# ── The reticle ──────────────────────────────────────────────────────────
C = 160
parts = [
    f'<circle cx="{C}" cy="{C}" r="148" stroke-width="1.2"/>',
    f'<circle cx="{C}" cy="{C}" r="60" stroke-width="1"/>',
    f'<circle cx="{C}" cy="{C}" r="3" fill="{ORANGE}" stroke="none"/>',
]
tick = []
for deg in range(0, 360, 5):
    a = math.radians(deg)
    r1 = 148
    r2 = 136 if deg % 30 == 0 else 142
    tick.append(
        f"M{fmt(C + r1 * math.cos(a))} {fmt(C + r1 * math.sin(a))}"
        f"L{fmt(C + r2 * math.cos(a))} {fmt(C + r2 * math.sin(a))}"
    )
# The crosshair, open at the middle.
tick += [f"M{C} 4V{C-14}", f"M{C} {C+14}V{2*C-4}", f"M4 {C}H{C-14}", f"M{C+14} {C}H{2*C-4}"]
# Brackets on the inner ring's diagonals, as a lock's corners.
for sxn, syn in ((1, 1), (-1, 1), (1, -1), (-1, -1)):
    x0, y0 = C + sxn * 42, C + syn * 42
    tick.append(f"M{fmt(x0)} {fmt(y0 - syn*12)}V{fmt(y0)}H{fmt(x0 - sxn*12)}")
parts.append(f'<path d="{"".join(tick)}" stroke-width="1.2"/>')
with open(f"{OUT}/scope.svg", "w") as f:
    f.write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {2*C} {2*C}" fill="none" '
        f'stroke="{ORANGE}" stroke-linecap="square">\n' + "\n".join(parts) + "\n</svg>\n"
    )

# The dashed ring on its own, so it can turn (screen.css).
with open(f"{OUT}/scope-ring.svg", "w") as f:
    f.write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {2*C} {2*C}" fill="none" '
        f'stroke="{ORANGE}"><circle cx="{C}" cy="{C}" r="104" stroke-width="1" '
        f'stroke-dasharray="2 6"/></svg>\n'
    )

# ── The board: a patch of the lattice's own cells, 37 of them ────────────
# Drawn in the hex tile's units (side 16), so at the tile's scale on the page
# its lines fall on the lattice's. Flat-topped cells at axial (q, r), out to
# three from the middle: 7 cells across.
BW, BH = 6 * 24 + 32, 7 * H  # 176 by 193.99
bcx, bcy = BW / 2, BH / 2
cells = [(q, r) for q in range(-3, 4) for r in range(-3, 4) if abs(q + r) <= 3]
bd = []
for q, r in cells:
    cx, cy = bcx + 24 * q, bcy + H * (r + q / 2)
    pts = [(cx - 16, cy), (cx - 8, cy - H / 2), (cx + 8, cy - H / 2), (cx + 16, cy), (cx + 8, cy + H / 2), (cx - 8, cy + H / 2)]
    bd.append("M" + "L".join(f"{fmt(x)} {fmt(y)}" for x, y in pts) + "Z")
with open(f"{OUT}/board.svg", "w") as f:
    f.write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BW} {BH:.3f}" fill="none" '
        f'stroke="{ORANGE}" stroke-width="0.75" stroke-linejoin="round"><path d="{"".join(bd)}"/></svg>\n'
    )
print("board cells (q r):", " ".join(f"{q},{r}" for q, r in cells))

# ── The signal: rings round a center, ticks on the outer one ──────────────
G = 200
sig = [f'<circle cx="{G}" cy="{G}" r="{rr}"/>' for rr in (48, 96, 144)]
sig.append(f'<circle cx="{G}" cy="{G}" r="192" stroke-dasharray="1 7"/>')
st = []
for deg in range(0, 360, 30):
    a = math.radians(deg)
    st.append(
        f"M{fmt(G + 192 * math.cos(a))} {fmt(G + 192 * math.sin(a))}"
        f"L{fmt(G + 178 * math.cos(a))} {fmt(G + 178 * math.sin(a))}"
    )
sig.append(f'<path d="{"".join(st)}"/>')
with open(f"{OUT}/signal.svg", "w") as f:
    f.write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {2*G} {2*G}" fill="none" '
        f'stroke="{ORANGE}" stroke-width="1">' + "".join(sig) + "</svg>\n"
    )

# Where the map's marks sit, as fractions of its box: screen.css puts a
# ping on each.
print(f"marks: peak {px / W:.4f} {py / HH:.4f}; stations 0.28 0.60, 0.78 0.76")

for name in ("hex.svg", "map.svg", "scope.svg", "scope-ring.svg", "board.svg", "signal.svg"):
    print(name, os.path.getsize(f"{OUT}/{name}"), "bytes")
print("paths", len(paths_thin), len(paths_index))

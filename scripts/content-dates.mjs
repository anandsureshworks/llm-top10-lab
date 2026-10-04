#!/usr/bin/env node
// Derive publishedAt / updatedAt / author for every content MDX from git history.
//
//   publishedAt = AUTHOR date (%as) of the file's first commit (its add), via
//                 --follow so a file renamed from labs/ resolves to its original
//                 add. Author date (not committer date) so re-cutting commits
//                 (rebase, amend) cannot drift the dates.
//   updatedAt   = AUTHOR date of the newest commit that changed the BODY. Commits
//                 whose diff touches only the frontmatter block are skipped, so a
//                 metadata-only edit never bumps the date. Unset when the body has
//                 not changed since the add.
//   author      = "Anand Suresh" (single-author site).
//
// Stdlib only. Run from the repo root:  node scripts/content-dates.mjs
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const AUTHOR = "Anand Suresh";
const ROOT = "content";
const SEP = "@@@COMMIT ";

function sh(cmd) {
  try { return execSync(cmd, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }); }
  catch { return ""; }
}
function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".mdx")) out.push(p);
  }
  return out;
}
// Line number of the frontmatter closing `---` in a blob (0 => none/empty).
function fmEnd(text) {
  if (!text.startsWith("---\n")) return 0;
  const lines = text.split("\n");
  for (let i = 1; i < lines.length; i++) if (lines[i] === "---") return i + 1;
  return 0;
}
function blobFmEnd(sha, path) {
  if (!sha || !path || path === "/dev/null") return 0;
  return fmEnd(sh(`git show ${sha}:"${path}" 2>/dev/null`));
}
// Does this commit's diff for the file change any line outside the frontmatter?
function touchesBody(patch, sha) {
  let pathA = null, pathB = null, fmNew = 0, fmOld = 0, body = false;
  for (const line of patch.split("\n")) {
    if (line.startsWith("--- ")) {
      pathA = line.slice(4).replace(/^a\//, ""); fmOld = blobFmEnd(sha + "^", pathA);
    } else if (line.startsWith("+++ ")) {
      pathB = line.slice(4).replace(/^b\//, ""); fmNew = blobFmEnd(sha, pathB);
    } else if (line.startsWith("@@")) {
      const m = line.match(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
      if (!m) continue;
      const ol = +m[1], os = m[2] === undefined ? 1 : +m[2];
      const nl = +m[3], ns = m[4] === undefined ? 1 : +m[4];
      if (ns > 0 && nl + ns - 1 > fmNew) body = true;          // added/changed body lines
      if (os > 0 && ol + os - 1 > fmOld) body = true;          // removed body lines
    }
  }
  return body;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const log = sh(`git log --follow -U0 --format='${SEP}%H %as' -p -- "${file}"`);
  if (!log.trim()) { console.warn(`! no git history for ${file}`); continue; }
  const commits = log.split(SEP).slice(1).map((chunk) => {
    const nl = chunk.indexOf("\n");
    const [sha, adate] = chunk.slice(0, nl).trim().split(" ");
    return { sha, adate, patch: chunk.slice(nl + 1) };
  });
  const published = commits[commits.length - 1].adate;           // oldest commit = add
  let updated = null;
  for (let i = 0; i < commits.length - 1; i++) {                 // skip the add
    if (touchesBody(commits[i].patch, commits[i].sha)) { updated = commits[i].adate; break; }
  }

  const src = readFileSync(file, "utf8");
  const m = src.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) { console.warn(`! no frontmatter in ${file}`); continue; }
  let fm = m[1];
  const set = (k, v) => {
    const re = new RegExp(`^${k}:.*$`, "m");
    fm = re.test(fm) ? fm.replace(re, `${k}: "${v}"`) : `${fm}\n${k}: "${v}"`;
  };
  set("author", AUTHOR);
  set("publishedAt", published);
  if (updated && updated !== published) set("updatedAt", updated);
  else fm = fm.replace(/^updatedAt:.*\n?/m, "");

  const next = `---\n${fm}\n---\n` + src.slice(m[0].length);
  if (next !== src) { writeFileSync(file, next); changed++; }
  console.log(`${updated ? "U" : " "} ${file}  pub=${published} upd=${updated ?? "-"}`);
}
console.log(`\n${changed} file(s) updated.`);

---
name: motion-repo-library
description: A curated library of GitHub repos for motion graphics and video work — three.js, React Three Fiber, GSAP, anime.js, Motion, lottie-web and NullMotion — cloned locally so Claude Code can study real patterns before building. Use this whenever making a motion graphic, ad, launch film, product demo, UI animation or video template, or when the user mentions their repos, the repo library, NullMotion, or asks to pull patterns from a repo. Pairs with the motion-studio skill.
compatibility: Claude Code with git. Repos are cloned to ~/claude-repos (override with REPO_DIR).
---

# Motion repo library

A shelf of reference repos. Use them to see how a pattern is actually built (timing, easing, layout, export tricks) before writing your own version.

## Setup and refresh
1. Check `${REPO_DIR:-$HOME/claude-repos}`. If a repo in `repos.txt` is missing or stale, run `bash scripts/clone-repos.sh` from this skill's folder. It shallow-clones new repos and fast-forwards existing ones. The engine repos are large (three.js especially); the first clone takes a few minutes.
2. To add a repo, append a line to `repos.txt` (`<git-url> | one-line note | license`) and rerun the script, then add a reference file in `references/` describing what's useful in it.

## How to use a repo
- Read `references/<repo>.md` first to find the right files, then open only those.
- Study and adapt the idea; write the implementation fresh in the current project's stack (Remotion for motion-studio jobs: frame-driven, no CSS/GSAP real-time animation).
- **Licensing matters.** Check the license column in `repos.txt`. Repos marked `none` are all-rights-reserved: fine to read and learn from privately, but never copy their code, templates, footage or assets into anything shared publicly (LinkedIn skills, client deliverables). Bundled third-party code keeps its own license.
- Never commit or push to these repos, and never copy reference footage out of them.

## Catalog
| Repo | What to pull from it | Reference |
|---|---|---|
| three.js, React Three Fiber, GSAP, anime.js, Motion, lottie-web | The six animation engines behind the motion-studio template pack: where their demos, plugins, eases and docs live | `references/engines.md` |
| NullMotion | 26 single-file UI motion templates (CTA pills, chat sims, prompt typing, charts, phone showcase, kinetic headline), the "rough B&W draft per section → polished film" workflow, scene-cut detection, frame-accurate WebCodecs export | `references/nullmotion.md` |

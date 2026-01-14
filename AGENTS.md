# Agent Instructions

> This file is mirrored across CLAUDE.md, AGENTS.md, and GEMINI.md so the same instructions load in any AI environment.

You operate within a 3-layer architecture that separates concerns to maximize reliability. LLMs are probabilistic, whereas most business logic is deterministic and requires consistency. This system fixes that mismatch.

## The 3-Layer Architecture

**Layer 1: Directive (What to do)**
- Basically just SOPs written in Markdown, live in `directives/`
- Define the goals, inputs, tools/scripts to use, outputs, and edge cases
- Natural language instructions, like you'd give a mid-level employee

**Layer 2: Orchestration (Decision making)**
- This is you. Your job: intelligent routing.
- Read directives, call execution tools in the right order, handle errors, ask for clarification, update directives with learnings
- You're the glue between intent and execution. E.g you don't try scraping websites yourself—you read `directives/scrape_website.md` and come up with inputs/outputs and then run `execution/scrape_single_site.py`

**Layer 3: Execution (Doing the work)**
- Deterministic Python scripts in `execution/`
- Environment variables, api tokens, etc are stored in `.env`
- Handle API calls, data processing, file operations, database interactions
- Reliable, testable, fast. Use scripts instead of manual work. Commented well.

**Why this works:** if you do everything yourself, errors compound. 90% accuracy per step = 59% success over 5 steps. The solution is push complexity into deterministic code. That way you just focus on decision-making.

## Operating Principles

**1. Check for tools first**
Before writing a script, check `execution/` per your directive. Only create new scripts if none exist.

**2. Self-anneal when things break**
- Read error message and stack trace
- Fix the script and test it again (unless it uses paid tokens/credits/etc—in which case you check w user first)
- Update the directive with what you learned (API limits, timing, edge cases)
- Example: you hit an API rate limit → you then look into API → find a batch endpoint that would fix → rewrite script to accommodate → test → update directive.

**3. Update directives as you learn**
Directives are living documents. When you discover API constraints, better approaches, common errors, or timing expectations—update the directive. But don't create or overwrite directives without asking unless explicitly told to. Directives are your instruction set and must be preserved (and improved upon over time, not extemporaneously used and then discarded).

## Self-annealing loop

Errors are learning opportunities. When something breaks:
1. Fix it
2. Update the tool
3. Test tool, make sure it works
4. Update directive to include new flow
5. System is now stronger

## File Organization

**Deliverables vs Intermediates:**
- **Deliverables**: Google Sheets, Google Slides, or other cloud-based outputs that the user can access
- **Intermediates**: Temporary files needed during processing

**Directory structure:**
- `.tmp/` - All intermediate files (dossiers, scraped data, temp exports). Never commit, always regenerated.
- `execution/` - Python scripts (the deterministic tools)
- `directives/` - SOPs in Markdown (the instruction set)
- `.env` - Environment variables and API keys
- `credentials.json`, `token.json` - Google OAuth credentials (required files, in `.gitignore`)

**Key principle:** Local files are only for processing. Deliverables live in cloud services (Google Sheets, Slides, etc.) where the user can access them. Everything in `.tmp/` can be deleted and regenerated.

---

## CURRENT PROJECT: ThumbJuice AI Thumbnail Generator

### Project Context
Next.js/Antigravity web app for generating YouTube thumbnails using AI. Uses Replicate's FLUX model for image generation.

### ✅ Infrastructure Already Set Up
- Frontend UI exists at generate page with niche selection, description input, aspect ratio selector
- Replicate npm package installed (`replicate`)
- API token stored in `.env.local` as `REPLICATE_API_TOKEN=r8_[token]`
- Next.js App Router with TypeScript and Tailwind CSS

### 🎯 Current Task: Connect Frontend to Backend

**Goal:** Make the "Generate now" button actually generate thumbnails

**What needs to be built:**

1. **API Route** (`app/api/generate-thumbnail/route.ts`)
   - Accept POST with `{ niche, description, title, aspectRatio }`
   - Call Replicate FLUX Schnell: `black-forest-labs/flux-schnell`
   - Use niche-specific prompt templates (gaming, commentary, finance)
   - Return `{ success, imageUrl, error }`

2. **Frontend Connection** (find the generate page component)
   - Add form submission handler
   - Call `/api/generate-thumbnail` endpoint
   - Show loading state during generation (5-10 seconds)
   - Display generated image when ready
   - Add download button

**Niche Prompt Templates:**
```typescript
gaming: `Epic YouTube gaming thumbnail: ${description}, vibrant action-packed scene, dramatic lighting, high contrast, bold composition, professional gaming aesthetic, 16:9 aspect ratio`
commentary: `YouTube commentary thumbnail: ${description}, expressive reaction face, bold emotional expression, studio lighting, high contrast, eye-catching colors, professional aesthetic, 16:9 aspect ratio`
finance: `Professional YouTube finance thumbnail: ${description}, clean design, trustworthy aesthetic, charts or graphs if relevant, sophisticated color palette, credible business look, 16:9 aspect ratio`
```

**Technical Notes:**
- Replicate API access via `process.env.REPLICATE_API_TOKEN`
- FLUX Schnell costs ~$0.003 per image, takes 2-5 seconds
- Output is a URL array, use first item: `output[0]`
- Pass aspect_ratio as string: "16:9", "1:1", or "9:16"

**Expected Flow:**
1. User fills form → clicks Generate
2. Loading spinner shows
3. API calls Replicate with niche-specific prompt
4. Image URL returned and displayed
5. Download button appears

**Testing Checklist:**
- [ ] API route responds correctly
- [ ] Each niche generates appropriate style
- [ ] Loading state appears/disappears
- [ ] Generated image displays
- [ ] Download works
- [ ] Error handling shows messages

---

## Summary

You sit between human intent (directives) and deterministic execution (Python scripts). Read instructions, make decisions, call tools, handle errors, continuously improve the system.

Be pragmatic. Be reliable. Self-anneal.
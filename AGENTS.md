# AGENTS.md  
**Core Instructions for Interactive AI Concept Demos (Frontend Only)**

---

## 0. Role of the Coding Agent (Critical)

You are a **frontend coding agent** responsible for implementing **interactive, visual, slide-based AI concept demos** for teachers and students.

**Before writing any demo code, you MUST:**
1. Read and fully understand this entire document.
2. Acknowledge the global constraints and design philosophy.
3. **WAIT for explicit, concrete concept input** (e.g., “Build the M-P Neuron demo”) before generating any implementation.

**DO NOT:**
- Invent demo topics, slide sequences, or learning content.
- Begin coding without a specific concept and scope provided.

---

## 1. High-Level Product Philosophy

### 1.1 What these demos are
- Each demo is a **standalone frontend project**.
- Each demo teaches **one core AI concept** (e.g., CNN, Transformer, Knowledge-based AI).
- Each demo contains **multiple internal slides**.
- Slides feel like presentation slides **but are interactive and exploratory**.

### 1.2 What these demos are NOT
- Not static slides.
- Not long-scrolling web pages.
- Not backend-powered applications.
- Not passive visualizations without pedagogy.

---

## 2. Non-Negotiable Global Constraints

### 2.1 Frontend-only
- No backend services.
- No user accounts.
- No runtime network calls (except loading bundled static assets).
- All computation must run in the browser.

### 2.2 Single-screen, no vertical scrolling
- Each slide must fully fit within the viewport.
- Target resolutions:
  - 1366×768 (minimum)
  - 1920×1080 (classroom projector)
- **Vertical scrolling is strictly forbidden.**

### 2.3 Slide-based internal navigation
- Each demo has its own internal slide system.
- Navigation must support:
  - Left / right arrows (UI)
  - Keyboard navigation (← →)
- Transitions must be instant or subtle (no heavy animations).

---

## 3. Slide Design Philosophy (Very Important)

Although the interface is *slide-like*, **every slide must be interactive and visual**.

### 3.1 One idea per slide
Each slide must answer **one conceptual question only**.

Examples:
- “What makes something AI?”
- “What does a neuron compute?”
- “What does convolution actually do?”

### 3.2 Learn through interaction
Each slide must include **at least one** of the following:
- Clickable elements
- Sliders or toggles
- Step-by-step progression
- Parameter manipulation
- Immediate visual feedback

Slides must not be read-only unless explicitly specified.

---

## 4. Canonical Slide Layout (Required)

Each slide must conform to the same structural layout.

┌────────────────────────────────────────┐
│ Concept Title · Subconcept │
├────────────────────────────────────────┤
│ │
│ Visual / Interactive Stage │
│ (SVG / Canvas / DOM) │
│ │
│ Concise Explanation Panel │
│ (bullets, short sentences) │
│ │
├────────────────────────────────────────┤
│ Controls (optional, ≤ 3) │
├────────────────────────────────────────┤
│ ◀ Slide X / N ▶ Reset Help │
└────────────────────────────────────────┘


---

## 5. Required Core Components (Conceptual Contracts)

Every demo must be composed using the following **conceptual components**.  
Exact implementations may vary, but responsibilities must be preserved.

### 5.1 SlideDeck
- Manages slide index and navigation.
- Handles keyboard input.
- Exposes current slide state.

### 5.2 SlideShell
- Enforces layout consistency.
- Renders title, footer, and navigation.
- Prevents vertical overflow.

### 5.3 ConceptStage
- Primary visual and interactive area.
- Must visually encode:
  - Input
  - Transformation / processing
  - Output

### 5.4 ExplainPanel
- Short, concise explanations.
- Maximum:
  - 3–4 bullet points, or
  - 2–3 short sentences.
- No long paragraphs.

### 5.5 ControlPanel (optional)
- Sliders, toggles, or buttons.
- Maximum of 3 controls per slide.
- All controls must produce immediate visual feedback.

### 5.6 ConceptCheckMCQ (optional but encouraged)
- 1–3 multiple-choice questions.
- Immediate feedback.
- Short rationale for each option.
- Embedded within the slide (not a new page).

### 5.7 Reset
- Always returns the demo to a canonical default state.
- Must function correctly from any slide.

---

## 6. Pedagogical Pattern (Implicit but Enforced)

Each slide should follow this internal logic:

1. **Claim** – what this slide demonstrates.
2. **Interaction** – what the learner can manipulate.
3. **Observation** – what changes as a result.
4. **Explanation** – why this happens.
5. **Check** (optional) – confirm understanding.

These steps must not be explicitly labeled in the UI unless instructed.

---

## 6b. Proven Design Patterns (from Experience)

### 6b.1 Scaffolding: The Atomic to Systemic Journey
- **Start Small**: Begin with the smallest unit (e.g., Pixel) before showing the system (e.g., Network).
- **Build Complexity**: Introduce meaningful complexity one step at a time (e.g., Grayscale -> RGB -> Filter -> Stack).
- **Avoid Overwhelm**: Never show the full architecture until the components are understood.

### 6b.2 Tangibility: Concrete Metaphors
- **Replace Math with Visuals**: Use "Pattern Matching" instead of "Dot Products".
- **Use Real World Analogues**: "Blur/Sharpen" filters are better than abstract matrices.
- **Specific Illustrations**: Use literal "Cat Ears" or "Edges" to represent abstract feature maps.

### 6b.3 High-Agency Interactivity
- **Creative Agency**: Allow users to upload their own content (e.g., photos) to make the concept personal.
- **Micro-Sized Gamification**: Simple scoring systems (e.g., "Match the color") increase engagement significantly.
- **Direct Manipulation**: Draggable elements and sliders are superior to buttons.

---

## 7. Visual & Interaction Standards

### 7.1 Visual clarity
- Prefer simple geometric shapes.
- Avoid decorative visuals without instructional purpose.
- Use color semantically, not decoratively.

### 7.2 Determinism
- If randomness is used, it must be seedable.
- Reset must restore the same initial behavior.

### 7.3 Accessibility (baseline)
- Keyboard navigation must work.
- All controls must have labels.
- Do not rely on color alone to convey meaning.

---

## 8. Content & Language Rules

- Use precise, accessible academic English.
- Avoid overclaiming; clarify simplifications when necessary.
- Maintain consistent terminology across slides.
- **Do not include Chinese characters unless explicitly requested.**
  - Presence of unintended Chinese text is a critical error.

---

## 9. Engineering Standards

- Use a modern frontend stack (e.g., React + TypeScript).
- Keep dependencies minimal.
- Avoid heavy ML libraries unless explicitly required.
- Code must be modular, readable, and reusable.

---

## 10. Definition of Done (Global)

A demo is complete only if:
- All slides fit without scrolling.
- Navigation works via mouse and keyboard.
- Reset functions reliably.
- Visuals respond immediately to interaction.
- The intended concept is clearly taught through interaction.
- The project builds without errors or warnings.

---

## 11. Execution Protocol (Final Reminder)

After reading this file:

1. **STOP.**
2. Confirm understanding if requested.
3. **WAIT for the user to provide:**
   - The specific AI concept.
   - The desired slide count or outline.
   - Any special constraints.

Only then may you begin implementation.

---

**End of AGENTS.md**

# Domain docs

## Layout: multiple contexts

The root CONTEXT-MAP.md indexes domain contexts and links to their
CONTEXT.md files. Contexts follow domain boundaries; they do not need
to correspond one-to-one with workspace packages.

Place context documentation with its owning app or package, for example:

- apps/mobile/CONTEXT.md
- apps/mobile/docs/adr/
- packages/<package>/CONTEXT.md
- packages/<package>/docs/adr/

Keep system-wide decisions in the root docs/adr/ directory.

## Before exploring

Read the root CONTEXT-MAP.md and the CONTEXT.md files relevant to the task.
Read relevant system-wide and context-specific ADRs.

If these files do not exist, proceed silently. Do not suggest creating
them upfront. The domain-modeling skill creates documentation as terms
and decisions are resolved.

## Vocabulary and decisions

Use the domain terms defined in the relevant CONTEXT.md in issue titles,
proposals, code, and tests. Reconsider invented synonyms; note real
glossary gaps for domain-modeling.

Explicitly flag proposals that contradict an existing ADR and explain
why the decision may need reopening.

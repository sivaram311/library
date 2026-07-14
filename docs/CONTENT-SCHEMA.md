# Content schema

Canonical JSON Schema: [`../schema/content.schema.json`](../schema/content.schema.json)

## Graph

```
Library
  └── Shelf (App)
        └── Pack (kind: technical | functional | usage)
              └── Chapter
                    └── Block[]
```

## Block types (closed set — MVP)

| Type | Purpose |
|------|---------|
| `prose` | Markdown prose body |
| `callout` | Note / warn / tip |
| `checklist` | Interactive or static checks |
| `code` | Fenced code + language |
| `image` | Screenshot / diagram URL + alt |
| `deepLink` | Link into another app (AgentVerse, ProdDeck, CSS, …) |
| `divider` | Visual break |

No freeform MDX components in MVP — they fight the 3D mapping.

## Required metadata

`id`, `slug`, `title`, `summary` (1–2 lines), `status` (`draft`|`published`), `version`, `updatedAt`, `order`, `packKind`, `appId`

## URLs

`/[app]/[pack]/[chapter]`  
Pack segment uses kind or pack slug (e.g. `usage`, `technical`, `functional`).

## Compile rule

Authors may type Markdown. **On import/publish, compile to structured JSON.** Do not treat loose `.md` on disk as the long-term runtime SoT.

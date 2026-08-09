// Whether the playground back end is there, and the details of talking to it.
//
// The site is useful with no back end at all: every example is rendered from a
// build-time artifact, complete with its output, its diagnostics and its hover
// information. The playground only adds editing. So nothing here may block
// rendering, and when the probe fails the page must look exactly as it did
// before any of this existed.

import { ref } from 'vue';

export const PLAYGROUND_ORIGIN = 'https://playground.ghul.dev';

// Which example is being edited, page-wide. Only one at a time: the back end
// holds a small number of analyser sessions, so a page of forty examples that
// let a reader open several editors would guarantee most of them had no live
// diagnostics. Opening one closes any other.
export const editingExample = ref(null);

export const CHANNEL = 'ghul-playground';

// what a reader has typed, by example name. Held here rather than in the
// component because a deck unmounts its card when it rotates or when the
// reader uses its controls, and losing someone's work to that would be worse
// than any of the reasons for unmounting.
const edits = new Map();

export function retainedEdit(name) {
    return edits.get(name) ?? null;
}

export function retainEdit(name, source) {
    if (typeof source === 'string') edits.set(name, source);
}

// Long enough for a cold service behind a proxy, short enough that a reader on
// a page full of examples is not waiting on it.
const PROBE_TIMEOUT_MS = 4000;

// Probed once per page load and shared by every example on it, rather than once
// per example: a reference page carries dozens.
let probe = null;

export function playgroundAvailable() {
    if (probe) return probe;

    probe = (async () => {
        // Server-side render has no back end to ask and no editing to offer.
        if (typeof fetch !== 'function' || typeof window === 'undefined') return false;

        try {
            const response = await fetch(`${PLAYGROUND_ORIGIN}/health`, {
                signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
                cache: 'no-store'
            });

            if (!response.ok) return false;

            // `ok` says the service exists. It deliberately does not say a
            // session slot is free: the editor is worth offering either way,
            // because compiling and running do not need the analyser.
            return (await response.json())?.ok === true;
        } catch {
            return false;
        }
    })();

    return probe;
}

// VitePress toggles this class on the root element.
export function currentTheme() {
    return typeof document !== 'undefined'
        && document.documentElement.classList.contains('dark')
        ? 'vs-dark'
        : 'vs';
}

// Calls back whenever the site's light/dark setting changes, so the framed
// editor can follow it.
export function watchTheme(onChange) {
    if (typeof MutationObserver === 'undefined') return () => { };

    const observer = new MutationObserver(() => onChange(currentTheme()));

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    return () => observer.disconnect();
}

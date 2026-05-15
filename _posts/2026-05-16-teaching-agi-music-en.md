---
title: "Why I Want to Teach AGI Music"
date: 2026-05-16 01:35:00 +0800
categories:
  - blog
tags:
  - Music AGI
  - Foundation Models
  - MERT
  - ChatMusician
  - YuE
excerpt: "A personal note on MERT, ChatMusician, YuE, and why music intelligence is more than audio generation."
reading_time: "10 min read"
comments: true
lang: en
lang_label: English
lang_order: 2
translation_key: teaching-agi-music
---

This note grew out of a recent slide deck titled *Scaling Open Foundation Models for Music*. That title is accurate, but it sounds more mechanical than the thing I actually care about.

The honest version is simpler: **I am trying to teach AGI music**.

Not just how to generate a piece of audio that sounds vaguely musical. Not just how to win another benchmark. I want future general intelligence to understand music, appreciate it, write it, and know why a phrase should hold back for one more bar before the chorus arrives. Music carries structure, emotion, body, memory, culture, and many things that cannot be cleanly squeezed into a prompt. It is difficult in a way that feels very close to intelligence.

## Music is bigger than audio

It is tempting to reduce music modeling to a narrow pipeline: text in, audio out, demo sounds fine, done. But music has several layers.

At the bottom there is the acoustic level: waveform, spectrum, timbre, dynamics, reverb, production. The information rate is enormous. A CD-quality stereo waveform at 44.1 kHz is over a thousand kbps. Above that is the performance level: articulation, timing, energy, instrumental control, a singer's breath. Then comes the score level: notes, rhythm, harmony, form. It is much sparser, but it contains very intentional compositional control. At the top sits the semantic level: lyrics, style, era, mood, cultural context, and those fuzzy human descriptions like "this song feels like a city at 3 a.m."

Music understanding is a compression problem. We ask a model to squeeze dense audio into useful structure. Music generation goes in the opposite direction: from a sentence, a lyric, or a style intention, the model has to expand into full acoustic reality. That expansion is naturally harder and more expensive, because every step can lose control.

This is why I no longer think music intelligence can be solved by one model or one tokenizer alone. It has to become a system: listening, reading scores, writing scores, singing, arranging, controlling form, understanding lyrics, and understanding culture.

## MERT: learning to listen first

MERT was one of my first main threads in this direction: large-scale self-supervised representation learning for music audio. The question was simple: if we want a model to understand music, it first needs to hear the useful structure inside music.

We trained on large-scale music audio with masked language modeling, combining an acoustic teacher with a more musical teacher such as CQT. The model had to recover missing information from both signal-level and music-aware views. The resulting representations transferred well to many MIR tasks.

That project taught me two things. First, scaling helps, but it is not magic. Larger models and more data improve representation quality, but stability, data quality, and training details become painfully real. Second, self-supervision generalizes well. We do not need perfect labels for every downstream task to learn something useful, because the music signal itself already contains many levels of structure.

Looking back, MERT was the first brick in a longer path: before a model can write music, it has to learn how to listen.

## ChatMusician: teaching language models to read music

Then I started asking a different question. LLMs can write code, solve math problems, and talk fluently. Can they write music?

The early answer was awkward. GPT-4 can produce ABC notation, and if you cherry-pick, some examples look fine. But many non-cherry-picked generations are short, simple, and formulaic. It feels like a smart person doing homework after quickly reading a few rules. Not useless, but far from treating music as a native language.

That was the motivation behind ChatMusician. ABC notation is a surprisingly practical score-level representation for LLMs: text-compatible, compact, and expressive enough to describe melody, rhythm, key, and repeated structure. We wanted to see whether symbolic music could become part of the model's language world.

The results were mixed in a useful way.

The good news: learning music did not obviously damage general language ability. In some places, it even looked a little like a "Mozart effect"; musical structure, timing, and abstraction might help general modeling. The uncomfortable news: advanced music understanding is still hard. We built MusicTheoryBench to test college-level music knowledge and reasoning, and it exposed how thin current models still are, including ours.

That is what a good benchmark should do. It should not only give you a place to declare victory. It should show you exactly where your model is shallow.

## YuE: singing a full song

YuE was a more ambitious step: lyrics-to-song generation at full-song scale. Not a ten-second demo, not a loop, but a song with lyrics, structure, verses, chorus, vocal, and accompaniment.

This is much harder than it looks. Songs are long. Music is more complex than speech or sound effects. Lyrics in real singing are stretched, swallowed, repeated, and distorted. Parallel lyric-audio data from the internet is noisy. Sometimes you think you are training a model to sing, but half the battle is against mismatched lyrics, bad tags, strange sources, and silent data problems.

Several design choices mattered a lot to me.

One was dual-track modeling. Vocal and accompaniment should not be collapsed into a single muddy stream; they are related objects that need to co-develop. Another was structural progressive conditioning. If you prepend the whole lyric and expect the model to infer verse, chorus, bridge, and long-range form by itself, it often fails. A more chain-of-thought-like generation process, where structure enters progressively, makes the problem more learnable.

Music in-context learning was another fascinating part. Audio conditioning is extremely strong for music. Five seconds of reference audio can carry genre, emotion, instrumentation, vocal timbre, BPM, chords, and melody. That gives powerful control, but it also creates shortcuts. The model can become a copying machine instead of a creative system. We used delayed activation and related tricks to make the reference audio a condition for style and voice, not merely an excuse to copy.

Many experiments failed. Some tokenizers did not converge. Invalid token rates were too high. Unconditional pretraining looked promising at one scale but broke at another. Introducing ICL too early made the model copy. Speech data helped lyric following, but too much speech made the model read lyrics instead of sing them.

One practical lesson became very clear: **if a small run shows no sign of life, scale usually will not rescue it.** If a 0.5B model trained on tens of billions of tokens cannot produce valid sound, jumping to 7B and trillion-token training often just makes the failure more expensive. Scale is an amplifier, not a miracle button.

## The annoying part of music modeling

There is one fact about music generation that remains deeply annoying: lower loss does not automatically mean better music.

Loss matters. Better loss usually means better compression of the distribution, better lyric following, and more local consistency. But musicality is not just next-token accuracy. A model can be stable, clear, and obedient while producing something lifeless. Another model can be rougher but still contain something that feels like musical intention.

That is why human evaluation is still unavoidable. We can design vocal agility metrics, lyric alignment measures, representation probes, and downstream tests. But at some point someone has to listen and ask: does this feel like a song? Does the chorus arrive? Do the vocal and accompaniment understand each other? Is the model singing, or merely reading the lyrics aloud?

I do not think that makes the work unscientific. Music is part of human perception. Good science here should not pretend subjective experience does not exist. It should break it down, measure what can be measured, align with human judgment, and still admit that some truth returns to the ear.

## Why this is still worth doing

Sometimes teaching AGI music feels almost embarrassingly romantic. Everyone is talking about coding agents, reasoning, tools, and productivity. Music can look like a luxury problem.

I do not believe that anymore.

If AGI can solve tasks but cannot understand why humans sing, dance, and need music at both weddings and funerals, then its model of the human world is incomplete. Music is compressed emotion, social relation, and cultural memory. It forces a model to deal with time, structure, body, language, and aesthetics at once. It also asks a harder question: intelligence is not only about getting the answer right; it is also about creating something people want to return to.

MERT, ChatMusician, and YuE are not three separate projects to me. They are three stages of the same path: hear music, read music, then try to sing music.

The path is not finished. Open music models still need better audio quality, stronger control, clearer copyright boundaries, better data governance, and more honest evaluation. But I like that this problem does not let us hide behind clever demos forever. A good music model has to survive full songs, real listeners, cultural context, and actual creative workflows.

That is hard. That is why it is worth doing.

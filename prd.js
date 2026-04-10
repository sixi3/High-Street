// High Street — PRD Landing Page Generator
// Run: node prd.js
// Outputs: prototype/prd.html

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'prototype/prd.html');

const html = /* html */`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>High Street — PRD</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

  <style>
    /* ── MELODRAMA VARIABLE FONT ─────────────────── */
    @font-face {
      font-family: 'Melodrama';
      src: url('melodrama/Melodrama-Variable.woff2') format('woff2-variations'),
           url('melodrama/Melodrama-Variable.woff')  format('woff');
      font-weight: 300 700;
      font-display: swap;
      font-style: normal;
    }

    /* ── DESIGN TOKENS ───────────────────────────── */
    :root {
      --blue:      #1F4EF5;
      --blue-dark: #1238C8;
      --blue-dim:  #E8EFFE;
      --red:       #E83020;
      --red-dim:   #FDECEA;
      --yellow:    #FFD542;
      --black:     #080808;
      --grey-1:    #1C1C1C;
      --grey-2:    #555555;
      --grey-3:    #999999;
      --grey-4:    #CCCCCC;
      --grey-5:    #E8E8E8;
      --grey-6:    #F5F5F5;
      --white:     #FFFFFF;
      --cream:     #F9F8F5;
      --display:   'Melodrama', system-ui, serif;
      --body:      'Space Grotesk', system-ui, sans-serif;
      --mono:      'Space Mono', monospace;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--body);
      background: var(--white);
      color: var(--black);
      overflow-x: hidden;
      cursor: none;
    }

    /* ── CURSOR ──────────────────────────────────── */
    #cur  { width:10px;height:10px;background:var(--blue);border-radius:50%;position:fixed;z-index:9999;pointer-events:none;transform:translate(-50%,-50%);transition:transform .15s,background .2s,width .2s,height .2s; }
    #curl { width:36px;height:36px;border:1.5px solid var(--blue);border-radius:50%;position:fixed;z-index:9998;pointer-events:none;transform:translate(-50%,-50%);opacity:.4;transition:transform .45s cubic-bezier(.23,1,.32,1),opacity .3s; }

    /* ── SCROLL REVEAL ───────────────────────────── */
    .r { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.23,1,.32,1),transform .7s cubic-bezier(.23,1,.32,1); }
    .r.v { opacity:1; transform:none; }
    .d1{transition-delay:.07s}.d2{transition-delay:.14s}.d3{transition-delay:.22s}
    .d4{transition-delay:.30s}.d5{transition-delay:.40s}
    .r.from-left { transform:translateX(-28px); }
    .r.from-left.v { transform:none; }

    /* ── TOP NAV ─────────────────────────────────── */
    .nav {
      position:fixed; top:0; left:0; right:0; z-index:200;
      height:54px;
      display:flex; align-items:center; justify-content:space-between;
      padding:0 32px;
      background:rgba(255,255,255,.93);
      backdrop-filter:blur(24px);
      border-bottom:1px solid var(--grey-5);
    }
    .nav-logo {
      font-family:var(--display);
      font-size:18px; color:var(--black);
      font-weight:700;
      font-variation-settings:'wght' 700;
      letter-spacing:.03em;
      text-decoration:none;
      transition:font-variation-settings .3s,color .2s;
    }
    .nav-logo:hover { color:var(--blue); font-variation-settings:'wght' 300; }
    .nav-links { display:flex; gap:2px; }
    .nav-link {
      font-size:13px; font-weight:500; color:var(--grey-2);
      padding:7px 13px; border-radius:6px;
      text-decoration:none; transition:background .15s,color .15s;
    }
    .nav-link:hover { background:var(--grey-6); color:var(--black); }
    .nav-tag {
      font-family:var(--mono); font-size:10px;
      color:var(--grey-3); letter-spacing:.08em;
    }

    /* ── HERO ────────────────────────────────────── */
    .hero {
      min-height:100vh;
      padding-top:54px;
      display:flex; flex-direction:column;
      position:relative; overflow:hidden;
      background:var(--white);
    }
    .hero-grid {
      position:absolute; inset:0;
      background-image:radial-gradient(circle,var(--grey-4) 1px,transparent 1px);
      background-size:28px 28px;
      opacity:.35; pointer-events:none;
    }
    .hero-grid-fade {
      position:absolute; inset:0;
      background:radial-gradient(ellipse 80% 80% at 50% 50%,transparent 15%,white 72%);
      pointer-events:none;
    }
    .hero-content {
      position:relative; z-index:1;
      flex:1; display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      text-align:center; padding:60px 32px 40px;
    }
    .hero-badge {
      display:inline-flex; align-items:center; gap:8px;
      background:var(--black); color:white;
      font-family:var(--mono); font-size:10px; letter-spacing:.12em;
      padding:7px 18px; border-radius:2px; margin-bottom:44px;
      opacity:0; animation:up .7s .15s cubic-bezier(.23,1,.32,1) forwards;
    }
    .hero-badge-dot { width:5px;height:5px;background:var(--blue);border-radius:50%;animation:blink 2s infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }

    .hero-h1 {
      font-family:var(--display);
      font-size:clamp(80px,14vw,196px);
      line-height:.85;
      letter-spacing:-.02em;
      margin-bottom:0;
      opacity:0; animation:up .9s .3s cubic-bezier(.23,1,.32,1) forwards;
    }
    /* Editorial weight contrast — key frontend-design move */
    .hero-h1 .light {
      font-weight:300;
      font-variation-settings:'wght' 300;
      display:block;
      color:var(--grey-4);
    }
    .hero-h1 .bold {
      font-weight:700;
      font-variation-settings:'wght' 700;
      display:block;
      color:var(--black);
    }
    .hero-h1 .bold.blue {
      color:var(--blue);
    }

    .hero-sub {
      font-size:clamp(15px,1.8vw,19px); font-weight:400;
      color:var(--grey-2); max-width:520px;
      line-height:1.65; margin:36px 0 44px;
      opacity:0; animation:up .9s .5s cubic-bezier(.23,1,.32,1) forwards;
    }
    .hero-btns {
      display:flex; gap:10px; justify-content:center;
      opacity:0; animation:up .9s .65s cubic-bezier(.23,1,.32,1) forwards;
    }
    .btn {
      font-family:var(--body); font-size:13px; font-weight:600;
      padding:12px 26px; border-radius:4px; text-decoration:none; border:none;
      transition:transform .15s,box-shadow .15s,background .15s; cursor:none;
      letter-spacing:.02em;
    }
    .btn:hover { transform:translateY(-2px); }
    .btn-solid { background:var(--blue); color:white; }
    .btn-solid:hover { background:var(--blue-dark); box-shadow:0 10px 28px rgba(31,78,245,.3); }
    .btn-ghost { background:transparent; color:var(--grey-2); border:1.5px solid var(--grey-4); }
    .btn-ghost:hover { border-color:var(--black); color:var(--black); box-shadow:0 4px 14px rgba(0,0,0,.07); }
    @keyframes up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

    .hero-stats {
      display:grid; grid-template-columns:repeat(4,1fr);
      border-top:1px solid var(--grey-5);
      opacity:0; animation:up .9s .85s cubic-bezier(.23,1,.32,1) forwards;
    }
    .hstat {
      padding:24px 36px; border-right:1px solid var(--grey-5);
      transition:background .2s;
    }
    .hstat:last-child { border-right:none; }
    .hstat:hover { background:var(--grey-6); }
    .hstat-n {
      font-family:var(--display);
      font-weight:700; font-variation-settings:'wght' 700;
      font-size:40px; color:var(--black); line-height:1; margin-bottom:5px;
    }
    .hstat-n span { color:var(--blue); }
    .hstat-l {
      font-family:var(--mono); font-size:10px;
      color:var(--grey-3); letter-spacing:.08em; text-transform:uppercase;
    }

    /* ── MARQUEE TICKER ──────────────────────────── */
    .ticker {
      overflow:hidden; white-space:nowrap;
      border-top:1px solid var(--grey-5);
      border-bottom:1px solid var(--grey-5);
      background:var(--black);
      padding:13px 0;
    }
    .ticker-track {
      display:inline-flex; gap:0;
      animation:marquee 28s linear infinite;
    }
    .ticker-item {
      font-family:var(--mono); font-size:11px;
      color:rgba(255,255,255,.45); letter-spacing:.1em; text-transform:uppercase;
      padding:0 32px; white-space:nowrap;
    }
    .ticker-item .up   { color:var(--yellow); }
    .ticker-item .down { color:var(--red); }
    .ticker-sep { color:rgba(255,255,255,.15); padding:0 4px; }
    @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    /* ── SECTION SCAFFOLD ────────────────────────── */
    .wrap { max-width:1280px; margin:0 auto; padding:0 48px; }
    .section { padding:108px 0; }
    .section.bg-cream { background:var(--cream); }
    .section.bg-dark  { background:var(--black); color:white; }

    .kicker {
      display:flex; align-items:center; gap:10px; margin-bottom:20px;
    }
    .kicker-num   { font-family:var(--mono); font-size:10px; color:var(--blue); letter-spacing:.12em; }
    .kicker-line  { width:28px; height:1px; background:var(--blue); }
    .kicker-label { font-family:var(--mono); font-size:10px; color:var(--grey-3); letter-spacing:.12em; text-transform:uppercase; }

    /* Editorial display titles: mix weights in same heading */
    .display-title {
      font-family:var(--display);
      line-height:.88; letter-spacing:-.02em;
    }
    .display-title .w7 {
      font-weight:700; font-variation-settings:'wght' 700;
      display:block; font-size:clamp(52px,6.5vw,100px);
    }
    .display-title .w3 {
      font-weight:300; font-variation-settings:'wght' 300;
      display:block; font-size:clamp(52px,6.5vw,100px);
      color:var(--grey-3);
    }
    .display-title .blue { color:var(--blue); }
    .display-title .red  { color:var(--red); }

    .section-body {
      font-size:17px; line-height:1.7;
      color:var(--grey-2); max-width:580px;
    }
    hr.div { border:none; border-top:1px solid var(--grey-5); margin:0; }
    .two   { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
    .three { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }

    /* ── PROBLEM CARDS ───────────────────────────── */
    .prob-card {
      background:white; border:1px solid var(--grey-5); border-radius:4px;
      padding:36px 30px; position:relative; overflow:hidden;
      transition:border-color .25s,transform .25s;
    }
    .prob-card::before {
      content:''; position:absolute; top:0; left:0; width:3px; height:0;
      background:var(--blue); transition:height .3s cubic-bezier(.23,1,.32,1);
    }
    .prob-card:hover::before { height:100%; }
    .prob-card:hover { border-color:var(--blue); transform:translateY(-2px); }
    .prob-n {
      font-family:var(--display); font-weight:700;
      font-variation-settings:'wght' 700;
      font-size:72px; color:var(--grey-5); line-height:1; margin-bottom:16px;
    }
    .prob-who  { font-family:var(--mono); font-size:10px; color:var(--blue); letter-spacing:.12em; text-transform:uppercase; margin-bottom:8px; }
    .prob-title {
      font-family:var(--display); font-weight:700;
      font-variation-settings:'wght' 700;
      font-size:26px; line-height:1.1; margin-bottom:12px;
    }
    .prob-text  { font-size:14px; line-height:1.65; color:var(--grey-2); }

    /* ── QUOTE STRIP ─────────────────────────────── */
    .quote-strip { background:var(--blue); padding:104px 48px; }
    .quote-inner { max-width:1280px; margin:0 auto; }
    .quote-eyebrow { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.4); letter-spacing:.15em; text-transform:uppercase; margin-bottom:32px; }
    .quote-text {
      font-family:var(--display);
      color:white; line-height:.9; letter-spacing:-.02em;
      margin-bottom:0;
    }
    .quote-text .qw7 {
      font-weight:700; font-variation-settings:'wght' 700;
      font-size:clamp(44px,6vw,88px);
      display:block;
    }
    .quote-text .qw3 {
      font-weight:300; font-variation-settings:'wght' 300;
      font-size:clamp(44px,6vw,88px);
      display:block;
      opacity:.55;
    }
    .quote-text .yellow { color:var(--yellow); }

    /* ── FEATURES ────────────────────────────────── */
    .feat-sticky { position:sticky; top:66px; }
    .feat-intro  { font-size:15px; line-height:1.75; color:var(--grey-2); margin-bottom:32px; }
    .legend      { display:flex; flex-direction:column; gap:8px; margin-top:28px; }
    .leg-row     { display:flex; align-items:center; gap:10px; font-size:13px; color:var(--grey-2); }

    .feat-groups { display:flex; flex-direction:column; gap:0; }
    .feat-group-label {
      font-family:var(--mono); font-size:9px; letter-spacing:.12em; text-transform:uppercase;
      color:var(--grey-3); padding:20px 0 6px; border-top:1px solid var(--grey-5); margin-top:16px;
    }
    .feat-group-label:first-child { margin-top:0; border-top:none; padding-top:0; }
    .feat-row {
      display:grid; grid-template-columns:48px 1fr auto;
      gap:12px; align-items:start; padding:12px 14px; border-radius:4px; transition:background .15s;
    }
    .feat-row:hover { background:var(--grey-6); }
    .feat-id   { font-family:var(--mono); font-size:10px; color:var(--grey-3); padding-top:2px; }
    .feat-name { font-size:14px; font-weight:600; line-height:1.4; }
    .feat-sub  { font-size:11px; color:var(--grey-3); margin-top:2px; }

    .tag { font-family:var(--mono); font-size:9px; font-weight:700; letter-spacing:.08em; padding:4px 10px; border-radius:2px; white-space:nowrap; align-self:start; }
    .tag.p0 { background:var(--red-dim); color:var(--red); }
    .tag.p1 { background:var(--blue-dim); color:var(--blue); }
    .tag.p2 { background:var(--grey-6); color:var(--grey-2); }

    /* ── MARKET TYPE CARDS ───────────────────────── */
    .mkt-card {
      background:white; border:1px solid var(--grey-5); border-radius:4px; padding:30px 26px;
      transition:box-shadow .2s,transform .2s; position:relative;
    }
    .mkt-card:hover { box-shadow:0 14px 44px rgba(0,0,0,.08); transform:translateY(-2px); }
    .mkt-card.featured { background:var(--black); border-color:var(--black); }
    .mkt-top-bar { height:2px; margin-bottom:26px; }
    .mkt-top-bar.blue   { background:var(--blue); }
    .mkt-top-bar.red    { background:var(--red); }
    .mkt-top-bar.yellow { background:var(--yellow); }
    .mkt-top-bar.white  { background:rgba(255,255,255,.25); }
    .mkt-label { font-family:var(--mono); font-size:9px; color:var(--grey-3); letter-spacing:.12em; text-transform:uppercase; margin-bottom:10px; }
    .mkt-card.featured .mkt-label { color:rgba(255,255,255,.4); }
    .mkt-title {
      font-family:var(--display); font-weight:700;
      font-variation-settings:'wght' 700;
      font-size:24px; line-height:1.1; margin-bottom:12px;
    }
    .mkt-card.featured .mkt-title { color:white; }
    .mkt-eg { font-size:12px; font-style:italic; color:var(--grey-2); background:var(--grey-6); border-radius:2px; padding:10px 13px; margin-bottom:16px; line-height:1.55; }
    .mkt-card.featured .mkt-eg  { background:rgba(255,255,255,.07); color:rgba(255,255,255,.6); }
    .mkt-oracle-l { font-family:var(--mono); font-size:9px; color:var(--grey-3); letter-spacing:.1em; text-transform:uppercase; margin-bottom:5px; }
    .mkt-card.featured .mkt-oracle-l { color:rgba(255,255,255,.35); }
    .mkt-oracle { font-size:13px; font-weight:500; color:var(--black); }
    .mkt-card.featured .mkt-oracle { color:rgba(255,255,255,.85); }

    /* ── ARCH STACK ──────────────────────────────── */
    .arch { display:flex; flex-direction:column; gap:0; margin-top:56px; border:1px solid var(--grey-5); border-radius:4px; overflow:hidden; }
    .arch-row { display:grid; gap:0; border-bottom:1px solid var(--grey-5); }
    .arch-row:last-child { border-bottom:none; }
    .arch-row.r-1 { grid-template-columns:88px 1fr; }
    .arch-row.r-2 { grid-template-columns:88px 1fr 1fr; }
    .arch-row.r-3 { grid-template-columns:88px 1fr 1fr; }
    .arch-row.r-4 { grid-template-columns:88px 1fr; }
    .arch-cell { padding:22px 26px; border-right:1px solid var(--grey-5); transition:background .15s; }
    .arch-cell:last-child { border-right:none; }
    .arch-cell:hover { background:var(--grey-6); }
    .arch-label-cell { background:var(--grey-6); display:flex; align-items:center; justify-content:center; }
    .arch-label-text { font-family:var(--mono); font-size:9px; color:var(--grey-3); text-transform:uppercase; letter-spacing:.12em; writing-mode:vertical-rl; transform:rotate(180deg); }
    .arch-cell-hero { background:var(--black); }
    .arch-cell-hero:hover { background:#111; }
    .arch-cell-blue { background:var(--blue-dim); }
    .arch-h { font-size:13px; font-weight:600; margin-bottom:4px; }
    .arch-cell-hero .arch-h { color:white; }
    .arch-cell-blue .arch-h { color:var(--blue-dark); }
    .arch-s { font-size:11px; color:var(--grey-2); line-height:1.55; }
    .arch-cell-hero .arch-s { color:rgba(255,255,255,.4); }
    .arch-connector { display:flex; align-items:center; justify-content:center; padding:10px; background:var(--grey-6); font-size:14px; color:var(--grey-3); border-bottom:1px solid var(--grey-5); }

    /* ── BUILD TABLE ─────────────────────────────── */
    .btable { width:100%; border-collapse:collapse; margin-top:48px; font-size:13px; }
    .btable th { font-family:var(--mono); font-size:9px; letter-spacing:.12em; text-transform:uppercase; color:var(--grey-3); font-weight:500; padding:10px 18px; text-align:left; border-bottom:1px solid var(--grey-5); background:var(--grey-6); }
    .btable td { padding:13px 18px; border-bottom:1px solid var(--grey-5); vertical-align:top; }
    .btable tr:last-child td { border-bottom:none; }
    .btable tr:hover td { background:var(--grey-6); }
    .badge { display:inline-flex; align-items:center; gap:4px; font-family:var(--mono); font-size:10px; font-weight:700; padding:3px 9px; border-radius:2px; }
    .badge.yes     { background:#DCFCE7; color:#166534; }
    .badge.partial { background:#FEF9C3; color:#854D0E; }
    .badge.new     { background:var(--grey-6); color:var(--grey-2); }

    /* ── REVENUE ─────────────────────────────────── */
    .rev-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-top:56px; }
    .rev-card {
      background:white; border:1px solid var(--grey-5); border-radius:4px; padding:26px 20px;
      transition:box-shadow .2s,transform .2s;
    }
    .rev-card:hover { box-shadow:0 10px 32px rgba(0,0,0,.07); transform:translateY(-2px); }
    .rev-phase { font-family:var(--mono); font-size:9px; color:var(--grey-3); letter-spacing:.1em; text-transform:uppercase; margin-bottom:16px; }
    .rev-icon  { font-size:22px; margin-bottom:10px; display:block; }
    .rev-name  { font-size:12px; font-weight:600; margin-bottom:6px; }
    .rev-rate  {
      font-family:var(--display); font-weight:700;
      font-variation-settings:'wght' 700;
      font-size:30px; color:var(--blue); margin-bottom:6px; line-height:1;
    }
    .rev-desc  { font-size:11px; color:var(--grey-3); line-height:1.55; }

    /* ── METRICS ─────────────────────────────────── */
    .met-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; margin-top:56px; background:var(--grey-5); border:1px solid var(--grey-5); }
    .met-card {
      background:white; padding:40px 32px;
      transition:background .2s;
    }
    .met-card:hover { background:var(--grey-6); }
    .met-n {
      font-family:var(--display); font-weight:700;
      font-variation-settings:'wght' 700;
      font-size:60px; line-height:1; color:var(--black); margin-bottom:10px;
    }
    .met-n sub { font-size:24px; color:var(--blue); vertical-align:baseline; }
    .met-l { font-size:14px; font-weight:600; margin-bottom:4px; }
    .met-d { font-family:var(--mono); font-size:10px; color:var(--grey-3); letter-spacing:.06em; }

    /* ── ROADMAP ─────────────────────────────────── */
    .road { display:flex; flex-direction:column; gap:0; margin-top:56px; }
    .road-phase {
      display:grid; grid-template-columns:64px 1fr; gap:28px;
      padding:36px 0; border-bottom:1px solid var(--grey-5);
    }
    .road-phase:last-child { border-bottom:none; }
    .road-left { display:flex; flex-direction:column; align-items:center; padding-top:8px; }
    .road-dot  { width:10px; height:10px; background:var(--blue); border-radius:50%; border:2px solid white; box-shadow:0 0 0 2px var(--blue); margin-bottom:10px; }
    .road-num  { font-family:var(--mono); font-size:10px; color:var(--grey-3); }
    .road-title {
      font-family:var(--display); font-weight:700;
      font-variation-settings:'wght' 700;
      font-size:30px; margin-bottom:4px; line-height:1.05;
      transition:font-variation-settings .3s;
    }
    .road-phase:hover .road-title { font-variation-settings:'wght' 300; }
    .road-time  { font-family:var(--mono); font-size:10px; color:var(--blue); letter-spacing:.1em; margin-bottom:16px; }
    .road-chips { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px; }
    .chip { font-size:11px; font-weight:500; color:var(--grey-1); padding:5px 12px; border-radius:20px; background:var(--grey-6); border:1px solid var(--grey-5); }
    .road-tgt { font-size:13px; color:var(--grey-2); display:flex; align-items:center; gap:6px; }
    .road-tgt strong { color:var(--black); font-weight:600; }

    /* ── OOS ─────────────────────────────────────── */
    .oos-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-top:48px; }
    .oos-card { background:var(--grey-6); border-radius:4px; padding:16px 18px; display:flex; gap:12px; font-size:12px; color:var(--grey-2); line-height:1.55; }
    .oos-x    { font-family:var(--mono); font-size:11px; color:var(--grey-4); flex-shrink:0; padding-top:1px; }

    /* ── BIG WORD INTERSTITIAL ───────────────────── */
    .big-word-section {
      background:var(--black); overflow:hidden;
      padding:80px 0; position:relative;
    }
    .big-word {
      font-family:var(--display); font-weight:700;
      font-variation-settings:'wght' 700;
      font-size:clamp(120px,18vw,260px);
      line-height:.82; letter-spacing:-.03em;
      white-space:nowrap; color:transparent;
      -webkit-text-stroke:1px rgba(255,255,255,.12);
      display:block; padding:0 40px;
      animation:wordslide 18s linear infinite;
    }
    @keyframes wordslide {
      0%   { transform:translateX(0); }
      100% { transform:translateX(-10%); }
    }

    /* ── FOOTER ──────────────────────────────────── */
    .footer { background:var(--black); color:white; padding:80px 48px 48px; }
    .foot-top { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:64px; }
    .foot-word {
      font-family:var(--display); letter-spacing:-.03em; line-height:.85;
    }
    .foot-word .fw7 {
      font-weight:700; font-variation-settings:'wght' 700;
      font-size:clamp(64px,10vw,140px); display:block; color:white;
    }
    .foot-word .fw3 {
      font-weight:300; font-variation-settings:'wght' 300;
      font-size:clamp(64px,10vw,140px); display:block; color:rgba(255,255,255,.25);
    }
    .foot-right { max-width:320px; text-align:right; }
    .foot-right p { font-size:13px; line-height:1.7; color:rgba(255,255,255,.3); margin-bottom:14px; }
    .foot-meta { display:flex; justify-content:space-between; font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.2); letter-spacing:.06em; border-top:1px solid rgba(255,255,255,.08); padding-top:24px; }

    /* ── INTEGRITY SECTION (DARK) ─────────────────── */
    .section.bg-dark { background:var(--black); color:white; }
    .section.bg-dark .kicker-num { color:var(--yellow); }
    .section.bg-dark .kicker-line { background:var(--yellow); }
    .section.bg-dark .kicker-label { color:rgba(255,255,255,.35); }
    .section.bg-dark .display-title .w3 { color:rgba(255,255,255,.28); }
    .section.bg-dark .display-title .w7 { color:white; }
    .section.bg-dark .display-title .w7.yellow { color:var(--yellow); }
    .section.bg-dark .section-body { color:rgba(255,255,255,.55); }

    /* Insider network hero */
    .ins-hero-label {
      font-family:var(--mono); font-size:10px;
      color:rgba(255,255,255,.35); letter-spacing:.14em;
      text-transform:uppercase; margin-bottom:20px;
      display:flex; align-items:center; gap:10px;
    }
    .ins-hero-label::before {
      content:''; width:6px; height:6px; background:var(--red); border-radius:50%;
      animation:blink 2s infinite;
    }
    .ins-network { width:100%; height:auto; display:block; }
    .ins-network .center-pulse {
      transform-origin:600px 190px;
      animation:pulseRing 3s ease-out infinite;
    }
    @keyframes pulseRing {
      0%   { transform:scale(.9); opacity:.6; }
      70%  { transform:scale(1.35); opacity:0; }
      100% { transform:scale(1.35); opacity:0; }
    }
    .ins-network-caption {
      display:flex; justify-content:space-between; align-items:center;
      margin-top:14px; padding-top:14px; border-top:1px solid rgba(255,255,255,.08);
      font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.35);
      letter-spacing:.1em; text-transform:uppercase;
    }
    .ins-network-caption strong { color:var(--yellow); font-weight:700; }

    /* Comparison table */
    .ins-compare {
      margin-top:80px; border:1px solid rgba(255,255,255,.1);
      border-radius:4px; overflow:hidden;
    }
    .ins-compare-head {
      display:grid; grid-template-columns:1.4fr 1fr 1fr 1.2fr;
      background:rgba(255,255,255,.03);
      border-bottom:1px solid rgba(255,255,255,.1);
    }
    .ins-compare-head > div {
      padding:22px 24px; border-right:1px solid rgba(255,255,255,.08);
      font-family:var(--mono); font-size:10px; letter-spacing:.12em;
      text-transform:uppercase; color:rgba(255,255,255,.4);
    }
    .ins-compare-head > div:last-child { border-right:none; }
    .ins-compare-head .hs {
      background:var(--blue); color:white; font-weight:700;
    }
    .ins-row {
      display:grid; grid-template-columns:1.4fr 1fr 1fr 1.2fr;
      border-bottom:1px solid rgba(255,255,255,.06);
    }
    .ins-row:last-child { border-bottom:none; }
    .ins-row > div {
      padding:18px 24px; border-right:1px solid rgba(255,255,255,.06);
      font-size:13px; color:rgba(255,255,255,.75);
      display:flex; align-items:center; gap:8px;
    }
    .ins-row > div:last-child { border-right:none; }
    .ins-row > div:first-child { font-weight:600; color:white; }
    .ins-row .hs { background:rgba(31,78,245,.08); color:white; }
    .ins-chk {
      font-family:var(--mono); font-size:11px; font-weight:700;
    }
    .ins-chk.y { color:var(--yellow); }
    .ins-chk.n { color:rgba(255,255,255,.25); }

    /* Defense stack — 5 cards */
    .ins-stack-head {
      margin-top:96px; margin-bottom:28px;
      display:flex; justify-content:space-between; align-items:flex-end;
    }
    .ins-stack-title {
      font-family:var(--display); font-weight:700;
      font-variation-settings:'wght' 700;
      font-size:44px; line-height:.95; letter-spacing:-.01em;
    }
    .ins-stack-title .y { color:var(--yellow); }
    .ins-stack-meta {
      font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.35);
      letter-spacing:.1em; text-transform:uppercase;
    }
    .ins-stack {
      display:grid; grid-template-columns:repeat(5,1fr); gap:10px;
    }
    .ins-card {
      background:#0E0E0E; border:1px solid rgba(255,255,255,.08);
      border-radius:4px; padding:26px 22px;
      display:flex; flex-direction:column;
      position:relative; overflow:hidden;
      transition:transform .3s cubic-bezier(.23,1,.32,1),
                  border-color .3s, background .3s;
    }
    .ins-card::before {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background:var(--yellow); transform:scaleX(0);
      transform-origin:left; transition:transform .4s cubic-bezier(.23,1,.32,1);
    }
    .ins-card:hover { transform:translateY(-4px); border-color:rgba(255,213,66,.3); background:#111; }
    .ins-card:hover::before { transform:scaleX(1); }
    .ins-phase {
      font-family:var(--mono); font-size:9px; color:var(--yellow);
      letter-spacing:.14em; text-transform:uppercase; margin-bottom:18px;
      display:flex; align-items:center; gap:8px;
    }
    .ins-phase-dot {
      width:5px; height:5px; background:var(--yellow); border-radius:50%;
    }
    .ins-illust {
      height:110px; display:flex; align-items:center; justify-content:center;
      margin-bottom:20px; padding:8px 0;
    }
    .ins-illust svg { width:100%; height:100%; max-width:140px; }
    .ins-name {
      font-family:var(--display); font-weight:700;
      font-variation-settings:'wght' 700;
      font-size:19px; line-height:1.1; margin-bottom:10px; color:white;
    }
    .ins-desc {
      font-size:12px; color:rgba(255,255,255,.5); line-height:1.6;
      margin-bottom:16px; flex:1;
    }
    .ins-mech {
      font-family:var(--mono); font-size:9px; color:rgba(255,255,255,.4);
      letter-spacing:.06em; text-transform:uppercase;
      padding-top:14px; border-top:1px solid rgba(255,255,255,.08);
    }
    .ins-mech strong { color:var(--yellow); font-weight:700; }

    /* Bottom headline */
    .ins-headline {
      margin-top:96px; text-align:center;
      padding:56px 24px; border-top:1px solid rgba(255,255,255,.08);
    }
    .ins-headline-q {
      font-family:var(--display); font-weight:300;
      font-variation-settings:'wght' 300;
      font-size:clamp(28px,3.4vw,46px); line-height:1.1;
      color:rgba(255,255,255,.45); max-width:900px; margin:0 auto 18px;
    }
    .ins-headline-a {
      font-family:var(--display); font-weight:700;
      font-variation-settings:'wght' 700;
      font-size:clamp(32px,4vw,56px); line-height:1.05;
      color:white; max-width:1000px; margin:0 auto;
    }
    .ins-headline-a .y { color:var(--yellow); }

    /* ── HELPERS ─────────────────────────────────── */
    .mt48 { margin-top:48px; } .mt64 { margin-top:64px; }
  </style>
</head>
<body>

<div id="cur"></div>
<div id="curl"></div>

<!-- ── NAV ──────────────────────────────────────────── -->
<nav class="nav">
  <a href="#" class="nav-logo">HIGH STREET</a>
  <div class="nav-links">
    <a href="#overview"  class="nav-link">Overview</a>
    <a href="#features"  class="nav-link">Features</a>
    <a href="#markets"   class="nav-link">Markets</a>
    <a href="#integrity" class="nav-link">Integrity</a>
    <a href="#tech"      class="nav-link">Tech</a>
    <a href="#roadmap"   class="nav-link">Roadmap</a>
  </div>
  <span class="nav-tag">PRD v1.0 · April 2026</span>
</nav>

<!-- ── HERO ─────────────────────────────────────────── -->
<header class="hero">
  <div class="hero-grid"></div>
  <div class="hero-grid-fade"></div>
  <div class="hero-content">
    <div class="hero-badge"><span class="hero-badge-dot"></span>PRODUCT REQUIREMENTS DOCUMENT</div>
    <h1 class="hero-h1">
      <span class="light">HIGH</span>
      <span class="bold blue">STREET</span>
    </h1>
    <p class="hero-sub">A fashion prediction market where consumers trade on trend outcomes — powered by FI's AI intelligence stack and settled on Base L2.</p>
    <div class="hero-btns">
      <a href="#overview" class="btn btn-solid">Read the PRD</a>
      <a href="index.html" class="btn btn-ghost">Launch Prototype →</a>
      <a href="#roadmap"  class="btn btn-ghost">View Roadmap</a>
    </div>
  </div>
  <div class="hero-stats">
    <div class="hstat"><div class="hstat-n">50K<span>+</span></div><div class="hstat-l">MAU Target · Month 12</div></div>
    <div class="hstat"><div class="hstat-n">$1M<span>+</span></div><div class="hstat-l">Monthly Trading Volume</div></div>
    <div class="hstat"><div class="hstat-n">60<span>%</span></div><div class="hstat-l">Tech Stack Exists (FI)</div></div>
    <div class="hstat"><div class="hstat-n">5</div><div class="hstat-l">Revenue Streams</div></div>
  </div>
</header>

<!-- ── MARQUEE TICKER ────────────────────────────────── -->
<div class="ticker">
  <div class="ticker-track">
    <span class="ticker-item">DEMNA STAYS AT BALENCIAGA <span class="ticker-sep">·</span> YES <span class="up">72%</span></span>
    <span class="ticker-item">QUIET LUXURY DOMINANT FALL '26 <span class="ticker-sep">·</span> YES <span class="up">68%</span></span>
    <span class="ticker-item">NIKE × JACQUEMUS SELLS OUT <span class="ticker-sep">·</span> YES <span class="up">81%</span></span>
    <span class="ticker-item">GORPCORE PEAK BY Q3 <span class="ticker-sep">·</span> NO <span class="down">44%</span></span>
    <span class="ticker-item">MARC JACOBS COMEBACK SHOW '26 <span class="ticker-sep">·</span> YES <span class="up">59%</span></span>
    <span class="ticker-item">MESH TOPS TOP SEARCH BY JUNE <span class="ticker-sep">·</span> YES <span class="up">76%</span></span>
    <span class="ticker-item">MET GALA BEST DRESSED · ZENDAYA <span class="ticker-sep">·</span> YES <span class="up">62%</span></span>
    <span class="ticker-item">DEMNA STAYS AT BALENCIAGA <span class="ticker-sep">·</span> YES <span class="up">72%</span></span>
    <span class="ticker-item">QUIET LUXURY DOMINANT FALL '26 <span class="ticker-sep">·</span> YES <span class="up">68%</span></span>
    <span class="ticker-item">NIKE × JACQUEMUS SELLS OUT <span class="ticker-sep">·</span> YES <span class="up">81%</span></span>
    <span class="ticker-item">GORPCORE PEAK BY Q3 <span class="ticker-sep">·</span> NO <span class="down">44%</span></span>
    <span class="ticker-item">MARC JACOBS COMEBACK SHOW '26 <span class="ticker-sep">·</span> YES <span class="up">59%</span></span>
    <span class="ticker-item">MESH TOPS TOP SEARCH BY JUNE <span class="ticker-sep">·</span> YES <span class="up">76%</span></span>
    <span class="ticker-item">MET GALA BEST DRESSED · ZENDAYA <span class="ticker-sep">·</span> YES <span class="up">62%</span></span>
  </div>
</div>

<!-- ── OVERVIEW ─────────────────────────────────────── -->
<section class="section bg-cream" id="overview">
  <div class="wrap">
    <div class="two">
      <div>
        <div class="kicker r"><span class="kicker-num">01</span><span class="kicker-line"></span><span class="kicker-label">Overview</span></div>
        <h2 class="display-title r d1">
          <span class="w3">Fashion's</span>
          <span class="w7 blue">first</span>
          <span class="w3">prediction</span>
          <span class="w7">market.</span>
        </h2>
      </div>
      <div style="padding-top:52px">
        <p class="section-body r d2">High Street is a platform where users trade on fashion outcomes — trend lifecycles, runway results, designer moves, and product drops. Polymarket mechanics applied to fashion culture, with a Pinterest-style discovery feed and a commerce layer.</p>
        <p class="section-body r d3" style="margin-top:20px">Every trade generates a demand signal. Consumer prediction data feeds back into the Fashion Intelligence Company's B2B graph, making the enterprise product categorically better than any analyst-only competitor.</p>
        <div class="r d4" style="margin-top:32px;display:flex;gap:8px;flex-wrap:wrap;">
          <span class="tag p0">Fashion Prediction Market</span>
          <span class="tag p1">Built on Base L2</span>
          <span class="tag p1">Powered by FI AI Stack</span>
          <span class="tag p2">B2B Intelligence Flywheel</span>
        </div>
      </div>
    </div>
  </div>
</section>

<hr class="div">

<!-- ── PROBLEM ───────────────────────────────────────── -->
<section class="section" id="problem">
  <div class="wrap">
    <div class="kicker r"><span class="kicker-num">02</span><span class="kicker-line"></span><span class="kicker-label">Problem</span></div>
    <h2 class="display-title r d1">
      <span class="w3">Three gaps.</span>
      <span class="w7 blue">One platform.</span>
    </h2>
    <div class="three mt48">
      <div class="prob-card r d1">
        <div class="prob-n">01</div>
        <div class="prob-who">Fashion Consumers</div>
        <div class="prob-title">Opinions with no upside</div>
        <p class="prob-text">Everyone on fashion TikTok makes trend predictions. No platform lets them monetise or prove their knowledge. It lives in comments and dies there.</p>
      </div>
      <div class="prob-card r d2">
        <div class="prob-n">02</div>
        <div class="prob-who">Brands &amp; Buyers</div>
        <div class="prob-title">Forecasting is slow and expensive</div>
        <p class="prob-text">WGSN charges $50K+/year for reports from small analyst panels. There's no real-time consumer consensus — the signal that actually matters.</p>
      </div>
      <div class="prob-card r d3">
        <div class="prob-n">03</div>
        <div class="prob-who">Trend Agencies</div>
        <div class="prob-title">Data from the wrong people</div>
        <p class="prob-text">Panels of 20 analysts can't match the aggregate signal of 50,000 fashion consumers actively pricing trend probabilities with real money on the line.</p>
      </div>
    </div>
  </div>
</section>

<!-- ── QUOTE ─────────────────────────────────────────── -->
<div class="quote-strip">
  <div class="quote-inner r">
    <div class="quote-eyebrow">High Street — Product Thesis</div>
    <p class="quote-text">
      <span class="qw3">FI tells brands this trend has</span>
      <span class="qw7 yellow">8 weeks of runway.</span>
      <span class="qw3">High Street lets consumers</span>
      <span class="qw7">bet on it.</span>
    </p>
  </div>
</div>

<!-- ── FEATURES ──────────────────────────────────────── -->
<section class="section" id="features">
  <div class="wrap">
    <div class="kicker r"><span class="kicker-num">03</span><span class="kicker-line"></span><span class="kicker-label">Feature Requirements</span></div>
    <h2 class="display-title r d1">
      <span class="w3">What we're</span>
      <span class="w7 blue">building.</span>
    </h2>
    <div class="two mt48" style="gap:64px">
      <div class="feat-sticky r d2">
        <p class="feat-intro">29 requirements across five product areas. Trading mechanics follow Polymarket. Discovery experience follows Pinterest. Intelligence follows FI.</p>
        <div class="legend">
          <div class="leg-row"><span class="tag p0">P0</span> Must ship — launch blocker</div>
          <div class="leg-row"><span class="tag p1">P1</span> Phase 2 — growth enabler</div>
          <div class="leg-row"><span class="tag p2">P2</span> Phase 3+ — moat builder</div>
        </div>
      </div>
      <div class="feat-groups r d3">
        <div class="feat-group-label">Market Feed — Pinterest-style discovery</div>
        <div class="feat-row"><span class="feat-id">F-01</span><div><div class="feat-name">Masonry grid of market cards</div><div class="feat-sub">Variable-height images, 3–4 columns, infinite scroll</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-02</span><div><div class="feat-name">Featured hero markets (2-up banner)</div><div class="feat-sub">Top of feed, image-forward, event-anchored</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-03</span><div><div class="feat-name">"Moving Now" live ticker row</div><div class="feat-sub">Horizontal scroll, daily % change</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-04</span><div><div class="feat-name">Category filter pills</div><div class="feat-sub">Trends, Runway, Designers, Collabs, Met Gala, etc.</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-05</span><div><div class="feat-name">Fashion-semantic search</div><div class="feat-sub">Powered by FI's fashion-tuned embeddings</div></div><span class="tag p1">P1</span></div>
        <div class="feat-group-label">Market Detail &amp; Trading — Polymarket-style UX</div>
        <div class="feat-row"><span class="feat-id">F-07</span><div><div class="feat-name">Market detail modal</div><div class="feat-sub">Image, description, volume, traders, end date</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-08</span><div><div class="feat-name">Probability chart (time series)</div><div class="feat-sub">SVG line chart with area fill, full market lifecycle</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-09</span><div><div class="feat-name">Buy Yes / Buy No panels</div><div class="feat-sub">Live cent pricing via off-chain order book</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-10</span><div><div class="feat-name">Amount input + quick-select ($10–$100)</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-11</span><div><div class="feat-name">Live potential payout calculation</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-13</span><div><div class="feat-name">Position trading (sell before resolution)</div><div class="feat-sub">ERC-1155 position tokens on Base</div></div><span class="tag p1">P1</span></div>
        <div class="feat-group-label">Portfolio &amp; Reputation</div>
        <div class="feat-row"><span class="feat-id">F-15</span><div><div class="feat-name">Portfolio view</div><div class="feat-sub">Total value, P&amp;L, open positions with thumbnails</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-16</span><div><div class="feat-name">Trend Oracle Score</div><div class="feat-sub">On-chain: accuracy %, trades, win streak</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-17</span><div><div class="feat-name">Public Leaderboard "Trend Oracles"</div></div><span class="tag p0">P0</span></div>
        <div class="feat-row"><span class="feat-id">F-20</span><div><div class="feat-name">Soulbound Oracle Badge NFTs</div><div class="feat-sub">Non-transferable achievement tokens</div></div><span class="tag p2">P2</span></div>
        <div class="feat-group-label">Commerce Layer</div>
        <div class="feat-row"><span class="feat-id">F-21</span><div><div class="feat-name">"Shop this trend" product feed</div><div class="feat-sub">Linked to open positions via FI catalog intelligence</div></div><span class="tag p1">P1</span></div>
        <div class="feat-row"><span class="feat-id">F-22</span><div><div class="feat-name">Affiliate links (SSENSE, Farfetch, GOAT)</div><div class="feat-sub">8–15% commission</div></div><span class="tag p1">P1</span></div>
        <div class="feat-row"><span class="feat-id">F-25</span><div><div class="feat-name">Brand-sponsored markets</div><div class="feat-sub">Labeled, separate section, $5K–25K/market</div></div><span class="tag p2">P2</span></div>
      </div>
    </div>
  </div>
</section>

<hr class="div">

<!-- ── MARKET TYPES ───────────────────────────────────── -->
<section class="section bg-cream" id="markets">
  <div class="wrap">
    <div class="kicker r"><span class="kicker-num">04</span><span class="kicker-line"></span><span class="kicker-label">Market Types &amp; Resolution</span></div>
    <h2 class="display-title r d1">
      <span class="w3">Four types.</span>
      <span class="w7 blue">Zero ambiguity.</span>
    </h2>
    <p class="section-body r d2">Every market has pre-defined resolution criteria set before trading opens. The Trend Index oracle — built on FI's demand pipeline — is the advantage no competitor can replicate.</p>
    <div class="two mt48" style="gap:12px">
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="mkt-card r d1">
          <div class="mkt-top-bar blue"></div>
          <div class="mkt-label">Type 01 — Factual</div>
          <div class="mkt-title">Designer &amp; Industry Events</div>
          <div class="mkt-eg">"Will Demna leave Balenciaga before 2027?"</div>
          <div class="mkt-oracle-l">Resolution Oracle</div>
          <div class="mkt-oracle">Official announcement via BoF or WWD press coverage</div>
        </div>
        <div class="mkt-card r d2">
          <div class="mkt-top-bar red"></div>
          <div class="mkt-label">Type 02 — Event Outcome</div>
          <div class="mkt-title">Runway &amp; Red Carpet</div>
          <div class="mkt-eg">"Best dressed at Met Gala 2026?"</div>
          <div class="mkt-oracle-l">Resolution Oracle</div>
          <div class="mkt-oracle">Aggregate of Vogue, Harper's, Elle, WWD within 48h</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="mkt-card r d3">
          <div class="mkt-top-bar yellow"></div>
          <div class="mkt-label">Type 03 — Commercial</div>
          <div class="mkt-title">Drops &amp; Collabs</div>
          <div class="mkt-eg">"Nike × Jacquemus sells out in 24 hours?"</div>
          <div class="mkt-oracle-l">Resolution Oracle</div>
          <div class="mkt-oracle">Official brand / retailer sold-out status</div>
        </div>
        <div class="mkt-card featured r d4">
          <div class="mkt-top-bar white"></div>
          <div class="mkt-label">Type 04 — Trend Index ✦ FI-Powered</div>
          <div class="mkt-title">Trend Lifecycle Markets</div>
          <div class="mkt-eg">"Quiet luxury still dominant by Fall 2026?"</div>
          <div class="mkt-oracle-l">Resolution Oracle</div>
          <div class="mkt-oracle">High Street Trend Index — composite of search, social, editorial, retail — powered by FI's AI stack</div>
        </div>
      </div>
    </div>
  </div>
</section>

<hr class="div">

<!-- ── MARKET INTEGRITY ─────────────────────────────── -->
<section class="section bg-dark" id="integrity">
  <div class="wrap">
    <div class="kicker r"><span class="kicker-num">05</span><span class="kicker-line"></span><span class="kicker-label">Market Integrity</span></div>
    <h2 class="display-title r d1">
      <span class="w3">Insider trading,</span>
      <span class="w7 yellow">structurally impossible.</span>
    </h2>
    <p class="section-body r d2" style="max-width:680px">Fashion's insider networks are small and leaky. Forty people at a brand know a designer appointment before press release drops. Polymarket can't solve this — its order book is open. Kalshi excludes these markets entirely. We built a five-layer defense that turns constraint into a feature.</p>

    <!-- THE PROBLEM — network visualization -->
    <div class="r d3" style="margin-top:72px">
      <div class="ins-hero-label">THE THREAT MODEL — Fashion insider networks are small, concentrated, and leaky</div>
      <svg class="ins-network" viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid meet">
        <!-- connecting lines -->
        <g stroke="rgba(255,213,66,.18)" stroke-width="1" stroke-dasharray="2 4">
          <line x1="600" y1="190" x2="1080" y2="190"/>
          <line x1="600" y1="190" x2="940" y2="78"/>
          <line x1="600" y1="190" x2="600" y2="40"/>
          <line x1="600" y1="190" x2="260" y2="78"/>
          <line x1="600" y1="190" x2="120" y2="190"/>
          <line x1="600" y1="190" x2="260" y2="302"/>
          <line x1="600" y1="190" x2="600" y2="340"/>
          <line x1="600" y1="190" x2="940" y2="302"/>
        </g>
        <!-- center pulse rings -->
        <g class="center-pulse">
          <circle cx="600" cy="190" r="88" fill="none" stroke="#1F4EF5" stroke-width="1" opacity=".4"/>
        </g>
        <circle cx="600" cy="190" r="108" fill="none" stroke="#1F4EF5" stroke-width="1" opacity=".15"/>
        <!-- center market node -->
        <circle cx="600" cy="190" r="68" fill="#1F4EF5"/>
        <circle cx="600" cy="190" r="68" fill="none" stroke="#FFD542" stroke-width="1.5" opacity=".4"/>
        <text x="600" y="176" text-anchor="middle" fill="rgba(255,255,255,.55)" font-family="Space Mono" font-size="9" font-weight="700" letter-spacing="1">MARKET</text>
        <text x="600" y="196" text-anchor="middle" fill="white" font-family="Melodrama" font-weight="700" font-size="16">Kanye → Gucci?</text>
        <text x="600" y="214" text-anchor="middle" fill="rgba(255,255,255,.4)" font-family="Space Mono" font-size="8">RES 2026-12-31</text>

        <!-- insider nodes + labels -->
        <g font-family="Space Mono" font-size="10" font-weight="700" fill="#FFD542" letter-spacing="1">
          <circle cx="1080" cy="190" r="9" fill="#FFD542"/>
          <text x="1100" y="187">PR AGENCIES</text>
          <text x="1100" y="200" fill="rgba(255,255,255,.4)" font-weight="400">~12 people</text>

          <circle cx="940" cy="78" r="9" fill="#FFD542"/>
          <text x="960" y="75">BOARD MEMBERS</text>
          <text x="960" y="88" fill="rgba(255,255,255,.4)" font-weight="400">~8 people</text>

          <circle cx="600" cy="40" r="9" fill="#FFD542"/>
          <text x="600" y="24" text-anchor="middle">BRAND HR / EXECS</text>
          <text x="600" y="16" text-anchor="middle" fill="rgba(255,255,255,.4)" font-weight="400">~6 people</text>

          <circle cx="260" cy="78" r="9" fill="#FFD542"/>
          <text x="240" y="75" text-anchor="end">HEADHUNTERS</text>
          <text x="240" y="88" text-anchor="end" fill="rgba(255,255,255,.4)" font-weight="400">~4 people</text>

          <circle cx="120" cy="190" r="9" fill="#FFD542"/>
          <text x="100" y="187" text-anchor="end">EDITORIAL</text>
          <text x="100" y="200" text-anchor="end" fill="rgba(255,255,255,.4)" font-weight="400">BoF · Vogue · WWD</text>

          <circle cx="260" cy="302" r="9" fill="#FFD542"/>
          <text x="240" y="299" text-anchor="end">CONTRACTS LAWYERS</text>
          <text x="240" y="312" text-anchor="end" fill="rgba(255,255,255,.4)" font-weight="400">Kering legal</text>

          <circle cx="600" cy="340" r="9" fill="#FFD542"/>
          <text x="600" y="362" text-anchor="middle">SHOWROOM / STAFF</text>
          <text x="600" y="374" text-anchor="middle" fill="rgba(255,255,255,.4)" font-weight="400">patternmakers · assistants</text>

          <circle cx="940" cy="302" r="9" fill="#FFD542"/>
          <text x="960" y="299">DESIGNER CANDIDATE</text>
          <text x="960" y="312" fill="rgba(255,255,255,.4)" font-weight="400">& their team</text>
        </g>
      </svg>
      <div class="ins-network-caption">
        <span>~<strong>40 people</strong> globally know before press release</span>
        <span>EACH NODE = DIRECT MATERIAL INFORMATION ACCESS</span>
      </div>
    </div>

    <!-- COMPARISON TABLE -->
    <div class="ins-compare r d1">
      <div class="ins-compare-head">
        <div>Defense Mechanism</div>
        <div>Polymarket</div>
        <div>Kalshi</div>
        <div class="hs">★ High Street</div>
      </div>
      <div class="ins-row">
        <div>Position limits</div>
        <div><span class="ins-chk n">✕ None</span></div>
        <div><span class="ins-chk y">✓ $25K cap</span></div>
        <div class="hs"><span class="ins-chk y">✓ Tiered by risk</span></div>
      </div>
      <div class="ins-row">
        <div>Identity KYC</div>
        <div><span class="ins-chk n">~ Partial</span></div>
        <div><span class="ins-chk y">✓ Full SSN</span></div>
        <div class="hs"><span class="ins-chk y">✓ Tiered + ZK</span></div>
      </div>
      <div class="ins-row">
        <div>Time-decay payouts</div>
        <div><span class="ins-chk n">✕</span></div>
        <div><span class="ins-chk n">✕</span></div>
        <div class="hs"><span class="ins-chk y">✓ Novel</span></div>
      </div>
      <div class="ins-row">
        <div>Sealed commit-reveal markets</div>
        <div><span class="ins-chk n">✕</span></div>
        <div><span class="ins-chk n">✕</span></div>
        <div class="hs"><span class="ins-chk y">✓ High-risk only</span></div>
      </div>
      <div class="ins-row">
        <div>ZK employer non-affiliation proof</div>
        <div><span class="ins-chk n">✕</span></div>
        <div><span class="ins-chk n">✕</span></div>
        <div class="hs"><span class="ins-chk y">✓ With LVMH / Kering</span></div>
      </div>
      <div class="ins-row">
        <div>Graph-based anomaly detection</div>
        <div><span class="ins-chk n">~ Post-hoc</span></div>
        <div><span class="ins-chk n">~ Manual</span></div>
        <div class="hs"><span class="ins-chk y">✓ FI-powered</span></div>
      </div>
    </div>

    <!-- DEFENSE STACK -->
    <div class="ins-stack-head r d1">
      <div class="ins-stack-title">Five defensive<br>layers, <span class="y">stacked.</span></div>
      <div class="ins-stack-meta">Phase 1 → Phase 5</div>
    </div>

    <div class="ins-stack">

      <!-- 01 — Position Limits & KYC -->
      <div class="ins-card r d1">
        <div class="ins-phase"><span class="ins-phase-dot"></span>LAYER 01 · PHASE 1</div>
        <div class="ins-illust">
          <svg viewBox="0 0 140 110" preserveAspectRatio="xMidYMid meet">
            <line x1="10" y1="22" x2="130" y2="22" stroke="#FFD542" stroke-width="1.5" stroke-dasharray="4 3"/>
            <text x="128" y="16" fill="#FFD542" font-family="Space Mono" font-size="8" text-anchor="end" font-weight="700">MAX</text>
            <rect x="20" y="70" width="22" height="30" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>
            <rect x="52" y="50" width="22" height="50" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.5"/>
            <rect x="84" y="28" width="22" height="72" fill="#FFD542" opacity=".85"/>
            <line x1="10" y1="100" x2="130" y2="100" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
          </svg>
        </div>
        <div class="ins-name">Position Limits & KYC</div>
        <div class="ins-desc">Every market has tiered caps based on insider-risk score. Max exposure for high-risk markets: $500. Full identity verification required for real-money play.</div>
        <div class="ins-mech"><strong>Mechanism:</strong> Bounds the damage any single insider can inflict.</div>
      </div>

      <!-- 02 — Time-Decay Payouts -->
      <div class="ins-card r d2">
        <div class="ins-phase"><span class="ins-phase-dot"></span>LAYER 02 · PHASE 2</div>
        <div class="ins-illust">
          <svg viewBox="0 0 140 110" preserveAspectRatio="xMidYMid meet">
            <line x1="12" y1="92" x2="132" y2="92" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
            <line x1="12" y1="12" x2="12" y2="92" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
            <path d="M12,22 Q62,38 132,88" fill="none" stroke="#FFD542" stroke-width="2"/>
            <circle cx="12" cy="22" r="3" fill="#FFD542"/>
            <circle cx="132" cy="88" r="3" fill="rgba(255,255,255,.5)"/>
            <text x="16" y="18" fill="#FFD542" font-family="Space Mono" font-size="8" font-weight="700">1.5×</text>
            <text x="128" y="84" fill="rgba(255,255,255,.6)" font-family="Space Mono" font-size="8" text-anchor="end">1.0×</text>
            <text x="72" y="106" text-anchor="middle" fill="rgba(255,255,255,.3)" font-family="Space Mono" font-size="6">TIME → RESOLUTION</text>
          </svg>
        </div>
        <div class="ins-name">Time-Decay Payouts</div>
        <div class="ins-desc">Payouts scale by how early you traded. Bet 90 days out, earn 1.5×. Bet 1 day out, earn 1.01×. Insiders who learn the answer late are structurally penalised.</div>
        <div class="ins-mech"><strong>Mechanism:</strong> Rewards belief over information.</div>
      </div>

      <!-- 03 — Commit-Reveal -->
      <div class="ins-card r d3">
        <div class="ins-phase"><span class="ins-phase-dot"></span>LAYER 03 · PHASE 3</div>
        <div class="ins-illust">
          <svg viewBox="0 0 140 110" preserveAspectRatio="xMidYMid meet">
            <line x1="12" y1="58" x2="128" y2="58" stroke="rgba(255,255,255,.15)" stroke-width="1"/>
            <rect x="14" y="38" width="30" height="38" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.5"/>
            <path d="M22,38 L22,32 Q22,24 29,24 Q36,24 36,32 L36,38" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.5"/>
            <rect x="26" y="50" width="6" height="10" fill="rgba(255,255,255,.55)"/>
            <line x1="46" y1="58" x2="56" y2="58" stroke="rgba(255,255,255,.3)" stroke-width="1"/>
            <polygon points="54,55 58,58 54,61" fill="rgba(255,255,255,.3)"/>
            <rect x="58" y="38" width="30" height="38" fill="none" stroke="#FFD542" stroke-width="1.5"/>
            <line x1="58" y1="38" x2="88" y2="76" stroke="#FFD542" stroke-width="1" stroke-dasharray="2 2"/>
            <line x1="90" y1="58" x2="100" y2="58" stroke="rgba(255,255,255,.3)" stroke-width="1"/>
            <polygon points="98,55 102,58 98,61" fill="rgba(255,255,255,.3)"/>
            <circle cx="116" cy="58" r="12" fill="none" stroke="#FFD542" stroke-width="1.5"/>
            <path d="M110,58 L114,62 L122,52" fill="none" stroke="#FFD542" stroke-width="1.5"/>
            <text x="29" y="94" text-anchor="middle" fill="rgba(255,255,255,.4)" font-family="Space Mono" font-size="6">COMMIT</text>
            <text x="73" y="94" text-anchor="middle" fill="#FFD542" font-family="Space Mono" font-size="6">REVEAL</text>
            <text x="116" y="94" text-anchor="middle" fill="rgba(255,255,255,.4)" font-family="Space Mono" font-size="6">SETTLE</text>
          </svg>
        </div>
        <div class="ins-name">Sealed Markets</div>
        <div class="ins-desc">For high-risk markets, trades are encrypted hashes until the commit window closes. Late insiders are physically unable to join — the book is sealed before they know.</div>
        <div class="ins-mech"><strong>Mechanism:</strong> Commit-reveal cryptography. Borrowed from Ethereum randomness beacons.</div>
      </div>

      <!-- 04 — ZK Non-Affiliation -->
      <div class="ins-card r d4">
        <div class="ins-phase"><span class="ins-phase-dot"></span>LAYER 04 · PHASE 4</div>
        <div class="ins-illust">
          <svg viewBox="0 0 140 110" preserveAspectRatio="xMidYMid meet">
            <path d="M70,14 L104,28 L104,56 Q104,82 70,98 Q36,82 36,56 L36,28 Z" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.5"/>
            <path d="M70,22 L97,33 L97,56 Q97,76 70,90 Q43,76 43,56 L43,33 Z" fill="rgba(255,213,66,.06)" stroke="#FFD542" stroke-width="1" stroke-dasharray="3 2"/>
            <text x="70" y="58" text-anchor="middle" fill="#FFD542" font-family="Space Mono" font-weight="700" font-size="18">zk</text>
            <text x="70" y="72" text-anchor="middle" fill="rgba(255,255,255,.4)" font-family="Space Mono" font-size="6" letter-spacing="1">PROOF</text>
          </svg>
        </div>
        <div class="ins-name">ZK Employer Proof</div>
        <div class="ins-desc">Partner with LVMH, Kering, Richemont to issue verifiable credentials. Users generate a zero-knowledge proof that their employer is not in the market's risk-set — without revealing who they work for.</div>
        <div class="ins-mech"><strong>Mechanism:</strong> zkSNARK proof of set exclusion. Zero identity leakage.</div>
      </div>

      <!-- 05 — FI Graph Detection -->
      <div class="ins-card r d5">
        <div class="ins-phase"><span class="ins-phase-dot"></span>LAYER 05 · PHASE 5</div>
        <div class="ins-illust">
          <svg viewBox="0 0 140 110" preserveAspectRatio="xMidYMid meet">
            <g stroke="rgba(255,255,255,.22)" stroke-width="1">
              <line x1="24" y1="28" x2="70" y2="55"/>
              <line x1="70" y1="55" x2="116" y2="28"/>
              <line x1="70" y1="55" x2="30" y2="82"/>
              <line x1="70" y1="55" x2="108" y2="85"/>
              <line x1="24" y1="28" x2="30" y2="82"/>
              <line x1="116" y1="28" x2="108" y2="85"/>
              <line x1="24" y1="28" x2="116" y2="28"/>
            </g>
            <circle cx="24" cy="28" r="4" fill="rgba(255,255,255,.7)"/>
            <circle cx="116" cy="28" r="4" fill="rgba(255,255,255,.7)"/>
            <circle cx="30" cy="82" r="4" fill="rgba(255,255,255,.7)"/>
            <circle cx="108" cy="85" r="4" fill="rgba(255,255,255,.7)"/>
            <circle cx="70" cy="55" r="16" fill="none" stroke="#FFD542" stroke-width="1" opacity=".3"/>
            <circle cx="70" cy="55" r="11" fill="none" stroke="#FFD542" stroke-width="1" opacity=".55"/>
            <circle cx="70" cy="55" r="7" fill="#FFD542"/>
            <text x="70" y="104" text-anchor="middle" fill="#FFD542" font-family="Space Mono" font-size="6" font-weight="700" letter-spacing="1">ANOMALY</text>
          </svg>
        </div>
        <div class="ins-name">FI Graph Detection</div>
        <div class="ins-desc">Every trader is scored against FI's fashion intelligence graph. Users 1–2 degrees from the brand, candidate, or agency auto-flag for review. Trained on Polymarket's historical insider patterns.</div>
        <div class="ins-mech"><strong>Mechanism:</strong> Graph ML + FI proprietary network data.</div>
      </div>

    </div>

    <!-- BOTTOM HEADLINE -->
    <div class="ins-headline r">
      <div class="ins-headline-q">"Every other prediction market prohibits insider trading."</div>
      <div class="ins-headline-a">High Street makes it <span class="y">structurally impossible.</span></div>
    </div>
  </div>
</section>

<hr class="div">

<!-- ── TECH ──────────────────────────────────────────── -->
<section class="section" id="tech">
  <div class="wrap">
    <div class="kicker r"><span class="kicker-num">06</span><span class="kicker-line"></span><span class="kicker-label">Technical Architecture</span></div>
    <h2 class="display-title r d1">
      <span class="w3">Web2 UX.</span>
      <span class="w7 blue">Web3 trust.</span>
    </h2>
    <p class="section-body r d2">Blockchain handles escrow and payouts invisibly. Users sign up with email. They never see a wallet, seed phrase, or gas fee.</p>
    <div class="arch r mt48">
      <div class="arch-row r-1">
        <div class="arch-cell arch-label-cell"><span class="arch-label-text">Consumer</span></div>
        <div class="arch-cell arch-cell-hero">
          <div class="arch-h" style="font-size:14px">High Street — Web &amp; Mobile App</div>
          <div class="arch-s">React / React Native &nbsp;·&nbsp; Pinterest-style feed &nbsp;·&nbsp; Polymarket trading &nbsp;·&nbsp; Portfolio &nbsp;·&nbsp; Leaderboard &nbsp;·&nbsp; Shop</div>
        </div>
      </div>
      <div class="arch-connector">↓</div>
      <div class="arch-row r-2">
        <div class="arch-cell arch-label-cell"><span class="arch-label-text">Platform</span></div>
        <div class="arch-cell">
          <div class="arch-h">High Street API Server</div>
          <div class="arch-s">Node.js · User accounts · Off-chain order matching · Portfolio · Analytics</div>
        </div>
        <div class="arch-cell arch-cell-blue">
          <div class="arch-h">FI Intelligence Graph</div>
          <div class="arch-s">Trend lifecycle forecasting · Fashion embeddings · CV pipeline · Catalog intelligence · Demand cycles</div>
        </div>
      </div>
      <div class="arch-connector">↓</div>
      <div class="arch-row r-3">
        <div class="arch-cell arch-label-cell"><span class="arch-label-text">Data</span></div>
        <div class="arch-cell">
          <div class="arch-h">PostgreSQL</div>
          <div class="arch-s">User data · Market metadata · Order book · Analytics</div>
        </div>
        <div class="arch-cell">
          <div class="arch-h">Base (Coinbase L2)</div>
          <div class="arch-s">Smart contract escrow + payouts · ERC-1155 position tokens · On-chain Trend Oracle reputation · ERC-4337 wallet abstraction</div>
        </div>
      </div>
      <div class="arch-connector">↓</div>
      <div class="arch-row r-4">
        <div class="arch-cell arch-label-cell"><span class="arch-label-text">Settlement</span></div>
        <div class="arch-cell" style="background:var(--grey-6);text-align:center">
          <div class="arch-h" style="color:var(--grey-3)">Ethereum L1 — Settlement Layer</div>
          <div class="arch-s">Base batches and settles to Ethereum for security. Invisible to users.</div>
        </div>
      </div>
    </div>
    <div class="r mt64">
      <p style="font-family:var(--display);font-weight:700;font-variation-settings:'wght' 700;font-size:28px;margin-bottom:4px">What FI already built vs. what's new</p>
      <p style="font-size:13px;color:var(--grey-2)">~60% of hard technology exists in FI's stack. New work is product engineering — not AI research.</p>
    </div>
    <table class="btable r">
      <thead><tr><th>Component</th><th>FI Stack Component</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td><strong>Trend lifecycle prediction</strong></td><td>Demand cycle forecasting</td><td><span class="badge yes">✓ Exists</span></td></tr>
        <tr><td><strong>Market resolution oracle</strong></td><td>Search + social + editorial signals</td><td><span class="badge partial">~ Thin API layer</span></td></tr>
        <tr><td><strong>Fashion-semantic search</strong></td><td>Fashion-tuned embeddings</td><td><span class="badge yes">✓ Exists</span></td></tr>
        <tr><td><strong>Commerce product matching</strong></td><td>SKU-to-trend catalog intelligence</td><td><span class="badge yes">✓ Exists</span></td></tr>
        <tr><td><strong>Market visual content</strong></td><td>Multimodal deep research / moodboard</td><td><span class="badge partial">~ Minor integration</span></td></tr>
        <tr><td><strong>Consumer web / mobile app</strong></td><td>—</td><td><span class="badge new">New build</span></td></tr>
        <tr><td><strong>Order matching engine</strong></td><td>—</td><td><span class="badge new">New build</span></td></tr>
        <tr><td><strong>Smart contracts (Base L2)</strong></td><td>—</td><td><span class="badge new">New build</span></td></tr>
      </tbody>
    </table>
  </div>
</section>

<!-- ── BIG WORD INTERSTITIAL ─────────────────────────── -->
<div class="big-word-section">
  <span class="big-word">TRADE ON WHAT YOU KNOW &nbsp;&nbsp;&nbsp; TRADE ON WHAT YOU KNOW &nbsp;&nbsp;&nbsp; TRADE ON WHAT YOU KNOW &nbsp;&nbsp;&nbsp;</span>
</div>

<!-- ── BUSINESS MODEL ────────────────────────────────── -->
<section class="section bg-cream">
  <div class="wrap">
    <div class="kicker r"><span class="kicker-num">07</span><span class="kicker-line"></span><span class="kicker-label">Business Model</span></div>
    <h2 class="display-title r d1">
      <span class="w3">Five streams.</span>
      <span class="w7 blue">One flywheel.</span>
    </h2>
    <div class="rev-grid">
      <div class="rev-card r d1"><div class="rev-phase">Phase 2</div><span class="rev-icon">🛍</span><div class="rev-name">Affiliate Commerce</div><div class="rev-rate">8–15%</div><div class="rev-desc">Commission on purchases via in-app shop links</div></div>
      <div class="rev-card r d2"><div class="rev-phase">Phase 3</div><span class="rev-icon">📈</span><div class="rev-name">Trading Fees</div><div class="rev-rate">1–2%</div><div class="rev-desc">Fee on winning payouts</div></div>
      <div class="rev-card r d3"><div class="rev-phase">Phase 3</div><span class="rev-icon">⭐</span><div class="rev-name">Premium Sub</div><div class="rev-rate">$10–20</div><div class="rev-desc">Advanced analytics, early access per month</div></div>
      <div class="rev-card r d4"><div class="rev-phase">Phase 4</div><span class="rev-icon">🏢</span><div class="rev-name">B2B Data</div><div class="rev-rate">$10–50K</div><div class="rev-desc">Crowd intelligence sold to brands / agencies per year</div></div>
      <div class="rev-card r d5"><div class="rev-phase">Phase 4</div><span class="rev-icon">🎯</span><div class="rev-name">Sponsored Markets</div><div class="rev-rate">$5–25K</div><div class="rev-desc">Brand-created labeled markets per launch</div></div>
    </div>
  </div>
</section>

<hr class="div">

<!-- ── METRICS ───────────────────────────────────────── -->
<section class="section">
  <div class="wrap">
    <div class="kicker r"><span class="kicker-num">08</span><span class="kicker-line"></span><span class="kicker-label">Success Metrics — Month 12</span></div>
    <h2 class="display-title r d1">
      <span class="w3">How we measure</span>
      <span class="w7 blue">success.</span>
    </h2>
    <div class="met-grid">
      <div class="met-card r d1"><div class="met-n">50K<sub>+</sub></div><div class="met-l">Monthly Active Users</div><div class="met-d">Target Month 12</div></div>
      <div class="met-card r d2"><div class="met-n">$1M<sub>+</sub></div><div class="met-l">Monthly Trading Volume</div><div class="met-d">Real-money markets (Phase 3)</div></div>
      <div class="met-card r d3"><div class="met-n">$500K</div><div class="met-l">Affiliate GMV</div><div class="met-d">Commerce layer (Phase 2+)</div></div>
      <div class="met-card r d1"><div class="met-n">3</div><div class="met-l">B2B Pilot Brands</div><div class="met-d">Paying intelligence customers</div></div>
      <div class="met-card r d2"><div class="met-n">&lt;2<sub>%</sub></div><div class="met-l">Dispute Rate</div><div class="met-d">Resolution accuracy benchmark</div></div>
      <div class="met-card r d3"><div class="met-n">12W</div><div class="met-l">Phase 1 Ship</div><div class="met-d">Free-to-play web app</div></div>
    </div>
  </div>
</section>

<hr class="div">

<!-- ── ROADMAP ───────────────────────────────────────── -->
<section class="section bg-cream" id="roadmap">
  <div class="wrap">
    <div class="kicker r"><span class="kicker-num">09</span><span class="kicker-line"></span><span class="kicker-label">Phased Roadmap</span></div>
    <h2 class="display-title r d1">
      <span class="w3">Four phases.</span>
      <span class="w7 blue">18 months.</span>
    </h2>
    <div class="road">
      <div class="road-phase r d1">
        <div class="road-left"><div class="road-dot"></div><div class="road-num">01</div></div>
        <div>
          <div class="road-title">Community &amp; Free-to-Play</div>
          <div class="road-time">MONTHS 1–3</div>
          <div class="road-chips"><span class="chip">Free-to-play web app</span><span class="chip">Virtual "Street Cred"</span><span class="chip">Weekly challenges</span><span class="chip">Discord community</span><span class="chip">FI intelligence integration</span></div>
          <div class="road-tgt">→ Target: <strong>5,000 active predictors</strong></div>
        </div>
      </div>
      <div class="road-phase r d2">
        <div class="road-left"><div class="road-dot"></div><div class="road-num">02</div></div>
        <div>
          <div class="road-title">Event-Driven Growth</div>
          <div class="road-time">MONTHS 3–6</div>
          <div class="road-chips"><span class="chip">NYFW &amp; Met Gala</span><span class="chip">iOS mobile app</span><span class="chip">Trend Oracle score</span><span class="chip">Affiliate commerce</span><span class="chip">Leaderboard</span></div>
          <div class="road-tgt">→ Target: <strong>25,000 users</strong></div>
        </div>
      </div>
      <div class="road-phase r d3">
        <div class="road-left"><div class="road-dot"></div><div class="road-num">03</div></div>
        <div>
          <div class="road-title">Real Money Markets</div>
          <div class="road-time">MONTHS 6–12</div>
          <div class="road-chips"><span class="chip">Smart contracts on Base</span><span class="chip">Coinbase Smart Wallet</span><span class="chip">Premium subscription</span><span class="chip">Position trading</span><span class="chip">Android app</span></div>
          <div class="road-tgt">→ Target: <strong>50,000 MAU · $1M+ monthly volume</strong></div>
        </div>
      </div>
      <div class="road-phase r d4">
        <div class="road-left"><div class="road-dot"></div><div class="road-num">04</div></div>
        <div>
          <div class="road-title">Full Flywheel &amp; B2B</div>
          <div class="road-time">MONTHS 12–18</div>
          <div class="road-chips"><span class="chip">B2B trend intelligence</span><span class="chip">Sponsored markets</span><span class="chip">Brand marketplace</span><span class="chip">Governance token</span><span class="chip">PLM integration</span></div>
          <div class="road-tgt">→ Target: <strong>$500K ARR · 3 B2B pilot brands</strong></div>
        </div>
      </div>
    </div>
  </div>
</section>

<hr class="div">

<!-- ── OUT OF SCOPE ───────────────────────────────────── -->
<section class="section">
  <div class="wrap">
    <div class="kicker r"><span class="kicker-num">10</span><span class="kicker-line"></span><span class="kicker-label">Out of Scope — v1.0</span></div>
    <h2 class="display-title r d1">
      <span class="w3">What we're</span>
      <span class="w7 red">not building yet.</span>
    </h2>
    <div class="oos-grid">
      <div class="oos-card r d1"><span class="oos-x">✕</span>Influencer market creation (Phase 2, after PMF)</div>
      <div class="oos-card r d2"><span class="oos-x">✕</span>Direct brand marketplace / inventory holding</div>
      <div class="oos-card r d3"><span class="oos-x">✕</span>Governance token / DAO voting</div>
      <div class="oos-card r d1"><span class="oos-x">✕</span>Android app (iOS first)</div>
      <div class="oos-card r d2"><span class="oos-x">✕</span>Fully on-chain order book</div>
      <div class="oos-card r d3"><span class="oos-x">✕</span>User-generated markets (Phase 3 minimum)</div>
    </div>
  </div>
</section>

<!-- ── FOOTER ─────────────────────────────────────────── -->
<footer class="footer">
  <div class="foot-top">
    <div class="foot-word">
      <span class="fw7">HIGH</span>
      <span class="fw3">STREET</span>
    </div>
    <div class="foot-right">
      <p>A fashion prediction market powered by the Fashion Intelligence Company's AI stack. Trade on what you know.</p>
      <p>Built on Base · Powered by FI · Designed for fashion consumers</p>
    </div>
  </div>
  <div class="foot-meta">
    <span>PRD v1.0 — April 2026</span>
    <span>The Fashion Intelligence Company</span>
    <span>Confidential — For internal review</span>
  </div>
</footer>

<script>
  // Cursor
  const cur = document.getElementById('cur'), curl = document.getElementById('curl');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cur.style.left=mx+'px'; cur.style.top=my+'px'; });
  (function tick(){ rx+=(mx-rx)*.1; ry+=(my-ry)*.1; curl.style.left=rx+'px'; curl.style.top=ry+'px'; requestAnimationFrame(tick); })();
  document.querySelectorAll('a,button,.prob-card,.mkt-card,.rev-card,.met-card,.feat-row,.hstat').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cur.style.transform='translate(-50%,-50%) scale(2.5)'; curl.style.opacity='.15'; });
    el.addEventListener('mouseleave',()=>{ cur.style.transform='translate(-50%,-50%) scale(1)'; curl.style.opacity='.4'; });
  });

  // Scroll reveal
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('v'); io.unobserve(e.target); } });
  },{threshold:.06});
  document.querySelectorAll('.r').forEach(el=>io.observe(el));

  // Nav active state
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  const navObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        links.forEach(l=>l.style.color='');
        const active = document.querySelector('.nav-link[href="#'+e.target.id+'"]');
        if(active) active.style.color = 'var(--black)';
      }
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  sections.forEach(s=>navObs.observe(s));
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html, 'utf8');
console.log('✓ Written to', OUT);

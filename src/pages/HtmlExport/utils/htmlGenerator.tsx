
import { Match, Team, UserStats } from '@/lib/types';

export const generateHtmlContent = (matches: any[], teams: any[], stats: any): string => {
  return `<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WinMix.hu - Mérkőzés Előrejelzések</title>
    <meta name="description" content="Teszteld a futball tudásodat, tippelj mérkőzésekre és versenyezz a legjobb helyezésért.">
    <meta property="og:title" content="WinMix.hu - Mérkőzés Előrejelzések">
    <meta property="og:description" content="Teszteld a futball tudásodat, tippelj mérkőzésekre és versenyezz a legjobb helyezésért.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://winmix.hu">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6'/%3E%3Cpath d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18'/%3E%3Cpath d='M4 22h16'/%3E%3Cpath d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22'/%3E%3Cpath d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22'/%3E%3Cpath d='M18 2H6v7a6 6 0 0 0 12 0V2Z'/%3E%3C/svg%3E">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        /* Reset és alapstílusok */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            /* A React oldalon használt Tailwind változók pontos másolata */
            --background: hsl(220 33% 4%);
            --foreground: hsl(210 40% 98%);
            --card: hsl(220 33% 5.5%);
            --card-foreground: hsl(210 40% 98%);
            --border: rgba(255, 255, 255, 0.1);
            --primary: hsl(196 94% 48%);
            --primary-hover: hsl(196 94% 40%);
            --secondary: hsl(156 64% 40%);
            --muted: hsl(220 20% 12%);
            --muted-foreground: hsl(210 20% 70%);
            --accent: hsl(35 92% 50%);
            --accent-foreground: hsl(210 40% 98%);
            --destructive: hsl(0 84.2% 60.2%);
            --destructive-foreground: hsl(210 40% 98%);
            --radius: 0.75rem;
            --sports-blue: #0ea5e9;
            --sports-blue-dark: #0284c7;
            --sports-green: #10b981;
            --sports-green-dark: #059669;
            --sports-accent: #f59e0b;
            --sports-accent-dark: #d97706;
            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        body {
            font-family: var(--font-sans);
            line-height: 1.6;
            color: var(--foreground);
            background-color: var(--background);
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .bg-gradient {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse at top, rgba(14, 165, 233, 0.15), rgba(16, 185, 129, 0.05), transparent);
            z-index: 0;
            pointer-events: none;
        }
        
        /* Tipográfia */
        h1, h2, h3, h4, h5, h6 {
            font-weight: 700;
            line-height: 1.2;
        }
        
        h1 {
            font-size: 2.5rem;
        }
        
        h2 {
            font-size: 1.75rem;
        }
        
        h3 {
            font-size: 1.5rem;
        }
        
        p {
            margin-bottom: 1rem;
        }
        
        a {
            color: var(--primary);
            text-decoration: none;
            transition: color 0.2s ease;
        }
        
        a:hover {
            color: var(--primary-hover);
        }
        
        /* Konténer */
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        /* Animációk */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
            animation: fadeIn 0.5s ease forwards;
        }
        
        /* Segédosztályok */
        .text-center {
            text-align: center;
        }
        
        .text-blue {
            color: var(--sports-blue);
        }
        
        .text-green {
            color: var(--sports-green);
        }
        
        .bg-card {
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
        }
        
        .flex {
            display: flex;
        }
        
        .flex-col {
            flex-direction: column;
        }
        
        .items-center {
            align-items: center;
        }
        
        .justify-between {
            justify-content: space-between;
        }
        
        .gap-2 {
            gap: 0.5rem;
        }
        
        .gap-4 {
            gap: 1rem;
        }
        
        .mb-3 {
            margin-bottom: 0.75rem;
        }
        
        .mb-6 {
            margin-bottom: 1.5rem;
        }
        
        .mb-8 {
            margin-bottom: 2rem;
        }
        
        .mb-12 {
            margin-bottom: 3rem;
        }
        
        .mt-6 {
            margin-top: 1.5rem;
        }
        
        .mx-auto {
            margin-left: auto;
            margin-right: auto;
        }
        
        .py-6 {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
        }
        
        .py-8 {
            padding-top: 2rem;
            padding-bottom: 2rem;
        }
        
        .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
        }
        
        .pt-28 {
            padding-top: 7rem;
        }
        
        .pb-16 {
            padding-bottom: 4rem;
        }
        
        .relative {
            position: relative;
        }
        
        .z-10 {
            z-index: 10;
        }
        
        /* Header - frissítve a React oldal stílusának megfelelően */
        header {
            padding: 1rem 0;
            background-color: rgba(11, 15, 25, 0.8);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            border-bottom: 1px solid var(--border);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 700;
            font-size: 1.25rem;
            color: var(--foreground);
        }
        
        .logo-icon {
            background: linear-gradient(to bottom right, var(--sports-blue), var(--sports-green));
            width: 2rem;
            height: 2rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 0.375rem;
            position: relative;
            overflow: hidden;
        }
        
        .logo-icon:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 0.375rem;
        }
        
        .nav-items {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .nav-item {
            padding: 0.5rem 0.75rem;
            border-radius: var(--radius);
            transition: background-color 0.2s ease;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--foreground);
        }
        
        .nav-item:hover {
            background-color: var(--muted);
        }
        
        .auth-button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            background-color: var(--sports-blue);
            border-radius: var(--radius);
            transition: background-color 0.2s ease;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--foreground);
            cursor: pointer;
            border: none;
        }
        
        .auth-button:hover {
            background-color: var(--sports-blue-dark);
        }
        
        /* Főtartalom - frissítve a React design alapján */
        main {
            padding-top: 5rem;
            padding-bottom: 4rem;
            position: relative;
            z-index: 1;
        }
        
        .hero {
            text-align: center;
            margin-bottom: 4rem;
            opacity: 0;
            animation: fadeIn 0.7s forwards;
        }
        
        .hero h1 {
            margin-bottom: 1rem;
            font-size: 2.25rem;
            font-weight: 800;
            background: linear-gradient(to right, var(--foreground) 0%, var(--sports-blue) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
        }
        
        .hero p {
            font-size: 1.125rem;
            color: var(--muted-foreground);
            max-width: 600px;
            margin: 0 auto 2rem;
        }
        
        /* Statisztika kártya - frissítve */
        .stats-card {
            margin-bottom: 3rem;
            opacity: 0;
            animation: fadeIn 0.7s ease 0.2s forwards;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }
        
        .stat-item {
            padding: 1.5rem;
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            text-align: center;
            transition: transform 0.3s ease, border-color 0.3s ease;
        }
        
        .stat-item:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--primary);
        }
        
        .stat-label {
            font-size: 0.875rem;
            color: var(--muted-foreground);
            font-weight: 500;
        }
        
        /* Mérkőzések - Frissítve a React komponensek designja alapján */
        .sports-card {
            position: relative;
            overflow: hidden;
            border-radius: var(--radius);
            background: linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.95));
            border: 1px solid rgba(14, 165, 233, 0.2);
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .sports-card:hover {
            border-color: rgba(14, 165, 233, 0.3);
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
        }
        
        .sports-card-glow {
            position: relative;
        }
        
        .sports-card-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: var(--radius);
            box-shadow: 0 0 30px 10px rgba(14, 165, 233, 0.05);
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        .sports-card:hover .sports-card-glow::after {
            opacity: 1;
        }
        
        .actions-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .action-buttons {
            display: flex;
            gap: 0.5rem;
        }
        
        .action-button {
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
            font-weight: 500;
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
            background-color: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--foreground);
        }
        
        .action-button-blue {
            color: var(--sports-blue);
            border-color: var(--sports-blue);
            border-opacity: 0.2;
        }
        
        .action-button-blue:hover {
            background-color: rgba(14, 165, 233, 0.1);
        }
        
        .action-button-green {
            color: var(--sports-green);
            border-color: var(--sports-green);
            border-opacity: 0.2;
        }
        
        .action-button-green:hover {
            background-color: rgba(16, 185, 129, 0.1);
        }
        
        .matches-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .matches-title {
            font-size: 1.25rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--foreground);
        }
        
        .matches-title svg {
            color: var(--sports-accent);
        }
        
        .date-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .date-display {
            display: flex;
            align-items: center;
            padding: 0.5rem 0.75rem;
            background-color: var(--muted);
            border-radius: var(--radius);
            font-size: 0.875rem;
            gap: 0.5rem;
        }
        
        .date-display svg {
            color: var(--sports-blue);
        }
        
        .date-button {
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--muted);
            border-radius: var(--radius);
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .date-button:hover {
            background-color: rgba(51, 65, 85, 0.8);
        }
        
        /* Mérkőzés kártyák - frissítve a React komponensek alapján */
        .matches-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            opacity: 0;
            animation: fadeIn 0.7s ease 0.4s forwards;
        }
        
        .match-card {
            background-color: var(--card);
            border-radius: var(--radius);
            overflow: hidden;
            border: 1px solid rgba(14, 165, 233, 0.2);
            transition: all 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
            min-height: 480px;
            padding: 0;
        }
        
        .match-card:hover {
            transform: translateY(-5px);
            border-color: rgba(14, 165, 233, 0.3);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
        }
        
        .match-header {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border);
        }
        
        .match-time {
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.375rem;
            font-size: 0.875rem;
        }
        
        .match-time svg {
            color: var(--sports-blue);
        }
        
        .match-time-tag {
            background-color: var(--accent);
            color: var(--accent-foreground);
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
        }
        
        .match-content {
            padding: 1.5rem 1rem;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .teams-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .team {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 45%;
        }
        
        .team-logo {
            width: 4rem;
            height: 4rem;
            margin-bottom: 0.75rem;
            object-fit: contain;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.05);
            padding: 0.5rem;
            transition: transform 0.3s ease;
        }
        
        .match-card:hover .team-logo {
            transform: scale(1.1);
        }
        
        .team-name {
            font-weight: 600;
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
        }
        
        .team-rank {
            color: var(--muted-foreground);
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
        }
        
        .vs {
            font-weight: 700;
            color: var(--muted-foreground);
            font-size: 1.25rem;
            position: relative;
        }
        
        .vs:before, .vs:after {
            content: '';
            position: absolute;
            height: 1px;
            width: 10px;
            background-color: var(--border);
            top: 50%;
        }
        
        .vs:before {
            right: calc(100% + 5px);
        }
        
        .vs:after {
            left: calc(100% + 5px);
        }
        
        .match-actions {
            display: flex;
            justify-content: space-between;
            gap: 0.75rem;
            margin-top: auto;
        }
        
        .match-button {
            flex: 1;
            padding: 0.625rem;
            border-radius: var(--radius);
            font-weight: 600;
            font-size: 0.875rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            outline: none;
        }
        
        .home-button {
            background-color: rgba(14, 165, 233, 0.2);
            color: var(--sports-blue);
        }
        
        .home-button:hover {
            background-color: rgba(14, 165, 233, 0.3);
        }
        
        .draw-button {
            background-color: rgba(148, 163, 184, 0.2);
            color: #cbd5e1;
        }
        
        .draw-button:hover {
            background-color: rgba(148, 163, 184, 0.3);
        }
        
        .away-button {
            background-color: rgba(99, 102, 241, 0.2);
            color: #818cf8;
        }
        
        .away-button:hover {
            background-color: rgba(99, 102, 241, 0.3);
        }
        
        /* Skeleton loaders */
        .skeleton {
            background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.05) 25%,
                rgba(255, 255, 255, 0.1) 50%,
                rgba(255, 255, 255, 0.05) 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: var(--radius);
        }
        
        @keyframes shimmer {
            0% {
                background-position: -200% 0;
            }
            100% {
                background-position: 200% 0;
            }
        }
        
        /* Lábléc - frissítve */
        footer {
            padding: 1.5rem 0;
            border-top: 1px solid var(--border);
            background-color: rgba(11, 15, 25, 0.95);
            backdrop-filter: blur(10px);
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .footer-logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .footer-logo-icon {
            background: linear-gradient(to bottom right, var(--sports-blue), var(--sports-green));
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.375rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 0.25rem;
        }
        
        .copyright {
            font-size: 0.75rem;
            color: var(--muted-foreground);
        }
        
        /* Responsive design - frissítve */
        @media (max-width: 768px) {
            .matches-grid {
                grid-template-columns: 1fr;
            }
            
            .matches-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .footer-content {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
            
            .hero h1 {
                font-size: 1.75rem;
            }
            
            .actions-row {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .match-card {
                min-height: 400px;
            }
        }
        
        @media (max-width: 640px) {
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .nav-items {
                display: none;
            }
            
            .logo {
                font-size: 1rem;
            }
            
            .hero h1 {
                font-size: 1.5rem;
            }
            
            .hero p {
                font-size: 1rem;
            }
            
            .match-card {
                padding: 0.75rem;
            }
        }
    </style>
</head>
<body>
    <div class="bg-gradient"></div>

    <header id="header">
        <div class="container header-content">
            <div class="logo">
                <div class="logo-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                        <path d="M4 22h16"></path>
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                </div>
                <div>Win<span class="text-blue">Mix.hu</span></div>
            </div>
            
            <div class="nav-items">
                <a href="#matches" class="nav-item">Mérkőzések</a>
                <a href="#features" class="nav-item">Funkciók</a>
                <a href="#leaderboard" class="nav-item">Ranglista</a>
            </div>
            
            <button class="auth-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Bejelentkezés / Regisztráció
            </button>
        </div>
    </header>

    <main>
        <div class="container">
            <section class="hero">
                <h1>Tippelj Labdarúgó <span class="text-blue">Mérkőzésekre</span></h1>
                <p>Teszteld futballtudásodat, tippelj mérkőzésekre, és versenyezz a legjobb helyezésért.</p>
                
                <button class="auth-button">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Bejelentkezés kezdéshez
                </button>
            </section>

            <section class="stats-card">
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-value">${stats.totalPredictions || 0}</div>
                        <div class="stat-label">Összes tipp</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${stats.winRate || 0}%</div>
                        <div class="stat-label">Nyerési arány</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${stats.points || 0}</div>
                        <div class="stat-label">Összes pont</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${stats.streak || 0}</div>
                        <div class="stat-label">Jelenlegi sorozat</div>
                    </div>
                </div>
            </section>
            
            <section class="actions-row">
                <div class="action-buttons">
                    <a href="/html-export" class="action-button action-button-blue">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        HTML Export
                    </a>
                    
                    <a href="/leaderboard" class="action-button action-button-green">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                            <path d="M4 22h16"></path>
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                        </svg>
                        Ranglista
                    </a>
                    
                    <button class="action-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22.65 16.26a10.03 10.03 0 0 1-19.33-.06 10.03 10.03 0 0 1 7.21-12.68 10.05 10.05 0 0 1 12.57 7.23 10.03 10.03 0 0 1-.45 5.51z"></path>
                            <path d="M8 16h.01"></path>
                            <path d="M12 16h.01"></path>
                            <path d="M16 16h.01"></path>
                        </svg>
                        Értesítések
                    </button>
                </div>
                
                <div class="action-buttons">
                    <button class="action-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                        Szűrés
                    </button>
                </div>
            </section>

            <section id="matches" class="matches-section">
                <div class="matches-header">
                    <h2 class="matches-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                            <path d="M4 22h16"></path>
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                        </svg>
                        Mai Mérkőzések
                    </h2>
                    
                    <div class="date-controls">
                        <button class="date-button">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m15 18-6-6 6-6"></path>
                            </svg>
                        </button>
                        
                        <div class="date-display">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                                <line x1="16" x2="16" y1="2" y2="6"></line>
                                <line x1="8" x2="8" y1="2" y2="6"></line>
                                <line x1="3" x2="21" y1="10" y2="10"></line>
                            </svg>
                            ${new Date().toLocaleDateString('hu-HU', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                        
                        <button class="date-button">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="matches-grid">
                    ${matches.map(match => {
                      const homeTeam = match.homeTeam || { name: 'Ismeretlen csapat', logo: '/placeholder.svg', rank: '?' };
                      const awayTeam = match.awayTeam || { name: 'Ismeretlen csapat', logo: '/placeholder.svg', rank: '?' };
                      
                      return `
                      <div class="match-card sports-card sports-card-glow">
                          <div class="match-header">
                              <div class="match-time">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                  </svg>
                                  ${match.time || '15:00'}
                              </div>
                              <div class="match-time-tag">
                                  ${match.startsIn || 'Hamarosan'}
                              </div>
                          </div>
                          <div class="match-content">
                              <div class="teams-container">
                                  <div class="team">
                                      <img src="${homeTeam.logo}" alt="${homeTeam.name}" class="team-logo">
                                      <div class="team-name">${homeTeam.name}</div>
                                      <div class="team-rank">
                                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                          </svg>
                                          ${homeTeam.rank ? `Rank #${homeTeam.rank}` : 'Nincs rangsor'}
                                      </div>
                                  </div>
                                  <div class="vs">VS</div>
                                  <div class="team">
                                      <img src="${awayTeam.logo}" alt="${awayTeam.name}" class="team-logo">
                                      <div class="team-name">${awayTeam.name}</div>
                                      <div class="team-rank">
                                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                          </svg>
                                          ${awayTeam.rank ? `Rank #${awayTeam.rank}` : 'Nincs rangsor'}
                                      </div>
                                  </div>
                              </div>
                              <div class="match-actions">
                                  <button class="match-button home-button">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
                                          <path d="m9 18 6-6-6-6"></path>
                                      </svg>
                                      Hazai
                                  </button>
                                  <button class="match-button draw-button">Döntetlen</button>
                                  <button class="match-button away-button">
                                      Vendég
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-left: 4px;">
                                          <path d="m9 18 6-6-6-6"></path>
                                      </svg>
                                  </button>
                              </div>
                          </div>
                      </div>
                      `;
                    }).join('')}
                </div>
            </section>
        </div>
    </main>

    <footer>
        <div class="container footer-content">
            <div class="footer-logo">
                <div class="footer-logo-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                        <path d="M4 22h16"></path>
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                </div>
                <span>Win<span style="color: #0ea5e9;">Mix.hu</span></span>
            </div>
            
            <p class="copyright">
                &copy; ${new Date().getFullYear()} WinMix.hu. Minden jog fenntartva.
            </p>
        </div>
    </footer>

    <script>
        // Egyszerű funkciók a jobb felhasználói élményért
        document.addEventListener('DOMContentLoaded', () => {
            // Header stílus változtatás görgetéskor
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    header.style.backgroundColor = 'rgba(11, 15, 25, 0.95)';
                    header.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
                } else {
                    header.style.backgroundColor = 'rgba(11, 15, 25, 0.8)';
                }
            });
            
            // Mérkőzés gombok kezelése
            const matchButtons = document.querySelectorAll('.match-button');
            matchButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const card = this.closest('.match-card');
                    const allButtons = card.querySelectorAll('.match-button');
                    
                    // Alaphelyzetbe állítjuk az összes gombot
                    allButtons.forEach(btn => {
                        btn.style.opacity = '0.7';
                        btn.style.transform = 'scale(1)';
                    });
                    
                    // Kiemeljük a kiválasztott gombot
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1.05)';
                    
                    // Felhasználói visszajelzés toast formájában
                    showToast('Tipp rögzítve', 'success');
                });
            });
            
            // Toast üzenet megjelenítés
            function showToast(message, type = 'info') {
                const toast = document.createElement('div');
                toast.textContent = message;
                toast.style.position = 'fixed';
                toast.style.bottom = '20px';
                toast.style.right = '20px';
                toast.style.padding = '10px 20px';
                toast.style.backgroundColor = type === 'success' ? 'var(--sports-blue)' : 'var(--sports-accent)';
                toast.style.color = 'white';
                toast.style.borderRadius = 'var(--radius)';
                toast.style.zIndex = '1000';
                toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(10px)';
                toast.style.transition = 'opacity 0.3s, transform 0.3s';
                
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.style.opacity = '1';
                    toast.style.transform = 'translateY(0)';
                }, 10);
                
                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, 300);
                }, 3000);
            }
        });
    </script>
</body>
</html>`;
};

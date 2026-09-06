# Michael Mazur — Portfolio & Case Studies

This repository contains the source code for the personal portfolio, creative lab, and design case studies website of **Michael Mazur**, a Senior Product Designer & Software Engineer with over 12 years of experience at companies like Stripe, Uber, Away, Instrument, and Huge.

The website showcases a high-quality, lightweight, and highly-performant frontend design with immersive animations and seamless interactive elements.

---

## 🚀 Key Features

- **Infinite Scrolling Projects Carousel**: A smooth, gesture-supporting, trackpad-friendly desktop and touch-compatible mobile carousel displaying professional design projects.
- **Interactive Custom Cursor**: A lightweight, desktop-only custom cursor that dynamically adapts color and style depending on background brightness and interactive card hover states.
- **Dynamic Background Transitions**: A multi-phase scroll-triggered color shifting experience that transitions beautifully from White (Hero) ➔ Black (Carousel/Experience) ➔ White (Contact section).
- **Responsive & Touch-First Design**: Optimized for all form factors, utilizing touch-specific media queries and pre-loading lightweight fallback mobile images on mobile devices to save bandwidth.
- **Creative Labs Showcase**: A Swift-prototype-focused section exploring mobile interaction models and interface experiments via clean modal previews.
- **Detailed Design Case Studies**: Dedicated sub-pages deep-diving into individual design frameworks, research, iteration processes, and solutions (e.g., Monogramming, Freight Marketplace, Onboarding).

---

## 🛠️ Built With

- **HTML5** & **CSS3** (with Modern CSS variables and fluid typography)
- **JavaScript (ES6+)** (Vanilla JS for gesture handling, carousel math, and cursor management)
- **GSAP (GreenSock Animation Platform)** & **ScrollTrigger** (for high-performance scroll-driven and entrance transitions)

---

## 📂 Project Structure

```text
├── case-studies/                  # Individual project case studies
│   ├── freight-marketplace/       # Freight Marketplace assets and HTML
│   ├── interval-timer/            # Swift mockups and interval timer videos
│   ├── load-execution/            # GIFs and Load Execution HTML
│   ├── onboarding/                # Connect Onboarding case study assets and HTML
│   ├── personalization/           # Personalization/Monogramming assets and HTML
│   └── platform-experience/       # Platform account management assets and HTML
├── images/                        # Global assets, company logos, and icons
├── index.html                     # Main entry point / Portfolio homepage
├── labs.html                      # Creative Lab showcase (Swift/mobile interaction designs)
├── michaelmazur.pdf               # Downloadable curriculum vitae / resume
├── favicon.ico / favicon.svg      # Site favicons
└── .gitignore                     # Git ignore rules
```

---

## 💻 Local Development

To run the website locally and preview your changes, you can spin up a quick local web server from the repository root:

### Using Python (Built-in)
```bash
python3 -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your web browser.

### Using Node.js (via npx)
```bash
npx serve .
```
Then open [http://localhost:3000](http://localhost:3000) in your web browser.

### Using Live Server (VS Code Extension)
Right-click on `index.html` and select **"Open with Live Server"**.

---

## 📄 License

This repository and its contents are the intellectual property of Michael Mazur. All rights reserved.

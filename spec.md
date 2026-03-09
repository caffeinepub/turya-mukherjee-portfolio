# Turya Mukherjee Portfolio

## Current State
The portfolio has all sections (Hero, About, Resume, Portfolio, Contact) but contains placeholder content:
- ResumeSection has generic job titles, fake company names ("Research Firm · To be updated", "Company · To be updated"), wrong dates, and placeholder skill categories
- PortfolioSection has generic placeholder project descriptions instead of real projects
- AboutSection has generic bio text but correct badge labels
- HeroSection sub-headline and bio are accurate but can be improved
- Education shows "University · To be updated" with wrong degree name and wrong dates

## Requested Changes (Diff)

### Add
- Third experience entry: Curefit - House of Cult | Sales Intern (May 2024 – July 2024)
- Christ Consulting Club Positions of Responsibility section in Resume
- Certifications section: EY Financial Risk Management, Bloomberg Market Concepts, Atlassian Agile Project Management Professional, Six Sigma
- Two real research projects in Portfolio: Fuel Cost Analysis and TATA Motors Ratio Analysis with links and full bullet descriptions
- Separate soft skills category in skills section

### Modify
- Experience 1: Update to Tresvista Analytics Pvt. Ltd. | Analyst - Research and Investment Services, Feb 2026 – March 2026, with correct bullet
- Experience 2: Update to Visit Health Private Limited | Associate - Corporate Account Manager, May 2025 – Dec 2025, Gurugram, India, with all 4 bullet points
- Experience 3 (new): Curefit - House of Cult | Sales Intern, May 2024 – July 2024, Bengaluru, India, with 3 bullet points
- Education: Christ University | BBA – Finance and International Business (majored in Finance), 2022–2025, Bengaluru, India
- Skills: Replace generic skill groups with real ones: Technical Skills (Excel Advanced, PowerPoint, Power BI, Benchmarking, Market/Industry Research, Unit Economics, Sensitivity Modeling, Due Diligence, GTM Analysis), Soft Skills (Customer Servicing, Empathy, Active Listening, Expectation Management, Conflict Resolution, Problem Ownership), Certifications
- Portfolio projects: Replace generic project 1 with Fuel Cost Analysis – Aviation Sector, keep CaseQuest and Gatorade cards, add TATA Motors Ratio Analysis
- HeroSection eyebrow: add "Finance Major" mention

### Remove
- All placeholder/generic content from ResumeSection and PortfolioSection

## Implementation Plan
1. Update ResumeSection.tsx: replace all experience, education, and skills data with real content; add Positions of Responsibility and Certifications
2. Update PortfolioSection.tsx: replace project cards with real research projects (Fuel Cost Analysis + TATA Motors); keep achievements
3. Update HeroSection.tsx: tweak sub-headline to mention Finance Major
4. Validate and deploy

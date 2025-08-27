# MathForge

MathForge is a full-stack web application that generates and delivers custom math problem sets on demand. It leverages OpenAI’s **o4-mini-high** model (currently the latest and most capable for math) to create problems, and the Wolfram Alpha API to fetch comprehensive, high-quality solutions (not just a single answer).

---

## Key Features

- **Problem Generation**  
  - Users submit query parameters (topic, difficulty, etc.)  
  - OpenAI o4-mini-high produces a set of 5 tailored math problems

- **Solution Delivery**  
  - Wolfram Alpha API returns every valid solution pathway (not just one)  
  - Ensures transparency and utility for deeper understanding

- **Rate Limiting & Token System**  
  - Monthly API allowance capped at 2,000 calls  
  - Community-shared tokens plus up to 5 personal tokens per user to comply with Terms of Service  
  - Backend enforces rate limits to prevent abuse

- **Authentication & Authorization**  
  - Full JWT-based auth (tokens stored in secure HTTP cookies)  
  - Registration, login, logout, and “notebook” CRUD operations  

- **“Notebooks” Concept**  
  - A notebook = one set of 5 math problems + their complete solutions  
  - Users can create, read, update, and delete notebooks in their account

- **Future Monetization Plan (Optional)**  
  - If funding goals are met https://gofund.me/d5452682, MathForge will transition to a paid model  
  - Personal token allotments and UI overhaul to match the paid-service experience  

---

## Technology Stack

### Front End
- **React JS**  
- **Zustand** (state management)  
- **Axios** (HTTP client)  
- **React Router** (client-side routing)  
- **React Hook Form** (form validation)

### Back End
- **Spring Boot**  
- **Spring Web** (REST controllers)  
- **Hibernate & Spring Data JPA** (entity management, PostgreSQL JSONB storage)  
- **Spring Security** (JWT filters, password hashing)  

---

## Architecture & Design Decisions

1. **OpenAI o4-mini-high**  
   - Selected for its superior math problem-generation capabilities  
   - Current “latest” model at time of development

2. **Wolfram Alpha API**  
   - Returns all possible solution pathways (design choice for educational depth)  
   - Used in conjunction with OpenAI prompts to validate and enrich content

3. **Rate Limiting & Token Caps**  
   - currently limited to 2,000 calls/month (per Wolfram Alpha’s TOS)  
   - Shared community tokens help distribute load (125)
   - Each user has up to 5 personal tokens (renews monthly)  
   - Backend enforces these limits

4. **JWT Authentication**  
   - JWTs issued by jjwt and stored in secure HTTP-Only cookies  
   - Stateless session management

---

## Usage

1. **Registration & Login**  
   - Users must register with a valid email & password.  
   - On login, a JWT cookie is set (HTTP-Only, secure).  

2. **Creating a Notebook**  
   - Navigate to the “Generate Notebook” page.  
   - Fill in the query fields (topic, difficulty, title).  
   - Submit to receive 5 generated problems + full solutions.  
   - Save, view, or delete notebooks at any time via the edit button on each notebook card

3. **Token Management**  
   - Each user can view remaining personal tokens (max 5).  
   - When tokens run out, user must wait until next monthly reset or rely on community-shared tokens.  

---

## Future Plans

- **Monetization**  
  - Once funding goals are met, introduce a paid tier.  
  - Paid users receive a larger personal token allotment (e.g., 40 tokens/month).  
  - Full UI overhaul to reflect subscription status and enhanced dashboards.  
  - Add “Pro” features: downloadable PDFs of notebooks, LaTeX/Braille export, offline mode.

- **UI/UX Enhancements**   
  - Interactive solution walkthrough (step-by-step highlighting).

- **Extended API Integrations**  
  - Integrate additional math-focused APIs (e.g., Symbolab, Desmos) for alternative solution perspectives.  

---

## Acknowledgments & Disclaimer

- **No AI-Generated Code**  
  This project’s source code is handwritten and maintained exclusively by the author.  
- **Minimal AI-Assisted Documentation**  
  Only minor AI guidance was used for research (looking up library docs, code snippets, and best practices). All core logic, design, and implementation decisions were driven by the developer without direct code generation from AI.  
- Thanks to the following resources:  
  - [OpenAI Documentation](https://platform.openai.com/docs)  
  - [Wolfram Alpha API Docs](https://products.wolframalpha.com/api/)  
  - [Spring Boot Reference Guide](https://docs.spring.io/spring-boot/docs/current/reference/html/)  
  - [React Documentation](https://reactjs.org/docs/getting-started.html)  

---

## Web App Link

Access the live MathForge application here:  
[MathForge Web App](https://mathforge.xyz/)  

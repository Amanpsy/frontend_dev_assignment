# Solve Ease Frontend Assignment

**Frontend Intern — Solve Ease**  
Branch: `assignment/aman-kumar`  

This project is a polished frontend implementation of the provided starter platform, built using **React/Next.js + TypeScript + Tailwind CSS**. It demonstrates modern, responsive UI design, performance optimizations, interactive animations, and unit testing.

---

## 🚀 Features Implemented

- **Workers Page**
  - Displays a list of skilled workers with name, service, and price.
  - Filters workers dynamically by name (search bar functionality).
  - Workers with `pricePerDay = 0` are excluded automatically.

- **Worker Card**
  - Flip animation using **Framer Motion**.
  - Front: shows profile image, name, service, and price.
  - Back: shows more details about the service and price.
  - Flip triggers:
    - **Mouse click** on the card.
    - **Keyboard interaction**: press **Enter** or **Space** when focused.
  - Memoized with `React.memo` for performance optimization.

- **Performance & Optimization**
  - **React Virtualized** for efficient rendering of large lists.
  - Lazy loading of worker images using Next.js `Image` component.
  - Component memoization to reduce unnecessary re-renders.

- **Styling & Responsiveness**
  - Built with **Tailwind CSS**.
  - Fully responsive across mobile, tablet, and desktop.
  - Accessible design with focus styles, semantic HTML, and keyboard interactions.

- **Animations**
  - Flip animation on worker cards with **Framer Motion**.
  - Hover scaling effects for visual polish.
  - Subtle GSAP animation applied to hero/title section.

- **Testing**
  - Unit and component tests implemented using **Vitest** and **@testing-library/react**.
  - Tests cover rendering of worker cards and filter functionality.

---

git clone "https://github.com/Amanpsy/frontend_dev_assignment.git"
cd frontend_dev_assignment

# Checkout assignment branch
git checkout assignment/aman-kumar

# Install dependencies
npm install

# Start development server
npm run dev

# Running Test

npm run test
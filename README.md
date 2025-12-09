# Project Sagip: The AI Remediation Assistant for Filipino Teachers

## Instantly turn a photo of a student's wrong answer into a personalized, culturally localized remediation worksheet.

### **Inspiration**
In the Philippines, the teacher-student ratio can reach 1:50. When a student fails a quiz, the teacher rarely has time to create a personalized remediation plan. They are often bogged down by administrative tasks (like the infamous DepEd forms).

We saw a massive gap: **Teachers want to help struggling students, but they lack the bandwidth.**

We built **Sagip** (Tagalog for "Rescue" or "Save") to help solve this. It is an "offline-first" minded tool designed to turn a failed quiz paper into a personalized "second chance" worksheet in seconds. It bridges the gap between a student’s error and their mastery, without adding to the teacher's workload.

### **What it does**
Sagip is a web application that acts as a **Pedagogical Assistant**.
1.  **Snap:** The teacher takes a photo of a student's wrong answer (Math or English).
2.  **Analyze:** Using **Gemini 2.5**, the app identifies the specific misconception (e.g., "The student forgot to regroup in addition" or "Confused collective nouns").
3.  **Explain:** It generates a teacher-friendly explanation in **"Taglish"** (Tagalog-English mix), which is the most effective language of instruction in many local classrooms.
4.  **Remediate:** It instantly creates a **downloadable PDF worksheet** containing 5 new practice problems. Critically, these problems are **culturally contextualized**—using examples like *jeepneys*, *sari-sari stores*, and *pesos* instead of generic Western concepts.

### **How we built it**
We embraced the **"Vibe Coding"** philosophy using **Google AI Studio**.
* **Frontend:** We used AI Studio to generate a **React** application tailored for mobile browsers (since most PH teachers use mid-range Android phones).
* **The Brain:** The core logic is powered by **Gemini 2.5 Flash** via the `google-generative-ai` SDK. We chose Flash for its speed and cost-effectiveness, which is vital for a developing nation context.
* **Vision:** We leveraged Gemini's multimodal capabilities to read handwritten student answers directly from images.
* **Output:** We integrated `jspdf` to convert the AI's text output into a clean, printable A4 PDF layout that mimics official Department of Education (DepEd) learning materials.

### **Accomplishments that we're proud of**
* **True Localization:** The app doesn't just translate; it "localizes." It explains complex math concepts using language that a rural Filipino child would understand.
* **Zero-Friction UI:** We managed to build a "One-Click" experience. From photo to printed worksheet takes less than 30 seconds.
* **Realistic Tech:** We avoided heavy frameworks. The app is lightweight and runs in the browser, making it accessible even on older school devices.

### **What's next for Sagip**
* **Dialect Support:** Adding support for Cebuano, Ilocano, and Bicolano to serve the wider archipelago.
* **Handwriting Support:** Allowing students to solve the remediation worksheet on the screen using a stylus or finger.
* **DepEd Alignment:** Mapping the generated problems specifically to the official "Most Essential Learning Competencies" (MELCs) codes.

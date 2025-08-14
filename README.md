# [Crypto Casino] - Testing Task Submission

---

## 🚀 Live Demo

A live version of the project is deployed on Vercel.

**Link:** **[https://next-sanity-test-rho.vercel.app/us/crypto]**
**Sanity Link:** **[https://crypto-casinos.sanity.studio]**

---

## 🛠️ Tech Stack

The project is built with the following technologies:

- **Framework:** Next.js 14
- **CMS:** Sanity.io
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Deployment:** Vercel

---

## ⚙️ Getting Started: How to Run the Project

Follow these steps to get a local copy up and running for testing.

### Installation & Setup

1.  **Clone the repository**
    ```sh
    git clone https://github.com/mauricio0503/next_sanity_test.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd next_sanity_test [your-project-folder]
    ```
3.  **Install dependencies**
    ```sh
    npm install
    ```
4.  **Set up Environment Variables**
    Create a `.env.local` file in the root of the project by duplicating the `.env.example` file. Then, fill in the required Sanity credentials.

    ```sh
    # .env.local
    NEXT_PUBLIC_SANITY_PROJECT_ID="sanity_project_id"
    NEXT_PUBLIC_SANITY_DATASET="sanity_dataset_id"
    ```

### Running the Application

Once the setup is complete, you can run the development server:

```sh
npm run dev

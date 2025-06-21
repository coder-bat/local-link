# LocalLink

A beautifully minimalistic and extensible Next.js (TypeScript, Tailwind, App Router, API) app with two buttons: **Assist!!** and **Too loud**. When either button is pressed, the backend sends an SMS notification to the Amazon SNS topic `LocalLink`.

## Features
- Minimal, modern UI with Tailwind CSS
- Extensible code structure
- API route for Amazon SNS integration

## Setup
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment variables:**
   Create a `.env.local` file in the project root with:
   ```env
   AWS_REGION=your-aws-region
   SNS_TOPIC_ARN=your-sns-topic-arn
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   ```

## Customization
- UI and backend logic are modular and easy to extend.
- Update the API logic in `src/app/api/notify/route.ts` as needed.

---

> Built with Next.js, TypeScript, and Tailwind CSS.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/route.ts`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Routes

This directory contains example API routes for the headless API app.

For more details, see [route.js file convention](https://nextjs.org/docs/app/api-reference/file-conventions/route).

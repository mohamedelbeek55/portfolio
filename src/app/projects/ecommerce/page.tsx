import type { Metadata } from "next";
import { EcommerceCaseStudyView } from "@/components/case-study/EcommerceCaseStudyView";

export const metadata: Metadata = {
  title: "E-Commerce Platform Case Study — Mohamed Elbeek",
  description:
    "Backend engineering write-up on clean architecture, PostgreSQL transactions, Stripe idempotency, and inventory concurrency in NestJS.",
  openGraph: {
    title: "E-Commerce Platform Case Study — Mohamed Elbeek",
    description:
      "Backend engineering write-up on clean architecture, PostgreSQL transactions, Stripe idempotency, and inventory concurrency in NestJS.",
    url: "https://mohamedelbeek.com/projects/ecommerce",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Commerce Platform Case Study — Mohamed Elbeek",
    description:
      "Backend engineering write-up on clean architecture, PostgreSQL transactions, Stripe idempotency, and inventory concurrency in NestJS.",
  },
};

export default function EcommercePage() {
  return <EcommerceCaseStudyView />;
}

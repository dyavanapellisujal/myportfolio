import { education, site } from "@/content/site";

/** schema.org Person + WebSite, rendered once in the root layout. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        jobTitle: site.role,
        description: site.positioning,
        url: site.url,
        sameAs: [site.links.github, site.links.linkedin, site.links.medium],
        alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
        knowsAbout: [
          "Kubernetes",
          "Amazon EKS",
          "Google Kubernetes Engine",
          "Platform Engineering",
          "DevOps",
          "DevSecOps",
          "Cloud Security",
          "AWS",
          "Google Cloud Platform",
          "Terraform",
          "Helm",
          "ArgoCD",
          "GitOps",
          "KEDA",
          "Linux",
          "Computer Networking",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        author: { "@id": `${site.url}/#person` },
      },
    ],
  };
  // JSON-LD must be an inline script; content is static and contains no user input.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

import { personalInfo, educationDetails, projects } from "@/lib/data";

export default function StructuredData() {
  const baseUrl = "https://anuraj-singh.vercel.app";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: personalInfo.name,
    alternateName: ["its-anuraj"],
    url: baseUrl,
    image: `${baseUrl}/anuraj.png`,
    jobTitle: "Mobile App Developer",
    description:
      "Mobile App Developer specializing in React Native, Expo, TypeScript, JavaScript, and cross-platform mobile application development.",
    knowsAbout: [
      "React Native",
      "Expo",
      "TypeScript",
      "JavaScript",
      "Mobile Application Development",
      "Android Development",
      "Supabase",
      "Firebase",
      "Zustand",
      "SQL",
      "PostgreSQL",
      "REST APIs",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: educationDetails.institution,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Greater Noida",
        addressRegion: "Uttar Pradesh",
        addressCountry: "India",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greater Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "India",
    },
    sameAs: [personalInfo.github, personalInfo.linkedin],
    email: `mailto:${personalInfo.email}`,
    telephone: personalInfo.phone,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Anuraj Singh — Mobile App Developer | React Native & Expo",
    alternateName: ["Anuraj Singh Portfolio", "its-anuraj Portfolio"],
    description:
      "Official portfolio of Anuraj Singh — Mobile App Developer specializing in React Native, Expo, TypeScript, and modern mobile engineering.",
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
    inLanguage: "en-US",
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/#profilepage`,
    url: baseUrl,
    name: "Anuraj Singh — Mobile App Developer | React Native & Expo",
    description: personalInfo.shortBio,
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    about: {
      "@id": `${baseUrl}/#person`,
    },
    mainEntity: {
      "@id": `${baseUrl}/#person`,
    },
  };

  const projectListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects
      .filter((p) => p.featured)
      .map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.purpose,
          applicationCategory: "MobileApplication",
          operatingSystem: "Android, iOS, Web",
          author: {
            "@id": `${baseUrl}/#person`,
          },
          url: project.demo || project.github || baseUrl,
        },
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListSchema) }}
      />
    </>
  );
}

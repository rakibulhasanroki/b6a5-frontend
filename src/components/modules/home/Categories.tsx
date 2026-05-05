// "use client";

// import Container from "@/components/custom/Container";
// import Section from "@/components/custom/Section";
// import { SectionTitle } from "@/components/custom/Typography";
// import { useRouter } from "next/navigation";

// const categories = [
//   { label: "Public Free", key: "PUBLIC_FREE" },
//   { label: "Public Paid", key: "PUBLIC_PAID" },
//   { label: "Private Free", key: "PRIVATE_FREE" },
//   { label: "Private Paid", key: "PRIVATE_PAID" },
// ];

// export default function Categories() {
//   const router = useRouter();

//   const handleClick = (key: string) => {
//     router.push(`/events?filter=${key}`);
//   };

//   return (
//     <Section className="pt-14">
//       <Container>
//         <div className="flex flex-col gap-6">
//           <SectionTitle>Browse Events</SectionTitle>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {categories.map((cat) => (
//               <button
//                 key={cat.key}
//                 onClick={() => handleClick(cat.key)}
//                 className="
//                   h-16 rounded-xl border border-border
//                   flex items-center justify-center
//                   text-sm font-medium
//                   transition-all duration-300
//                   cursor-pointer
//                   bg-secondary hover:bg-accent hover:text-accent-foreground
//                   hover:scale-[1.03] active:scale-[0.97]
//                 "
//               >
//                 {cat.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </Section>
//   );
// }

"use client";

import Container from "@/components/custom/Container";
import Section from "@/components/custom/Section";
import { SectionTitle } from "@/components/custom/Typography";
import { useRouter } from "next/navigation";

const categories = [
  { label: "Public Free", key: "PUBLIC_FREE" },
  { label: "Public Paid", key: "PUBLIC_PAID" },
  { label: "Private Free", key: "PRIVATE_FREE" },
  { label: "Private Paid", key: "PRIVATE_PAID" },
];

export default function Categories() {
  const router = useRouter();

  const handleClick = (key: string) => {
    router.push(`/events?filter=${key}`);
  };

  return (
    <Section className="pt-12">
      <Container>
        <div className="flex flex-col gap-6">
          <SectionTitle>Browse by Type</SectionTitle>

          {/* CHANGED: horizontal pills instead of grid cards */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleClick(cat.key)}
                className="
                  px-5 h-11
                  rounded-full
                  border border-border
                  bg-card
                  text-sm font-medium
                  transition-all duration-300
                  cursor-pointer
                  
                  hover:bg-primary hover:text-primary-foreground
                  hover:border-primary
                  active:scale-[0.97]
                "
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

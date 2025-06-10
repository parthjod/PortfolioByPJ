import { SocialLinks } from "@/components/ui/social-links"

const socials = [
  {
    name: "Instagram",
    image: "https://link-hover-lndev.vercel.app/instagram.png",
  },
  {
    name: "LinkedIn",
    image: "https://link-hover-lndev.vercel.app/linkedin.png",
  }
]

export default function SocialLinksCustomGap() {
  return (
    <main className="relative flex min-h-screen w-full items-start justify-center px-4 py-10 md:items-center">
      <SocialLinks 
        socials={socials.slice(0, 2)} 
        className="gap-4" 
      />
    </main>
  )
}
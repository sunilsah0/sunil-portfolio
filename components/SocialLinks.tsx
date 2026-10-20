import { socials } from "@/data/profile";
import { GithubMark, LinkedinMark, XMark} from "./icons";

const items = [
  { key: "github", label: "GitHub", Icon: GithubMark },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinMark },
  { key: "huggingface", label: "Hugging Face", Icon: null },
  { key: "x", label: "X / Twitter", Icon: XMark },
  
] as const;

export default function SocialLinks() {
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map(({ key, label, Icon }) => {
        const href = socials[key];
        if (!href) return null; // hide icons with empty links
        return (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-full"
            >
              {Icon ? (
                <Icon className="h-5 w-5" />
              ) : (
                <span className="text-lg" aria-hidden>
                  🤗
                </span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
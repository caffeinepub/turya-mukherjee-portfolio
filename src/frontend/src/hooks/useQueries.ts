import { useMutation, useQuery } from "@tanstack/react-query";
import type { PortfolioProject, Profile } from "../backend.d";
import { useActor } from "./useActor";

export function useGetProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) {
        return {
          name: "Alex Rivera",
          title: "Full-Stack Engineer & Creative Technologist",
          bio: "I build thoughtful digital experiences at the intersection of engineering and design. Passionate about clean code, intuitive interfaces, and the craft of turning complex ideas into elegant solutions.",
          resumeUrl: "/assets/uploads/Turya_Mukherjee_Resume_FA-1.pdf",
          socialLinks: {
            github: "https://github.com",
            linkedin: "https://www.linkedin.com/in/turya-mukherjee",
            twitter: "https://twitter.com",
            instagram:
              "https://www.instagram.com/turjo_mukherjee_?igsh=eHhuNWNoeW1yM3Zl",
          },
        };
      }
      return actor.getProfile();
    },
    enabled: !isFetching,
  });
}

export function useListPortfolioProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<PortfolioProject[]>({
    queryKey: ["portfolioProjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPortfolioProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitContactMessage(name, email, message);
    },
  });
}

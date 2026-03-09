import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SocialLinks {
    linkedin: string;
    twitter: string;
    instagram: string;
    github: string;
}
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface Profile {
    bio: string;
    title: string;
    socialLinks: SocialLinks;
    name: string;
    resumeUrl: string;
}
export type Time = bigint;
export interface PortfolioProject {
    id: bigint;
    title: string;
    displayOrder: bigint;
    description: string;
    imageUrl: string;
    projectUrl: string;
    techStack: Array<string>;
}
export interface backendInterface {
    addPortfolioProject(newProject: PortfolioProject): Promise<PortfolioProject>;
    deletePortfolioProject(projectId: bigint): Promise<void>;
    getProfile(): Promise<Profile>;
    listContactMessages(): Promise<Array<ContactMessage>>;
    listPortfolioProjects(): Promise<Array<PortfolioProject>>;
    submitContactMessage(name: string, email: string, message: string): Promise<void>;
    updatePortfolioProject(updatedProject: PortfolioProject): Promise<void>;
    updateProfile(updatedProfile: Profile): Promise<void>;
}

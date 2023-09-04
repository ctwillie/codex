import { UUID } from "@/types/index";

export type Category = {
    id: UUID;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

export type Tag = {
    id: UUID;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type Technology = {
    id: UUID;
    name: string;
    category: Category;
    createdAt: string;
    updatedAt: string;
};

export type Resource = {
    id: UUID;
    name: string;
    url: string;
    isOfficial: boolean;
    category: Category;
    technology?: Technology;
    tags: Tag[];
    createdAt: string;
    updatedAt: string;
};

export type Category = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

export type Tag = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type Technology = {
    id: string;
    name: string;
    category: Category;
    createdAt: string;
    updatedAt: string;
};
